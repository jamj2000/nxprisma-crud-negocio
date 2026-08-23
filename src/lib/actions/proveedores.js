'use server'
import prisma from '@/lib/prisma'
import { updateTag } from 'next/cache';




export async function createProveedor(prevState, formData) {
  const nombre = formData.get('nombre')
  const nacional = formData.get('nacional') === 'true'

  const articulos = formData.getAll('articulos').map(id => ({ id: +id }))


  try {
    await prisma.proveedor.create({
      data: { nombre, nacional, articulos: { connect: articulos } }
    })

    updateTag('proveedores')
    return {
      type: "success",
      message: "Proveedor creado correctamente"
    }
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al crear el proveedor"
    }
  }


}


export async function updateProveedor(prevState, formData) {
  const id = Number(formData.get('id'))
  const nombre = formData.get('nombre')
  const nacional = formData.get('nacional') === 'true'

  const articulos = formData.getAll('articulos').map(id => ({ id: +id }))


  try {
    await prisma.proveedor.update({
      where: { id },
      data: { nombre, nacional, articulos: { set: articulos } }
    })

    updateTag('proveedores')
    return {
      type: "success",
      message: "Proveedor actualizado correctamente"
    }
  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al actualizar el proveedor"
    }
  }


}


export async function deleteProveedor(prevState, formData) {
  const id = Number(formData.get('id'))

  try {
    await prisma.proveedor.delete({
      where: { id },
    })

    updateTag('proveedores')
    return {
      type: "success",
      message: "Proveedor eliminado correctamente"
    }

  } catch (error) {
    console.log(error);
    return {
      type: "error",
      message: "Error al eliminar el proveedor"
    }
  }


}


export async function toggleProveedorNacional(id, nacional) {

  // Si hubiese error se captura en el componente Switch
  await prisma.proveedor.update({
    where: { id },
    data: { nacional },
  })

  updateTag('proveedores')
}