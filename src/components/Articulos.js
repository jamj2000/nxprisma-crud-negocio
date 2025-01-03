import { getArticulos } from "@/lib/actions"
import Articulo from "@/components/Articulo"
import Link from "next/link"
import Image from "next/image"

async function Articulos() {
    const articulos = await getArticulos()

    return (
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
    )
}

export default Articulos