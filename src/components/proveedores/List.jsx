import { getArticulos, getProveedores } from "@/lib/data"
import CardProveedor from "@/components/proveedores/Card"
import Image from "next/image"
import FormProveedor from "@/components/proveedores/Form"
import { Modal } from "@/components/simpleui"
import { deleteProveedor, updateProveedor } from "@/lib/actions"


async function List() {
    const [articulos, proveedores] = await Promise.all([getArticulos(), getProveedores()])

    const ar = articulos.map(({ id, nombre }) => ({ id, nombre }))


    return (

        <div className="flex flex-col gap-4">


            {proveedores.map((proveedor) => (

                <CardProveedor key={proveedor.id} proveedor={proveedor} >
                    <div className="flex gap-2 justify-end" >

                        <Modal trigger={<Image src='/editar.svg' alt='editar' width="24" height="24" />}>
                            <FormProveedor data={{ ...proveedor, ar }} action={updateProveedor} />
                        </Modal>

                        <Modal trigger={<Image src='/eliminar.svg' alt='eliminar' width="24" height="24" />}>
                            <FormProveedor data={{ ...proveedor, ar }} action={deleteProveedor} disabled />
                        </Modal>

                    </div>
                </CardProveedor >

            ))}

        </div>
    )
}

export default List