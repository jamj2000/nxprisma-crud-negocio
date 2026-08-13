import { Modal, Form } from "@/components/simpleui"
import { deleteArticulo, updateArticulo } from "@/app/articulos/actions"
import { CircleDotIcon, XCircleIcon } from "lucide-react"



export const CardArticulo = ({ articulo, children }) => (
    <div className="w-full flex flex-col justify-between gap-4 md:flex-row bg-white rounded-lg overflow-hidden p-4 border border-slate-400 shadow-lg">
        <div>
            <p><strong>{articulo?.nombre}</strong></p>
            <p>{articulo?.descripcion}</p>
            <p>{articulo?.precio?.toString()} €</p>
        </div>
        <div>
            {children}
        </div>
    </div>
)



export const ListArticulos = ({ data }) => (
    <div className="flex flex-col gap-4">

        {data.map((articulo) => (
            <CardArticulo key={articulo.id} articulo={articulo} >
                <div className="flex gap-2 justify-end" >

                    <Modal trigger={<CircleDotIcon className="text-blue-500" />} >
                        <FormArticulo data={articulo} action={updateArticulo} />
                    </Modal>

                    <Modal trigger={<XCircleIcon className="text-red-500" />} >
                        <FormArticulo data={articulo} action={deleteArticulo} disabled />
                    </Modal>

                </div>
            </CardArticulo >

        ))}

    </div>
)



export const FormArticulo = ({ data = {}, action, disabled }) => (
    <Form
        data={data}
        action={action}
        disabled={disabled}
        fields={[
            {
                name: "id",
                component: "InputHidden",
                value: data?.id,
            },
            {
                name: "nombre",
                label: "Nombre",
                component: "InputText",
                value: data?.nombre
            },
            {
                name: "descripcion",
                label: "Descripcion",
                component: "InputText",
                value: data?.descripcion
            },
            {
                name: "precio",
                label: "Precio",
                component: "InputNumber",
                value: data?.precio
            },
            {
                name: "proveedores",
                label: "Proveedores",
                component: "InputGroup",
                multiple: true,
                options: data?.proveedoresIdNombre?.map(({ id, nombre }) => ([nombre, id, data?.proveedores?.some(p => p.id === id)])) ?? []
            },

        ]}
    />
)

