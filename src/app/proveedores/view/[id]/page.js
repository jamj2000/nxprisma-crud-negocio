import Form from "@/components/FormProveedor"
import { getProveedor } from "@/lib/actions"
import { Suspense } from "react"

function page({ params }) {

  return (
    <div>
      <h3>Ver proveedor</h3>

      <Suspense fallback={'...'}>
        <Form action={getProveedor} proveedorId={params.id} disabled={true} >
        </Form>
      </Suspense>
    </div>
  )
}

export default page