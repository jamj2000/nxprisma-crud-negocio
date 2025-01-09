import Form from "@/components/FormProveedor"
import Button from "@/components/Button"
import { editProveedor } from "@/lib/actions"
import { Suspense } from "react"


async function page({ params }) {

  const { id } = await params

  return (
    <div>
      <h3>Editar proveedor</h3>

      <Suspense fallback={'...'}>
        <Form action={editProveedor} proveedorId={id} >
          <Button title='Editar proveedor' />
        </Form>
      </Suspense>
    </div>
  )
}


export default page