import { Form } from "@/components/simpleui";




const FormArticulo = ({ data = {}, action, disabled }) => {

    const lista = data?.proveedores?.map(({ nombre }) => nombre) ?? []


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
                    options: data?.pr?.map(({ id, nombre }) => ([nombre, id, lista.includes(nombre)])) ?? []
                },

            ]}
        />
    )
}

export default FormArticulo