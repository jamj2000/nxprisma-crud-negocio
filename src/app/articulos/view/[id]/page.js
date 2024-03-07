import Form from "@/components/FormArticulo"
import { getArticulo } from "@/lib/actions"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

async function page({ params }) {

  return (
    <div>
      <h3>Ver artículo</h3>
      <Suspense fallback={'...'}>
        <Form action={getArticulo} articuloId={params.id} disabled={true} >
        </Form>
      </Suspense>
    </div>
  )
}

export default page