'use server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';


// Obtener array con IDs de todos los proveedores
async function getProveedoresID() {
  try {
    const IDs = await prisma.proveedor.findMany({
      select: { id: true }
    })
    return IDs  // Formato: [ {id: 1}, {id: 2}, ...]
  } catch (error) {
    // console.log(error); 
    return null;
  }
}



// ------------------------- ARTÍCULOS -----------------------------------

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

    // console.log(articulo);
    return articulo;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}


/* 
// EJEMPLO CREACIÓN
const result = await prisma.articulo.create({
  data: {
    proveedores: {
      connect: [{id: 4}, {id: 5}]     
    },
  },
})

*/

export async function newArticulo(formData) {
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = Number(formData.get('precio'))

  // Array con IDs de todos los proveedores
  const proveedoresID = await getProveedoresID()  // Formato: [ {id: 1}, {id: 2}, ...]

  // Array con IDs de proveedores marcados por el usuario
  const connect = proveedoresID.filter(({ id }) => formData.get(id.toString()) !== null)

  const proveedores = { connect }

  // Información de depuración
  // console.log('PROVEEDORES ', proveedores );

  try {
    const articulo = await prisma.articulo.create({
      data: {
        nombre,
        descripcion,
        precio,
        proveedores,
      },
    })

    // console.log(articulo);
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
  data: {
    proveedores: {
      connect: [{id: 4}, {id: 5}],
      disconnect: [{ id: 12 }, { id: 19 }],
    },
  },

})

*/

export async function editArticulo(formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = Number(formData.get('precio'))

  // Array con IDs de todos los proveedores
  const proveedoresID = await getProveedoresID()  // Formato: [ {id: 1}, {id: 2}, ...]

  // -> Si no disponemos de NodeJS 21+ 
  // Array con IDs de proveedores marcados por el usuario
  const connect = proveedoresID.filter(({ id }) => formData.get(id.toString()) !== null)

  // Array con IDs de proveedores NO marcados por el usuario
  const disconnect = proveedoresID.filter(({ id }) => formData.get(id.toString()) === null)

  const proveedores = { connect, disconnect }

  // Información para depuración
  // console.log('PROVEEDORES ', proveedores);

  // -> Si disponemos de NodeJS 21+
  // Objecto con 2 arrays: connect con IDs de proveedores marcados por el usuario y disconnect con IDs no marcados
  // const proveedores = Object.groupBy(proveedoresID, ({ id }) => formData.get(id.toString()) !== null ? 'connect' : 'disconnect')
  // console.log('PROVEEDORES ', proveedores);

  try {
    const articulo = await prisma.articulo.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        precio,
        proveedores,
      },
    })

    // console.log(articulo);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }
  redirect('/articulos');
}


export async function deleteArticulo(formData) {
  const id = Number(formData.get('id'))

  try {
    const articulo = await prisma.articulo.delete({
      where: {
        id: id,
      },
    })
    // console.log(articulo);
    revalidatePath('/articulos')
  } catch (error) {
    console.log(error);
  }

  redirect('/articulos');
}




// ------------------------- PROVEEDORES -----------------------------------

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

    // console.log(proveedor);
    return proveedor;
  } catch (error) {
    // console.log(error);  
    return null;
  }
}


export async function newProveedor(formData) {
  const nombre = formData.get('nombre')
  let nacional = formData.get('nacional')

  nacional = Boolean(nacional)

  try {
    const proveedor = await prisma.proveedor.create({
      data: { nombre, nacional },
    })

    // console.log(proveedor);
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
    // console.log(proveedor);
    revalidatePath('/proveedores')
  } catch (error) {
    console.log(error);
  }
  redirect('/proveedores');
}


export async function deleteProveedor(formData) {
  const id = Number(formData.get('id'))

  try {
    const proveedor = await prisma.proveedor.delete({
      where: {
        id: id,
      },
    })
    // console.log(proveedor);
    revalidatePath('/proveedores')
  } catch (error) {
    console.log(error);
  }

  redirect('/proveedores');
}

