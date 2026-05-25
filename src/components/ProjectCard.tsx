"use client";

import React from "react";
import { ExternalLink, Lock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  stack: string[];
  metrics: string[];
  url: string;
  isPrivate?: boolean;
  type: "ocr" | "voice" | "image" | "mobile" | "api";
}

export default function ProjectCard({
  title,
  description,
  stack,
  metrics,
  url,
  isPrivate = false,
  type,
}: ProjectCardProps) {
  // Render visual mockups using pure SVG/CSS in pastel zen palette
  const renderVisualMockup = () => {
    switch (type) {
      case "ocr":
        return (
          <div className="w-full h-full bg-pastel-sage/20 flex flex-col justify-center items-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* OCR Laser Scanner Grid */}
            <div className="absolute inset-x-8 top-1/2 h-[2px] bg-pastel-sage-dark shadow-[0_0_8px_rgba(163,198,168,0.4)] z-10 animate-[bounce_3.5s_infinite]" />
            <div className="w-32 h-36 border border-border-zen bg-white/90 p-4 flex flex-col gap-2.5 relative rounded-2xl shadow-sm">
              <div className="w-1/2 h-2 bg-pastel-sage/50 rounded" />
              <div className="w-full h-2 bg-neutral-200 rounded" />
              <div className="w-3/4 h-2 bg-neutral-200 rounded" />
              <div className="w-5/6 h-2 bg-neutral-100 rounded" />
              <div className="mt-auto border-t border-border-zen pt-2 flex justify-between">
                <div className="w-8 h-1.5 bg-pastel-sage-dark/40 rounded" />
                <div className="w-12 h-1.5 bg-pastel-coral/30 rounded" />
              </div>
            </div>
          </div>
        );
      case "voice":
        return (
          <div className="w-full h-full bg-pastel-blue/20 flex flex-col justify-center items-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Voice Soundwaves */}
            <div className="flex items-center gap-1.5 z-10">
              {[0.3, 0.9, 0.5, 0.8, 0.4, 0.7, 0.9, 0.2, 0.6, 0.9, 0.4, 0.8, 0.3].map((val, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [12, val * 60, 12] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5 + (i % 3) * 0.2,
                    ease: "easeInOut",
                  }}
                  className="w-1 bg-pastel-blue rounded-full"
                />
              ))}
            </div>
            <div className="absolute bottom-3 font-mono text-[9px] text-neutral-400 font-bold tracking-widest uppercase">
              Procesamiento de Voz
            </div>
          </div>
        );
      case "image":
        return (
          <div className="w-full h-full bg-pastel-coral/15 flex flex-col justify-center items-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Image Gen AI Visual Mesh */}
            <svg className="w-full h-full opacity-40 absolute inset-0" viewBox="0 0 100 100">
              <path d="M10 20 L90 20 L50 80 Z" stroke="#F5CBB7" strokeWidth="0.8" fill="none" />
              <circle cx="10" cy="20" r="2" fill="#F5CBB7" />
              <circle cx="90" cy="20" r="2" fill="#F5CBB7" />
              <circle cx="50" cy="80" r="2" fill="#F5CBB7" />
            </svg>
            <div className="w-28 h-28 border border-dashed border-pastel-coral flex items-center justify-center p-3 rounded-2xl z-10 bg-white/90 shadow-sm relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-pastel-coral/10 to-transparent rounded-2xl animate-pulse" />
              <span className="font-serif italic text-[10px] text-neutral-500 text-center leading-normal">
                Generador de Arte Inteligente
              </span>
            </div>
          </div>
        );
      case "mobile":
        return (
          <div className="w-full h-full bg-pastel-cream/30 flex flex-col justify-center items-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* iOS Pulse / Ritmia */}
            <div className="w-24 h-40 border border-border-zen bg-white rounded-2xl relative p-3 flex flex-col gap-2.5 shadow-sm">
              <div className="w-6 h-1 bg-neutral-200 mx-auto rounded-full" />
              <svg className="w-full h-12" viewBox="0 0 100 30">
                <motion.path
                  d="M0 15 L20 15 L25 5 L30 25 L35 12 L40 15 L100 15"
                  stroke="#A3C6A8"
                  strokeWidth="2"
                  fill="none"
                  animate={{ pathLength: [0, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                />
              </svg>
              <div className="w-full h-4 bg-pastel-sage/20 rounded flex items-center justify-center text-[7px] font-mono text-neutral-600 font-bold uppercase tracking-wider">
                Normal Heart Rate
              </div>
            </div>
          </div>
        );
      case "api":
        return (
          <div className="w-full h-full bg-pastel-sage/10 flex flex-col justify-center items-center relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
            {/* Transformers API Node */}
            <div className="w-36 h-20 bg-white border border-border-zen rounded-xl flex flex-col justify-between p-3.5 shadow-sm">
              <div className="flex justify-between items-center border-b border-border-zen pb-1">
                <span className="font-mono text-[8px] text-neutral-500 font-bold">API / ANALYZE</span>
                <span className="w-2 h-2 bg-pastel-sage-dark rounded-full animate-ping" />
              </div>
              <div className="font-mono text-[7px] text-neutral-400 py-1 overflow-hidden leading-tight">
                {`{ "text": "Análisis de Sentimiento" }`}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-bg-surface-zen border border-border-zen rounded-3xl group flex flex-col h-full hover:border-pastel-sage-dark transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(163,198,168,0.06)] relative overflow-hidden">
      {/* Visual Mockup Container */}
      <div className="h-52 w-full relative overflow-hidden border-b border-border-zen">
        {renderVisualMockup()}
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-2xl font-black text-foreground-zen tracking-tight leading-none group-hover:text-neutral-800 transition-colors">
              {title}
            </h3>
            {isPrivate && (
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-full bg-neutral-50">
                <Lock size={9} />
                Privado
              </span>
            )}
          </div>

          <p className="text-foreground-zen/70 text-sm leading-relaxed mb-4 font-serif">
            {description}
          </p>

          {/* Tech badges as delicate rounded pills */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {stack.map((tech, i) => (
              <span
                key={i}
                className="font-mono text-[9px] uppercase tracking-wider text-neutral-500 bg-neutral-50 border border-border-zen px-2.5 py-0.5 rounded-full"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Column divider line */}
        <div>
          <div className="h-[1px] bg-border-zen/60 my-4" />

          {/* Metrics */}
          <div className="space-y-2 mb-5">
            <span className="text-[9px] font-mono uppercase tracking-widest text-neutral-400 block font-bold">
              Resultados Logrados:
            </span>
            <div className="flex flex-col gap-1.5">
              {metrics.map((metric, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-serif italic text-foreground-zen/80">
                  <CheckCircle2 size={13} className="text-pastel-sage-dark shrink-0" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Button Link */}
          {isPrivate ? (
            <div className="w-full flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400 bg-neutral-50 border border-border-zen/60 py-3 rounded-2xl cursor-not-allowed">
              <Lock size={12} />
              Código Privado
            </div>
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest bg-pastel-sage/50 text-foreground-zen border border-pastel-sage/20 py-3 rounded-2xl hover:bg-pastel-sage hover:border-transparent transition-all duration-300 font-bold"
            >
              <span>Ver Aplicación</span>
              <ExternalLink size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
