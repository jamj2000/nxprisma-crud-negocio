import { Suspense } from 'react'
import { Modal } from '@/components/simpleui'
import { PlusCircleIcon } from 'lucide-react'
import { getArticulos } from '@/lib/data/articulos'
import { getProveedores } from '@/lib/data/proveedores'
import { createArticulo } from '@/lib/actions/articulos'
import { ListArticulos, FormArticulo } from '@/components/articulos'



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
                    <h2 className="text-green-500 text-3xl">Registrar artículo</h2>
                    <FormArticulo action={createArticulo} data={{ proveedoresIdNombre }} />
                </Modal>
            </div>

            <ListArticulos data={data} />

        </div>
    )
}