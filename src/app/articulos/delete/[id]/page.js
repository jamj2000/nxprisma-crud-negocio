import Form from "@/components/FormArticulo"
import Button from "@/components/Button"
import prisma from '@/lib/prisma'
import { deleteArticulo } from "@/lib/actions"
import { Suspense } from "react"

export const dynamic = 'force-dynamic'

async function page({ params }) {
  const articulo = await prisma.articulo.findUnique({
    where: {
      id: Number(params.id),
    },
  })

  return (
    <div>
      <h3>Eliminar artículo</h3>
      <Suspense fallback={'Cargando...'}>
        <Form action={deleteArticulo} articulo={articulo} disabled={true} >
          <Button title='Eliminar artículo' />
        </Form>
      </Suspense>
    </div>
  )
}

export default page