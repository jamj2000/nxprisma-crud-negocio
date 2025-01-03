import Form from "@/components/FormProveedor"
import Button from "@/components/Button"
import { newProveedor } from "@/lib/actions"
import { Suspense } from "react"

function page() {
  return (
    <div>
      <h3>Nuevo proveedor</h3>

      <Suspense fallback={'...'}>
        <Form action={newProveedor} proveedorId={null}>
          <Button title='Crear proveedor' />
        </Form>
      </Suspense>
    </div>
  )
}

export default page