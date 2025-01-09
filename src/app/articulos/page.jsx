import Articulos from '@/components/Articulos'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function page() {

    return (
        <div>
            <Link className='enlace' href="/articulos/new">
                <Image src='/nuevo.svg' alt='nuevo' width={20} height={20} />
                Nuevo artículo
            </Link>
            <Suspense fallback={
                <>
                    <div className='esqueleto-articulo' />
                    <div className='esqueleto-articulo' />
                    <div className='esqueleto-articulo' />
                </>
            }>
                <Articulos />
            </Suspense>
        </div>
    )
}
