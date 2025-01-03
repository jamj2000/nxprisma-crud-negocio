

function Proveedor({ children, proveedor }) {
    return (
        <div className='card'>
            <p><strong>{proveedor.nombre}</strong></p>
            <p>Nacional: {proveedor.nacional ? 'Sí' : 'No'}</p>
            {children}
        </div>
    )
}

export default Proveedor