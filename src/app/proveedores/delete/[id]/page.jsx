import Form from "@/components/FormProveedor"
import Button from "@/components/Button"
import { deleteProveedor } from "@/lib/actions"
import { Suspense } from "react"


function page({ params }) {

  return (
    <div>
      <h3>Eliminar proveedor</h3>
      
      <Suspense fallback={'...'}>
        <Form action={deleteProveedor} proveedorId={params.id} disabled={true} >
          <Button title='Eliminar proveedor' />
        </Form>
      </Suspense>
    </div>
  )
}

export default page