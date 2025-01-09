import Form from "@/components/FormArticulo"
import Button from "@/components/Button"
import { editArticulo } from "@/lib/actions"
import { Suspense } from "react"

function page({ params }) {

  return (
    <div>
      <h3>Editar artículo</h3>
      
      <Suspense fallback={'...'}>
        <Form action={editArticulo} articuloId={params.id} >
          <Button title='Editar artículo' />
        </Form>
      </Suspense>
    </div>
  )
}


export default page