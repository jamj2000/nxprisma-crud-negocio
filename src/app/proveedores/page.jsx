import Image from 'next/image'
import ListProveedores from '@/components/proveedores/List'
import { Suspense } from 'react'
import { createProveedor } from '@/lib/actions'
import { Modal } from '@/components/simpleui'
import FormProveedor from '@/components/proveedores/Form'
import { getArticulos } from '@/lib/data'


export default async function page() {

    const articulos = await getArticulos()
    const ar = articulos.map(({ id, nombre }) => ({ id, nombre }))


    return (
        <div>
            <div className="flex justify-end w-full my-4">
                <Modal trigger={<Image src='/nuevo.svg' alt='nuevo' width="24" height="24" />} className={"relative right-0"} >
                    <FormProveedor action={createProveedor} data={{ ar }} />
                </Modal>
            </div>

            <Suspense fallback={"Cargando proveedores ..."}>
                <ListProveedores />
            </Suspense>
        </div>
    )
}
