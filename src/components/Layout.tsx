import type { ReactNode } from "react";

import logoRimacNavbar from "../assets/Logo-Navbar.svg";
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
          <div className="flex items-center">
            <img
              src={logoRimacNavbar}
              alt="RIMAC Seguros"
              className="h-6 md:h-8 w-auto"
            />
          </div>

          <div className="flex items-center gap-2 text-sm md:text-base">
            <span className="hidden md:inline text-black text-xs">
              ¡Compra por este medio!
            </span>
            <div className="flex items-center gap-2">
              {/* Ícono de teléfono SVG */}
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-gray-900 font-semibold">(01) 411 6001</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-14 md:h-16 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoRimacFooter}
              alt="RIMAC Seguros"
              className="h-5 md:h-6 w-auto opacity-80"
            />
          </div>

          <div className="text-xs md:text-sm text-gray-400">
            © 2025 RIMAC Seguros y Reaseguros.
          </div>
        </div>
      </footer>
    </div>
  );
}
