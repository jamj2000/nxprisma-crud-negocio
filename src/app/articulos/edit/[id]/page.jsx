import Form from "@/components/FormArticulo"
import Button from "@/components/Button"
import { editArticulo } from "@/lib/actions"
import { Suspense } from "react"

async function page({ params }) {

  const { id } = await params

  return (
    <div>
      <h3>Editar artículo</h3>

      <Suspense fallback={'...'}>
        <Form action={editArticulo} articuloId={id} >
          <Button title='Editar artículo' />
        </Form>
      </Suspense>
    </div>
  )
}


export default page