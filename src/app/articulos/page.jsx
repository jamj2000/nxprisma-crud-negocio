import { Suspense } from 'react'
import { Modal } from '@/components/simpleui'
import { PlusCircleIcon } from 'lucide-react'
import { getArticulos } from '@/app/articulos/data'
import { getProveedores } from '@/app/proveedores/data'
import { createArticulo } from '@/app/articulos/actions'
import { ListArticulos, FormArticulo } from '@/app/articulos/components'



export default function Page() {
    return (
        <section>
            <h1 className="text-4xl font-bold">Artículos</h1>
            <hr />

            <Suspense fallback={"Cargando articulos ..."}>
                <Content />
            </Suspense>

        </section>
    )
}



const Content = async () => {

    const [articulos, proveedores] = await Promise.all([getArticulos(), getProveedores()])
    const proveedoresIdNombre = proveedores.map(({ id, nombre }) => ({ id, nombre }))

    const data = articulos.map(articulo => ({ ...articulo, proveedoresIdNombre }))

    return (
        <div>
            <div className="flex justify-end w-full my-4">
                <Modal trigger={<PlusCircleIcon className='text-green-500' />} >
                    <FormArticulo action={createArticulo} data={{ proveedoresIdNombre }} />
                </Modal>
            </div>

            <ListArticulos data={data} />

        </div>
    )
}