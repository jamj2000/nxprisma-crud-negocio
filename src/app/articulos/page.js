import Link from 'next/link'
import Image from 'next/image'
import Articulo from '@/components/Articulo'
import { getArticulos } from '@/lib/actions'
import { Suspense } from 'react'

export const dynamic = 'force-dynamic'

export default async function Home() {
    const articulos = await getArticulos()
    // console.log(articulos);

    return (
        <div>
            <Link className='enlace' href="/articulos/new">
                <Image src='/nuevo.svg' alt='nuevo' width="20" height="20" />
                Nuevo artículo
            </Link>
            <Suspense fallback="Cargando...">
            {
                articulos.map((articulo) => (
                    <Articulo key={articulo.id} articulo={articulo} >
                        <Link className='enlace' href={`/articulos/view/${articulo.id}`} >
                            <Image src='/ver.svg' alt='nuevo' width="20" height="20" />
                            Ver
                        </Link>
                        <Link className='enlace' href={`/articulos/edit/${articulo.id}`} >
                            <Image src='/editar.svg' alt='nuevo' width="20" height="20" />
                            Editar
                        </Link>
                        <Link className='enlace' href={`/articulos/delete/${articulo.id}`} >
                            <Image src='/eliminar.svg' alt='nuevo' width="20" height="20" />
                            Eliminar
                        </Link>
                    </Articulo>
                ))
            }
            </Suspense>
        </div>
    )
}
