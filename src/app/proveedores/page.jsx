import { Suspense } from 'react'
import { Modal } from '@/components/simpleui'
import { PlusCircleIcon } from 'lucide-react'
import { getProveedores } from '@/app/proveedores/data'
import { getArticulos } from '@/app/articulos/data'
import { createProveedor } from '@/app/proveedores/actions'
import { ListProveedores, FormProveedor } from '@/app/proveedores/components'



export default function Page() {


    return (
        <section>
            <h1 className="text-4xl font-bold">Proveedores</h1>
            <hr />

            <Suspense fallback={"Cargando proveedores ..."}>
                <Content />
            </Suspense>

        </section>
    )
}



const Content = async () => {

    const [proveedores, articulos] = await Promise.all([getProveedores(), getArticulos()])
    const articulosIdNombre = articulos.map(({ id, nombre }) => ({ id, nombre }))

    const data = proveedores.map(proveedor => ({ ...proveedor, articulosIdNombre }))


    return (
        <div>
            <div className="flex justify-end w-full my-4">
                <Modal trigger={<PlusCircleIcon className='text-green-500' />} >
                    <h2 className="text-green-500 text-3xl">Registrar proveedor</h2>
                    <FormProveedor action={createProveedor} data={{ articulosIdNombre }} />
                </Modal>
            </div>

            <ListProveedores data={data} />

        </div>
    )
}