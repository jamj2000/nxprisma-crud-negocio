import Form from "@/components/FormProveedor"
import Link from "next/link"
import { getProveedor } from "@/lib/actions"
import { Suspense } from "react"

async function page({ params }) {

  const { id } = await params

  return (
    <div>
      <h3>Ver proveedor</h3>

      <Suspense fallback={'...'}>
        <Form action={getProveedor} proveedorId={id} disabled={true} >
        </Form>
      </Suspense>
      <Link className='enlace' href="/proveedores">
        Volver atrás
      </Link>
    </div>
  )
}

export default page