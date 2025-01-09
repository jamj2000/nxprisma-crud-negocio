import Form from "@/components/FormArticulo"
import Link from "next/link"
import { getArticulo } from "@/lib/actions"
import { Suspense } from "react"



async function page({ params }) {

  const { id } = await params

  return (
    <div>
      <h3>Ver artículo</h3>

      <Suspense fallback={'...'}>
        <Form action={getArticulo} articuloId={id} disabled={true} >
        </Form>
      </Suspense>
      <Link className='enlace' href="/articulos">
        Volver atrás
      </Link>
    </div>
  )
}

export default page