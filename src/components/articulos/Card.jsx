

function Card({ children, articulo }) {
    return (
        <div className="w-full flex flex-col justify-between gap-4 md:flex-row bg-white rounded-lg overflow-hidden p-4 border border-slate-400 shadow-lg">
            <div>
                <p><strong>{articulo.nombre}</strong></p>
                <p>{articulo.descripcion}</p>
                <p>{articulo.precio.toString()} €</p>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default Card