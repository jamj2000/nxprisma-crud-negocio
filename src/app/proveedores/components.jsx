import { Modal, Form } from "@/components/simpleui"
import { createProveedor, deleteProveedor, updateProveedor } from "@/app/proveedores/actions"
import { CircleDotIcon, XCircleIcon } from "lucide-react"




export const CardProveedor = ({ children, proveedor }) => (
    <div className="w-full flex flex-col justify-between gap-4 md:flex-row bg-white rounded-lg overflow-hidden p-4 border border-slate-400 shadow-lg">
        <div>
            <p><strong>{proveedor.nombre}</strong></p>
            <p>{proveedor.nacional ? "Nacional" : "Extranjero"}</p>
        </div>
        <div>
            {children}
        </div>
    </div>
)




export const ListProveedores = ({ data }) => (

    <div className="flex flex-col gap-4">
        {data.map((proveedor) => (

            <CardProveedor key={proveedor.id} proveedor={proveedor} >
                <div className="flex gap-2 justify-end" >

                    <Modal trigger={<CircleDotIcon className="text-blue-500" />} >
                        <h2 className="text-blue-500 text-3xl">Modificar proveedor</h2>
                        <FormProveedor data={proveedor} action={updateProveedor} />
                    </Modal>

                    <Modal trigger={<XCircleIcon className="text-red-500" />} >
                        <h2 className="text-red-500 text-3xl">Eliminar proveedor</h2>
                        <FormProveedor data={proveedor} action={deleteProveedor} disabled />
                    </Modal>

                </div>
            </CardProveedor >

        ))}

    </div>
)






export const FormProveedor = ({ data = {}, action, disabled }) => {
    const submit = () => {
        switch (action) {
            case createProveedor: return {
                color: "green",
                component: "Submit",
                labels: ["Registrar proveedor", "Registrando proveedor ..."],
            }

            case updateProveedor: return {
                color: "blue",
                component: "Submit",
                labels: ["Modificar proveedor", "Modificando proveedor ..."],
            }

            case deleteProveedor: return {
                color: "red",
                component: "Submit",
                labels: ["Eliminar proveedor", "Eliminando proveedor ..."]
            }
            default:
                return null
        }
    }

    const submitField = submit();


    return (
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
                    name: "nacional",
                    label: "Nacionalidad",
                    component: "InputSelect",
                    options: [
                        ["Nacional", "true", data?.nacional == undefined ? true : data?.nacional],
                        ["Extranjero", "false", data?.nacional == undefined ? false : !data?.nacional],
                    ]
                },
                {
                    name: "articulos",
                    label: "Artículos",
                    component: "InputGroup",
                    multiple: true,
                    options: data?.articulosIdNombre?.map(({ id, nombre }) => ([nombre, id, data?.articulos?.some(p => p.id === id)])) ?? []
                },
                ...(submitField ? [submitField] : [])

            ]}
        />

    )
}


