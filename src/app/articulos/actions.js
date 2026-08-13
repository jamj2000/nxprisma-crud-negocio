'use server'
import prisma from '@/lib/prisma'
import { revalidatePath, updateTag } from 'next/cache';



export async function createArticulo(prevState, formData) {
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = Number(formData.get('precio'))

  const proveedores = formData.getAll('proveedores').map(id => ({ id: +id }))


  try {
    const articulo = await prisma.articulo.create({
      data: {
        nombre,
        descripcion,
        precio,
        proveedores: { connect: proveedores },
      }
    })

  } catch (error) {
    return {
      type: "error",
      message: "Error al crear el articulo"
    }
  }

  revalidatePath('/articulos');
  updateTag('articulos')
  return {
    type: "success",
    message: "Articulo creado correctamente"
  }
}



export async function updateArticulo(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const descripcion = formData.get('descripcion')
  const precio = Number(formData.get('precio'))

  const proveedores = formData.getAll('proveedores').map(id => ({ id: +id }))


  try {
    const articulo = await prisma.articulo.update({
      where: { id },
      data: {
        nombre,
        descripcion,
        precio,
        proveedores: { set: proveedores },
      }
    })

  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al actualizar el articulo"
    }
  }


  revalidatePath('/articulos');
  updateTag('articulos')
  return {
    type: "success",
    message: "Articulo actualizado correctamente"
  }
}


export async function deleteArticulo(prevState, formData) {
  const id = +formData.get('id')


  try {
    const articulo = await prisma.articulo.delete({
      where: { id }
    })

  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al eliminar el articulo"
    }
  }

  revalidatePath('/articulos');
  updateTag('articulos')
  return {
    type: "success",
    message: "Articulo eliminado correctamente"
  }
}


