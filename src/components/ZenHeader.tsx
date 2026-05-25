"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ZenHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: "Servicios", href: "/#servicios" },
    { label: "Proyectos", href: "/#proyectos" },
    { label: "Sobre Mí", href: "/#sobre-mi" },
  ];

  return (
    <header className="w-full bg-bg-zen/80 backdrop-blur-md sticky top-0 z-50 border-b border-border-zen/60">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif font-black text-2xl tracking-tight text-foreground-zen group-hover:text-pastel-sage-dark transition-colors duration-300">
            Antonn
          </span>
          <span className="w-2.5 h-2.5 bg-pastel-sage-dark rounded-full shadow-[0_0_10px_rgba(163,198,168,0.5)]" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-mono text-xs uppercase tracking-widest">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-foreground-zen/70 hover:text-foreground-zen transition-colors relative py-1.5 group"
            >
              <span>{item.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-pastel-sage-dark group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden sm:block">
          <Link
            href="/cotizar"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest bg-pastel-sage hover:bg-pastel-sage-dark text-foreground-zen px-6 py-3 rounded-full shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-bold"
          >
            <Sparkles size={12} className="text-pastel-sage-dark-foreground animate-pulse" />
            Cotizar Proyecto
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/cotizar"
            className="font-mono text-xs uppercase tracking-wider bg-pastel-sage text-foreground-zen px-4 py-2 rounded-full font-bold shadow-sm"
          >
            Cotizar
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-foreground-zen hover:text-pastel-sage-dark transition-colors focus:outline-none p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-bg-surface-zen border-t border-border-zen"
          >
            <div className="px-6 py-6 space-y-4 font-mono text-sm uppercase tracking-wider">
              {menuItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-2.5 text-foreground-zen/80 hover:text-foreground-zen border-b border-border-zen/20 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-2">
                <Link
                  href="/cotizar"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-3 bg-pastel-sage text-foreground-zen rounded-full font-bold shadow-sm"
                >
                  Cotizar tu Proyecto
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
