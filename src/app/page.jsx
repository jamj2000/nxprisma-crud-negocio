import Link from 'next/link'

export default async function Home() {

  return (
    <section>
      <h1 className='text-4xl font-bold'>Página de inicio</h1>
      <hr />
      <h3 className='text-2xl font-bold text-blue-400 my-3'><Link href={"/articulos"}>Listado de artículos</Link></h3>
      <h3 className='text-2xl font-bold text-blue-400 my-3'><Link href={"/proveedores"}>Listado de proveedores</Link></h3>
    </section>
  )
}
