'use client'

import { usePathname } from 'next/navigation'
import Link from "next/link"

function Navbar() {
    const pathname = usePathname()

    return (
        <nav>
            <div>
                <Link href="/"
                    className={pathname == '/' ? 'item-selected' : ''} >
                    Inicio
                </Link>
                <Link href="/articulos"
                    className={pathname.startsWith('/articulos') ? 'item-selected' : ''} >
                    Artículos
                </Link>
                <Link href="/proveedores"
                    className={pathname.startsWith('/proveedores') ? 'item-selected' : ''} >
                    Proveedores
                </Link>
            </div>
            <div>
                <Link href="/acerca"
                    className={pathname.startsWith('/acerca') ? 'item-selected' : ''} >
                    Acerca de ...
                </Link>
            </div>
        </nav>
    )
}

export default Navbar