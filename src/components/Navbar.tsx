"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { LogoFull } from "./Logo";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-black/5 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/">
          <LogoFull className="h-7 w-auto" />
        </Link>
        <div className="flex items-center gap-6">
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
            className="bg-[var(--black)] text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[var(--dark-surface)] transition-colors"
          >
            Get Your Report
          </Link>
        </div>
      </div>
    </nav>
  );
}
