'use server'

import prisma from "@/lib/prisma";
import { cacheTag } from 'next/cache';


//// --------------------------   ARTÍCULOS --------------------------

export async function getArticulos() {
    'use cache'
    cacheTag('articulos')

    try {
        const articulos = await prisma.articulo.findMany({
            include: {
                proveedores: true
            },
            orderBy: {
                nombre: 'asc'
            }
        })
        console.log(articulos)
        return articulos;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getArticulo(id) {  // obtener artículo con proveedores
    'use cache'
    cacheTag('articulos', `articulo-${id}`)

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


//// --------------------------   PROVEEDORES --------------------------  

export async function getProveedores() {
    'use cache'
    cacheTag('proveedores')

    try {
        const proveedores = await prisma.proveedor.findMany({
            include: {
                articulos: true
            },
            orderBy: {
                nombre: 'asc'
            }
        })
        return proveedores;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getProveedor(id) {  // obtener proveedores con artículos
    'use cache'
    cacheTag('proveedores', `proveedor-${id}`)

    try {
        const proveedor = await prisma.proveedor.findUnique({
            where: { id: +id },
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

