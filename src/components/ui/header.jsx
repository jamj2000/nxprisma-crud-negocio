import Image from "next/image";
import Link from "next/link";
import { MainMenu, MenuLink } from "@/components/simpleui";
import { Suspense } from "react";

export default function Header() {
    return (
        <nav className="fixed top-0 z-50 px-2 w-full flex gap-2 items-center justify-between py-4 bg-neutral-500/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-black rounded-full px-4">
                <Logo />
            </div>

            <div className="flex gap-2 items-center">
                <MainMenu>
                    <Suspense>
                        <MenuLink href="/articulos">Artículos</MenuLink>
                        <MenuLink href="/proveedores">Proveedores</MenuLink>
                    </Suspense>
                </MainMenu>
            </div>
        </nav>
    );
}

const Logo = () => (
    <Link
        href="/"
        className="flex gap-3 items-center">

        <Image
            src="/logo.png"
            height={48}
            width={48}
            alt="Negocio Logo"
            loading="eager"
        />

        <span className="hidden sm:block self-center text-xl font-semibold whitespace-nowrap text-gray-900 dark:text-gray-100/80">
            Negocio
        </span>
    </Link>
)
