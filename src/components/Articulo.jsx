

function Articulo({ children, articulo }) {
    return (
        <div className='card'>
            <p><strong>{articulo.nombre}</strong></p>
            <p>{articulo.descripcion}</p>
            <p>{articulo.precio.toString()} €</p>
            {children}
        </div>
    )
}

export default Articulo