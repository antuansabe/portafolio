"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Code, Brain, Settings, ArrowDown, Award, Globe, User, BookOpen, Mail } from "lucide-react";
import { motion } from "framer-motion";

// Custom components
import ZenHeader from "@/components/ZenHeader";
import ParticleBackground from "@/components/ParticleBackground";
import ServiceCard from "@/components/ServiceCard";
import ProjectCard from "@/components/ProjectCard";

// Custom Github Icon component
const GithubIcon = ({ size = 16 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="shrink-0"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Home() {
  const services = [
    {
      number: "01",
      title: "Desarrollo Web",
      description: "Construcción de aplicaciones web de alto rendimiento, optimizadas para conversión, velocidad y diseño premium. Landing pages para startups, e-commerce fluidos y plataformas SaaS escalables con arquitecturas modernas.",
      features: ["Next.js 15 / Astro", "React / Tailwind CSS", "E-commerce & Stripe", "SEO & Core Web Vitals"],
      icon: Code,
    },
    {
      number: "02",
      title: "Integración de IA",
      description: "Implementación de capacidades cognitivas avanzadas directamente en tus flujos de negocio. Modelos de lenguaje LLM personalizados (GPT-4, Claude), sistemas OCR inteligentes, análisis de voz a texto y generación automática de contenido visual.",
      features: ["Chatbots & RAG", "OCR con Document Intel", "Voice-to-Text en vivo", "Modelos de DALL-E / SD"],
      icon: Brain,
    },
    {
      number: "03",
      title: "Consultoría AI",
      description: "Asesoramiento estratégico integral para empresas y startups que buscan optimizar costes y automatizar procesos usando Inteligencia Artificial. Diseño de arquitectura cloud, auditoría de sistemas e implementación práctica sin rodeos técnicos.",
      features: ["Estrategia de Adopción", "Arquitectura Azure AI", "Auditoría de Costes LLM", "Seguridad & Privacidad"],
      icon: Settings,
    },
  ];

  const projects = [
    {
      title: "TicketScan.AI",
      description: "Extractor inteligente de datos estructurados a partir de tickets y facturas físicas utilizando OCR de alta precisión alimentado por Azure AI y GPT-4. Automatiza la contabilidad reduciendo drásticamente la entrada manual de información.",
      stack: ["Azure AI", "OpenAI GPT-4", "React", "Flask", "Python"],
      metrics: ["Velocidad: 5-10s vs 15-20m manual", "Tasa de error: < 1% garantizada"],
      url: "https://ticketscan-ai.vercel.app",
      isPrivate: true,
      type: "ocr" as const,
    },
    {
      title: "VoiceNotes.AI",
      description: "Aplicación web de transcripción de voz a texto en tiempo real con alta fidelidad y corrección de estilo automática utilizando Azure Speech Services. Diseñado para reuniones, dictado profesional y generación de notas automatizadas.",
      stack: ["Azure Speech", "OpenAI GPT-4", "React", "Flask", "Python"],
      metrics: ["Latencia: < 2 segundos", "Precisión de transcripción: 98%+"],
      url: "https://ia-voicess.vercel.app",
      isPrivate: false,
      type: "voice" as const,
    },
    {
      title: "ImageGen.AI",
      description: "Generador de imágenes artísticas y fotorrealistas optimizado en costes mediante el uso inteligente de Azure OpenAI DALL-E 3. Permite a diseñadores y creadores de contenido formular prompts estructurados de alto impacto visual.",
      stack: ["Azure OpenAI DALL-E 3", "React", "Flask", "Python"],
      metrics: ["Generación: < 5 segundos", "Arquitectura optimizada en costes"],
      url: "https://image-gen-ai-seven.vercel.app",
      isPrivate: false,
      type: "image" as const,
    },
    {
      title: "Ritmia (iOS)",
      description: "Aplicación móvil y agente de inteligencia artificial nativo para iOS diseñado para el monitoreo y análisis en tiempo real de patrones cardíacos. Detecta anomalías y arritmias con alta fiabilidad directamente en el dispositivo.",
      stack: ["Swift", "CoreML", "Flask", "Python"],
      metrics: ["Latencia de análisis: 0.05 segundos", "Precisión diagnóstica: 99.2%"],
      url: "https://github.com/antuansabe",
      isPrivate: true,
      type: "mobile" as const,
    },
    {
      title: "NoHate-LATAM",
      description: "API de detección de discurso de odio entrenada específicamente para regionalismos, jergas y contextos culturales de América Latina. Publicado en la comunidad HuggingFace para democratizar la moderación en español.",
      stack: ["PyTorch", "Transformers", "FastAPI", "Docker"],
      metrics: ["Volumen: 15K+ consultas/mes", "Métrica F1-Score: 0.94"],
      url: "https://huggingface.co",
      isPrivate: false,
      type: "api" as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-bg-zen text-foreground-zen">
      {/* Zen Header */}
      <ZenHeader />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-16 md:py-24 space-y-24 sm:space-y-32">
        
        {/* HERO SECTION */}
        <section className="relative min-h-[50vh] sm:min-h-[60vh] flex flex-col justify-center pb-6 overflow-hidden px-2 sm:px-0">
          {/* Subtle Pastel Blobs Background */}
          <ParticleBackground />

          <div className="relative z-10 space-y-6 sm:space-y-8 max-w-4xl">
            {/* Top Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-pastel-sage/30 border border-pastel-sage/40 text-neutral-800 font-mono text-[10px] sm:text-xs uppercase tracking-widest rounded-full"
            >
              <span className="w-2 h-2 bg-pastel-sage-dark rounded-full animate-pulse" />
              Software & Inteligencia Artificial
            </motion.div>

            {/* Zen Geometric Headline (Fluid Responsive Scaling) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-neutral-800 tracking-tight leading-[1.1] sm:leading-[1.05]">
                Construyo productos <br className="hidden sm:inline" />
                <span className="italic text-pastel-sage-dark font-normal">digitales con IA</span>
              </h2>
            </motion.div>

            {/* Subheadline and Description */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 sm:pt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="md:col-span-2 space-y-4"
              >
                <p className="font-serif text-base sm:text-lg md:text-xl text-neutral-500 leading-relaxed font-light">
                  Senior AI Engineer · Full-Stack Developer · LATAM
                </p>
                <p className="text-foreground-zen/80 text-sm sm:text-base leading-relaxed max-w-2xl font-serif">
                  No desarrollo sitios web estáticos o genéricos; diseño sistemas interactivos con capacidades cognitivas. 
                  Traduzco de forma práctica modelos de Inteligencia Artificial de vanguardia en productos digitales elegantes, rápidos y 
                  con una arquitectura técnica impecable.
                </p>
              </motion.div>

              {/* CTAs column (Thumb-optimized layout on mobile) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-col gap-3 font-mono text-xs uppercase tracking-widest pt-4 md:pt-0 justify-end"
              >
                <Link
                  href="#proyectos"
                  className="bg-neutral-800 hover:bg-neutral-900 text-white font-bold py-4 px-6 rounded-full text-center transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md min-h-[48px]"
                >
                  Ver Mi Trabajo
                  <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </Link>
                <Link
                  href="/cotizar"
                  className="bg-pastel-sage hover:bg-pastel-sage-dark text-foreground-zen font-bold py-4 px-6 rounded-full text-center transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm min-h-[48px]"
                >
                  Cotiza tu Proyecto
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="servicios" className="space-y-8 sm:space-y-12 scroll-mt-24">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border-zen pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pastel-coral/20 border border-pastel-coral/30 text-neutral-700 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest rounded-full">
                Especialidades
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-neutral-800 tracking-tight">
                Servicios Profesionales
              </h2>
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-neutral-500 max-w-sm font-light leading-relaxed">
              Soluciones integrales de software de punta a punta, maximizando el valor mediante el uso estratégico de IA.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                number={service.number}
                title={service.title}
                description={service.description}
                features={service.features}
                icon={service.icon}
              />
            ))}
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="proyectos" className="space-y-8 sm:space-y-12 scroll-mt-24">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border-zen pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pastel-blue/35 border border-pastel-blue/40 text-neutral-700 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest rounded-full">
                Aplicaciones
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-neutral-800 tracking-tight">
                Proyectos Destacados
              </h2>
            </div>
            <p className="font-serif italic text-xs sm:text-sm text-neutral-500 max-w-sm font-light leading-relaxed">
              Una bitácora de productos diseñados, optimizados y desplegados con tecnología punta de IA y Web.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                stack={project.stack}
                metrics={project.metrics}
                url={project.url}
                isPrivate={project.isPrivate}
                type={project.type}
              />
            ))}
          </div>
        </section>

        {/* ABOUT ME SECTION */}
        <section id="sobre-mi" className="space-y-8 sm:space-y-12 scroll-mt-24">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-border-zen pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-pastel-cream/45 border border-pastel-cream/50 text-neutral-700 font-mono text-[9px] sm:text-[10px] uppercase tracking-widest rounded-full">
                Biografía
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-neutral-800 tracking-tight">
                Sobre el Autor
              </h2>
            </div>
            <div className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-neutral-400">
              Perfil Verificado · Antonio Fernandez
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left bio column */}
            <div className="md:col-span-2 space-y-6">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-black text-neutral-800 tracking-tight italic leading-snug">
                "No soy un programador que simplemente conecta APIs; traduzco la complejidad técnica en valor tangible."
              </h3>
              
              <div className="h-[1px] bg-border-zen w-16" />

              <div className="font-serif text-foreground-zen/80 space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  Hola, soy <strong>Antonio Fernandez</strong>, aunque en el ecosistema digital me conocen como <strong>Antonn</strong>. 
                  Me especializo en diseñar e implementar la arquitectura técnica donde el software de alta complejidad y los modelos de 
                  Inteligencia Artificial de última generación se integran para resolver necesidades reales del negocio.
                </p>
                <p>
                  Mi trayectoria se ha forjado en el desarrollo aplicado y experimental. Fui el creador de <strong>Ritmia</strong>, 
                  un agente móvil para iOS capaz de procesar y diagnosticar ritmos cardíacos en tiempo real directo en el dispositivo, 
                  y desarrollé <strong>NoHate-LATAM</strong>, un clasificador lingüístico NLP entrenado específicamente para interpretar 
                  modismos, jergas y contextos culturales de América Latina, publicado en HuggingFace.
                </p>
                <p>
                  Mi filosofía de trabajo prescinde de la burocracia corporativa y las plantillas prefabricadas. Creo en la rigurosidad 
                  de la ingeniería en la nube, la velocidad de ejecución y en crear interfaces que no solo se ven limpias, 
                  sino que están pensadas para cargar en milisegundos. Escribo sobre deconstrucción de ideas complejas en deconstruir.me.
                </p>
              </div>
            </div>

            {/* Right credentials column */}
            <div className="border border-border-zen bg-bg-surface-zen p-6 sm:p-8 rounded-3xl flex flex-col justify-between h-full relative shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="p-2.5 bg-pastel-sage/40 rounded-xl text-neutral-700 self-start">
                    <User size={18} />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Rol Principal</h4>
                    <p className="font-serif text-neutral-800 mt-0.5 text-sm font-bold">Senior AI Engineer</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2.5 bg-pastel-coral/30 rounded-xl text-neutral-700 self-start">
                    <Award size={18} />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Certificaciones</h4>
                    <p className="font-serif text-neutral-800 mt-0.5 text-sm font-bold">Azure AI Engineer Certified (AI-102)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="p-2.5 bg-pastel-blue/35 rounded-xl text-neutral-700 self-start">
                    <Globe size={18} />
                  </div>
                  <div>
                    <h4 className="font-mono text-[9px] sm:text-[10px] uppercase tracking-wider text-neutral-400 font-bold">Ubicación</h4>
                    <p className="font-serif text-neutral-800 mt-0.5 text-sm font-bold">LATAM / Remoto Global</p>
                  </div>
                </div>
              </div>

              <div className="h-[1px] bg-border-zen my-6" />

              {/* Direct Quick Links */}
              <div className="space-y-3 font-mono text-xs uppercase tracking-widest">
                <a
                  href="https://github.com/antuansabe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-neutral-500 hover:text-foreground-zen transition-colors py-2 border-b border-border-zen/60 min-h-[44px]"
                >
                  <span>GitHub</span>
                  <GithubIcon size={12} />
                </a>
                <a
                  href="https://deconstruir.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between text-neutral-500 hover:text-foreground-zen transition-colors py-2 border-b border-border-zen/60 min-h-[44px]"
                >
                  <span>Blog Personal</span>
                  <BookOpen size={12} />
                </a>
                <a
                  href="mailto:antuansabe@gmail.com"
                  className="flex items-center justify-between text-neutral-500 hover:text-foreground-zen transition-colors py-2 min-h-[44px]"
                >
                  <span>Email Directo</span>
                  <Mail size={12} />
                </a>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* EDITORIAL FOOTER */}
      <footer className="w-full bg-bg-surface-zen border-t border-border-zen py-10 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-wider text-neutral-400 text-center md:text-left">
          <div>
            © {new Date().getFullYear()} Antonio Fernandez · Todos los derechos reservados.
          </div>
          
          <div className="flex flex-wrap justify-center gap-6">
            <a href="https://github.com/antuansabe" target="_blank" rel="noopener noreferrer" className="hover:text-foreground-zen transition-colors py-1">
              GitHub
            </a>
            <a href="https://deconstruir.me" target="_blank" rel="noopener noreferrer" className="hover:text-foreground-zen transition-colors py-1">
              deconstruir.me
            </a>
            <a href="mailto:antuansabe@gmail.com" className="hover:text-foreground-zen transition-colors py-1">
              antuansabe@gmail.com
            </a>
          </div>

          <div className="text-[9px] sm:text-[10px] text-neutral-400">
            Diseño Playful Harmony
          </div>
        </div>
      </footer>
    </div>
  );
}
