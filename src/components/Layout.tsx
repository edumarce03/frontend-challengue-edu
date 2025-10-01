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
      <nav className="bg-white  h-14 md:h-16 flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 h-full flex items-center justify-between">
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
      <main className="flex-1 flex items-center justify-center overflow-hidden relative">
        {/* Efectos de luz CONTAINED */}
        <div className="absolute bottom-0 right-80 size-50 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>
        <div className="absolute top-20 left-80 size-50 bg-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-70"></div>

        <div className="w-full relative z-10">{children}</div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white flex-shrink-0">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-0">
            <div className="flex justify-center md:justify-start">
              <img
                src={logoRimacFooter}
                alt="RIMAC Seguros"
                className="h-5 md:h-7 w-auto opacity-80"
              />
            </div>

            <div className="md:hidden h-px bg-gray-600 my-1" />

            <p className="text-xs text-white text-center md:text-right">
              © 2025 RIMAC Seguros y Reaseguros.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
