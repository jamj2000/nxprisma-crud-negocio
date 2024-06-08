'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// Obtener array con IDs de todos los proveedores
async function getProveedoresID() {
  const proIds = await prisma.proveedor.findMany({
    select: { id: true }
  })
  return proIds.map(p => p.id)
}



// ARTÍCULOS

export async function getArticulos() {
  try {
    const articulos = await prisma.articulo.findMany()
    return articulos;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}


export async function getArticulo(id) {  // obtener artículo con proveedores
  try {
    const articulo = await prisma.articulo.findUnique({
      where: { id },
      include: {
        proveedores: true
      }
    })

    console.log(articulo);
    return articulo;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}



export async function newArticulo(formData) {
  try {
    const nombre = formData.get('nombre')
    const descripcion = formData.get('descripcion')
    const precio = Number(formData.get('precio'))

    // Array con IDs de todos los proveedores
    const proveedoresID = await getProveedoresID()

    // Array con IDs de proveedores marcados por el usuario
    const connect = proveedoresID
      .filter(id => formData.get(id.toString()) !== null)
      .map(id => ({ id: Number(id) }));

    // Información para depuración  
    console.log('IDs ', proveedoresID);
    console.log('CONNECT ', connect);

    const articulo = await prisma.articulo.create({
      data: {
        nombre,
        descripcion,
        precio,
        proveedores: { connect },
      },
      include: {
        proveedores: true,
      },
    })

    console.log(articulo);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}



export async function editArticulo(formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = Number(formData.get('precio'))

  // Array con IDs de todos los proveedores
  const proveedoresID = await getProveedoresID()

  // Array con IDs de proveedores marcados por el usuario
  const connect = proveedoresID
    .filter(id => formData.get(id.toString()) !== null)
    .map(id => ({ id: Number(id) }));

  // Array con IDs de proveedores NO marcados por el usuario
  const disconnect = proveedoresID
    .filter(id => formData.get(id.toString()) === null)
    .map(id => ({ id: Number(id) }));

  // Información para depuración
  console.log('IDs ', proveedoresID);
  console.log('CONNECT ', connect);
  console.log('DISCONNECT ', disconnect);

  try {
    const articulo = await prisma.articulo.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        precio,
        proveedores: { connect, disconnect },
      },
      include: {
        proveedores: true,
      },
    })

    console.log(articulo);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}


/* 
// EJEMPLO ACTUALIZACIÓN
const result = await prisma.articulo.update({
  where: {
    id: 16,
  },
  include: {
    proveedores: true,
  },
  data: {
    proveedores: {
      connect: [{id: 4}, {id: 5}],
      disconnect: [{ id: 12 }, { id: 19 }],
    },
  },

})

*/


export async function deleteArticulo(formData) {
  try {
    const id = Number(formData.get('id'))

    const articulo = await prisma.articulo.delete({
      where: {
        id: id,
      },
    })
    console.log(articulo);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }

  redirect('/articulos');
}



// PROVEEDORES

export async function getProveedores() {
  try {
    const proveedores = await prisma.proveedor.findMany()
    return proveedores;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}



export async function getProveedor(id) {  // obtener proveedores con artículos
  try {
    const proveedor = await prisma.proveedor.findUnique({
      where: { id },
      include: {
        articulos: true
      }
    })

    console.log(proveedor);
    return proveedor;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}



export async function newProveedor(formData) {
  try {
    const nombre = formData.get('nombre')
    let nacional = formData.get('nacional')

    nacional = Boolean(nacional)

    const proveedor = await prisma.proveedor.create({
      data: { nombre, nacional },
    })

    console.log(proveedor);
    revalidatePath('/proveedores')
  } catch (error) {
    console.log(error);
  }
  redirect('/proveedores');
}



export async function editProveedor(formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  let nacional = formData.get('nacional')

  nacional = Boolean(nacional)

  try {
    const proveedor = await prisma.proveedor.update({
      where: { id },
      data: { nombre, nacional },
    })
    console.log(proveedor);
    revalidatePath('/proveedores')
  } catch (error) {
    console.log(error);
  }
  redirect('/proveedores');
}



export async function deleteProveedor(formData) {
  try {
    const id = Number(formData.get('id'))

    const proveedor = await prisma.proveedor.delete({
      where: {
        id: id,
      },
    })
    console.log(proveedor);
    revalidatePath('/proveedores')
  } catch (error) {
    console.log(error);
  }

  redirect('/proveedores');
}

