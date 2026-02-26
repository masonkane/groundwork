"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoFull } from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        <Link href="/">
          <LogoFull className="h-6 sm:h-8 w-auto" />
        </Link>
        <div className="flex items-center gap-3 sm:gap-6">
          <Link
            href="#how-it-works"
            className="text-sm text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors hidden sm:block"
          >
            How It Works
          </Link>
          <Link
            href="#features"
            className="text-sm text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors hidden sm:block"
          >
            Features
          </Link>
          <Link
            href="/questionnaire"
            className="group relative bg-[var(--black)] text-white text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full overflow-hidden transition-all hover:shadow-[0_2px_20px_rgba(0,0,0,0.2)] min-h-[44px] inline-flex items-center"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
            <span className="relative z-10">Get Your Report</span>
          </Link>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex items-center justify-center w-11 h-11 -mr-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
              className="transition-transform duration-200"
            >
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7" x2="20" y2="7" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-black/5 bg-white/80 backdrop-blur-xl">
          <div className="px-4 py-4 flex flex-col gap-1">
            <Link
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors py-3 px-2 rounded-lg hover:bg-black/[0.03] min-h-[44px] flex items-center"
            >
              How It Works
            </Link>
            <Link
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="text-sm font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors py-3 px-2 rounded-lg hover:bg-black/[0.03] min-h-[44px] flex items-center"
            >
              Features
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
