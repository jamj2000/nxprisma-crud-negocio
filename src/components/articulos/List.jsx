import { getArticulos, getProveedores } from "@/lib/data"
import CardArticulo from "@/components/articulos/Card"
import Image from "next/image"
import FormArticulo from "@/components/articulos/Form"
import { Modal } from "@/components/simpleui"
import { accept, deleteArticulo, updateArticulo } from "@/lib/actions"


async function List() {
    const [articulos, proveedores] = await Promise.all([getArticulos(), getProveedores()])

    const pr = proveedores.map(({ id, nombre }) => ({ id, nombre }))

    return (

        <div className="flex flex-col gap-4">


            {articulos.map((articulo) => (

                <CardArticulo key={articulo.id} articulo={articulo} >
                    <div className="flex gap-2 justify-end" >

                        <Modal trigger={<Image src='/editar.svg' alt='editar' width="24" height="24" />} >
                            <FormArticulo data={{ ...articulo, pr }} action={updateArticulo} />
                        </Modal>

                        <Modal trigger={<Image src='/eliminar.svg' alt='eliminar' width="24" height="24" />} >
                            <FormArticulo data={{ ...articulo, pr }} action={deleteArticulo} disabled />
                        </Modal>

                    </div>
                </CardArticulo >

            ))}

        </div>
    )
}

export default List