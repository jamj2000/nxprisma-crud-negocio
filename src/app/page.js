import Link from 'next/link'

export default async function Home() {

  return (
    <section>
      <h1>Página de inicio</h1>
      <hr />
      <h3><Link href={"/articulos"}>Listado de artículos</Link></h3>      
      <h3><Link href={"/proveedores"}>Listado de proveedores</Link></h3>     
    </section>
  )
}
