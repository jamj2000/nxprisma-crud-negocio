

function Card({ children, proveedor }) {
    return (
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
}

export default Card