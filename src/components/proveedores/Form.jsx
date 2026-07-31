import { Form } from "@/components/simpleui";




const FormProveedor = ({ data = {}, action, disabled }) => {

    const lista = data?.articulos?.map(({ nombre }) => nombre) ?? []


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
                        ["Nacional", "true", data?.nacional === true],
                        ["Extranjero", "false", data?.nacional !== true],
                    ]
                },
                {
                    name: "articulos",
                    label: "Artículos",
                    component: "InputGroup",
                    multiple: true,
                    options: data?.ar?.map(({ id, nombre }) => ([nombre, id, lista.includes(nombre)])) ?? []
                },

            ]}
        />
    )
}

export default FormProveedor