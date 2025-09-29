// src/components/Layout.tsx
import type { ReactNode } from "react";

// Importamos la imagen - asegúrate de tener el archivo en src/assets/
import logoRimacNavbar from "../assets/Logo-navbar.svg";
import logoRimacFooter from "../assets/Logo-Footer.svg";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
          {/* Logo como imagen */}
          <div className="flex items-center">
            <img
              src={logoRimacNavbar}
              alt="RIMAC Seguros"
              className="h-6 md:h-8 w-auto" // Ajusta la altura según necesites
            />
          </div>

          {/* Texto a la derecha */}
          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="hidden md:inline text-gray-600">
              ¡Compra por este medio!
            </span>
            <span className="text-gray-900 font-semibold">(01) 411 6001</span>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
          {/* Logo como imagen */}
          <div className="flex items-center">
            <img
              src={logoRimacFooter}
              alt="RIMAC Seguros"
              className="h-5 md:h-6 w-auto opacity-80" // Un poco más pequeño y con opacidad
            />
          </div>

          {/* Texto a la derecha */}
          <div className="text-xs md:text-sm text-gray-400">
            © 2025 RIMAC Seguros y Reaseguros.
          </div>
        </div>
      </footer>
    </div>
  );
}
