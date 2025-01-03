import Form from "@/components/FormArticulo"
import Button from "@/components/Button"
import { newArticulo } from "@/lib/actions"
import { Suspense } from "react"


function page() {
  return (
    <div>
      <h3>Nuevo artículo</h3>
      
      <Suspense fallback={'...'}>
        <Form action={newArticulo} articulo={null}>
          <Button title='Crear artículo' />
        </Form>
      </Suspense>
    </div>
  )
}

export default page