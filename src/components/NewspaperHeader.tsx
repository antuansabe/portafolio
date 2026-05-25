"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NewspaperHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const today = new Date().toLocaleDateString("es-ES", options);
    setFormattedDate(today.charAt(0).toUpperCase() + today.slice(1));
  }, []);

  const menuItems = [
    { label: "Servicios", href: "/#servicios" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Sobre Mí", href: "/#sobre-mi" },
  ];

  return (
    <header className="w-full bg-bg-dark border-b border-border-editorial relative z-50">
      {/* Newspaper Top Info Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 text-center text-xs font-mono uppercase tracking-widest text-neutral-500 border-b border-border-editorial/40 flex flex-col md:flex-row md:justify-between items-center gap-2">
        <div>Edición Digital · Vol. 2026 · No. 42</div>
        <div className="font-semibold text-accent-cyan">{formattedDate || "Mayo de 2026"}</div>
        <div className="hidden md:block">Disponibilidad: Proyectos Selectos (Q2-Q3)</div>
      </div>

      {/* Main Newspaper Masthead */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
        <Link href="/" className="inline-block group">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-neutral-100 group-hover:text-accent-cyan transition-colors duration-300">
            EL CRÓNICO DE LA IA
          </h1>
          <p className="font-serif italic text-sm sm:text-base md:text-lg text-neutral-400 mt-2 tracking-wide">
            "Construyendo productos digitales con Inteligencia Artificial" · Por Antonio Fernandez (Antonn)
          </p>
        </Link>
      </div>

      {/* Newspaper Editorial Lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-[2px] bg-neutral-800 w-full" />
        <div className="h-[1px] bg-neutral-800 w-full mt-[2px]" />
      </div>

      {/* Navigation Menu */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-mono text-sm uppercase tracking-wider">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-neutral-400 hover:text-accent-cyan transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Brand initials / Logo for mobile */}
        <Link
          href="/"
          className="md:hidden font-serif font-black text-xl text-neutral-100 tracking-tighter"
        >
          A.F.<span className="text-accent-cyan">_</span>
        </Link>

        {/* Call to Action Button */}
        <div className="hidden sm:block">
          <Link
            href="/cotizar"
            className="font-mono text-xs uppercase tracking-widest bg-transparent hover:bg-accent-cyan text-accent-cyan hover:text-bg-dark border border-accent-cyan hover:border-transparent px-4 py-2 rounded-none transition-all duration-300 flex items-center gap-2 group"
          >
            Cotizar tu Proyecto
            <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-4">
          <Link
            href="/cotizar"
            className="font-mono text-xs bg-accent-cyan/10 text-accent-cyan px-3 py-1.5 border border-accent-cyan/20"
          >
            Cotizar
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-neutral-400 hover:text-neutral-100 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Double lines under menu */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-1">
        <div className="h-[1px] bg-neutral-800 w-full" />
        <div className="h-[2px] bg-neutral-800 w-full mt-[2px]" />
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-surface border-t border-border-editorial"
          >
            <div className="px-4 py-4 space-y-3 font-mono text-sm uppercase tracking-wider">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2 text-neutral-400 hover:text-accent-cyan transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="h-[1px] bg-neutral-800 my-2" />
              <Link
                href="/cotizar"
                onClick={() => setIsOpen(false)}
                className="block text-center py-2.5 bg-accent-cyan text-bg-dark font-semibold tracking-widest text-xs uppercase"
              >
                Cotizar tu Proyecto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
