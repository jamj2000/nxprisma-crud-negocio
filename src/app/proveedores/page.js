import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import Proveedores from '@/components/Proveedores'

export const dynamic = 'force-dynamic'

export default async function page() {

    return (
        <div>
            <Link className='enlace' href="/proveedores/new">
                <Image src='/nuevo.svg' alt='nuevo' width="20" height="20" />
                Nuevo proveedor
            </Link>
            <Suspense fallback={
                <>
                    <div className='esqueleto-proveedor' />
                    <div className='esqueleto-proveedor' />
                    <div className='esqueleto-proveedor' />
                </>
            }>
                <Proveedores />
            </Suspense>
        </div>
    )
}
