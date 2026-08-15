'use server'

import prisma from "@/lib/prisma";
import { cacheTag } from 'next/cache';


export async function getProveedores() {
    'use cache'
    cacheTag('proveedores')

    try {
        const proveedores = await prisma.proveedor.findMany({
            include: {
                articulos: true
            },
            orderBy: {
                createdAt: 'desc'
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
    cacheTag('proveedores', `proveedor:${id}`)

    try {
        const proveedor = await prisma.proveedor.findUnique({
            where: { id: +id },
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

