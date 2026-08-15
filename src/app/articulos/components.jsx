import { Modal, Form } from "@/components/simpleui"
import { createArticulo, deleteArticulo, updateArticulo } from "@/app/articulos/actions"
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
                        <h2 className="text-blue-500 text-3xl">Modificar artículo</h2>
                        <FormArticulo data={articulo} action={updateArticulo} />
                    </Modal>

                    <Modal trigger={<XCircleIcon className="text-red-500" />} >
                        <h2 className="text-red-500 text-3xl">Eliminar artículo</h2>
                        <FormArticulo data={articulo} action={deleteArticulo} disabled />
                    </Modal>

                </div>
            </CardArticulo >

        ))}

    </div>
)



export const FormArticulo = ({ data = {}, action, disabled }) => {

    const submit = () => {
        switch (action) {
            case createArticulo: return {
                color: "green",
                component: "Submit",
                labels: ["Registrar artículo", "Registrando artículo ..."],
            }

            case updateArticulo: return {
                color: "blue",
                component: "Submit",
                labels: ["Modificar artículo", "Modificando artículo ..."],
            }

            case deleteArticulo: return {
                color: "red",
                component: "Submit",
                labels: ["Eliminar artículo", "Eliminando artículo ..."]
            }
            default:
                return null
        }
    }

    const submitField = submit();

    return (<Form
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
            ...(submitField ? [submitField] : [])
        ]}
    />
    )
}
