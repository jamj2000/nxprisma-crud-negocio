import ListadoArticulos from '@/components/ListadoArticulos'
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function Home() {

    return (
        <div>
            <Link className='enlace' href="/articulos/new">
                <Image src='/nuevo.svg' alt='nuevo' width="20" height="20" />
                Nuevo artículo
            </Link>
            <Suspense fallback={'Cargando...'}>
                <ListadoArticulos />
            </Suspense>
        </div>
    )
}
