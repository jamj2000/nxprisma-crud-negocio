import ListArticulos from '@/components/articulos/List'
import Image from 'next/image'
import { Suspense } from 'react'
import { createArticulo } from '@/lib/actions'
import { Modal } from '@/components/simpleui'
import FormArticulo from '@/components/articulos/Form'
import { getProveedores } from '@/lib/data'



export default async function page() {

    const proveedores = await getProveedores()
    const pr = proveedores.map(({ id, nombre }) => ({ id, nombre }))

    return (
        <div>
            <div className="flex justify-end w-full my-4">
                <Modal trigger={<Image src='/nuevo.svg' alt='nuevo' width="24" height="24" />} >
                    <FormArticulo action={createArticulo} data={{ pr }} />
                </Modal>
            </div>

            <Suspense fallback={"Cargando articulos ..."}>
                <ListArticulos />
            </Suspense>
        </div>
    )
}
