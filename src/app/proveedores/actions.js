'use server'
import prisma from '@/lib/prisma'
import { revalidatePath, updateTag } from 'next/cache';




export async function createProveedor(prevState, formData) {
  const nombre = formData.get('nombre')
  const nacional = formData.get('nacional') === 'true'

  const articulos = formData.getAll('articulos').map(id => ({ id: +id }))


  try {
    const proveedor = await prisma.proveedor.create({
      data: { nombre, nacional, articulos: { connect: articulos } }
    })

  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al crear el proveedor"
    }
  }

  revalidatePath('/proveedores');
  updateTag('proveedores')
  return {
    type: "success",
    message: "Proveedor creado correctamente"
  }
}


export async function updateProveedor(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const nacional = formData.get('nacional') === 'true'

  const articulos = formData.getAll('articulos').map(id => ({ id: +id }))


  try {
    const proveedor = await prisma.proveedor.update({
      where: { id },
      data: { nombre, nacional, articulos: { set: articulos } }
    })

  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al actualizar el proveedor"
    }
  }

  revalidatePath('/proveedores');
  updateTag('proveedores')
  return {
    type: "success",
    message: "Proveedor actualizado correctamente"
  }
}


export async function deleteProveedor(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    const proveedor = await prisma.proveedor.delete({
      where: { id },
    })

  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al eliminar el proveedor"
    }
  }

  revalidatePath('/proveedores');
  updateTag('proveedores')
  return {
    type: "success",
    message: "Proveedor eliminado correctamente"
  }
}

