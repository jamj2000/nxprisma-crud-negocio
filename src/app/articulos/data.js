'use server'

import prisma from "@/lib/prisma";
import { cacheTag } from 'next/cache';




export async function getArticulos() {
    'use cache'
    cacheTag('articulos')

    try {
        const articulos = await prisma.articulo.findMany({
            include: {
                proveedores: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
        // console.log(articulos)
        return articulos;
    } catch (error) {
        // console.log(error);  
        return null;
    }
}


export async function getArticulo(id) {  // obtener artículo con proveedores
    'use cache'
    cacheTag('articulos', `articulo:${id}`)

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

