
function layoutArticulos({ children }) {
    return (
        <section>
            <h1 className="text-4xl font-bold">Artículos</h1>
            <hr />
            {children}
        </section>
    )
}

export default layoutArticulos