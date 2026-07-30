import Form from "@/components/FormProveedor"
import Button from "@/components/Button"
import { editProveedor } from "@/lib/actions"
import { Suspense } from "react"


async function page(props) {
  const params = await props.params;

  return (
    <div>
      <h3>Editar proveedor</h3>
      
      <Suspense fallback={'...'}>
        <Form action={editProveedor} proveedorId={params.id} >
          <Button title='Editar proveedor' />
        </Form>
      </Suspense>
    </div>
  )
}


export default page