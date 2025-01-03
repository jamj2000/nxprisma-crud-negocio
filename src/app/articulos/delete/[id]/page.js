import Form from "@/components/FormArticulo"
import Button from "@/components/Button"
import { deleteArticulo } from "@/lib/actions"
import { Suspense } from "react"

function page({ params }) {

  return (
    <div>
      <h3>Eliminar artículo</h3>
      
      <Suspense fallback={'...'}>
        <Form action={deleteArticulo} articuloId={params.id} disabled={true} >
          <Button title='Eliminar artículo' />
        </Form>
      </Suspense>
    </div>
  )
}

export default page