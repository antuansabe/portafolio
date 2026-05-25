"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Send, CheckCircle, Sparkles, Mail, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import confetti from "canvas-confetti";

export default function CotizarPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  // Simplified form state (Conversational, jargon-free)
  const [formData, setFormData] = useState({
    // SECCIÓN 1: Negocio
    nombreNegocio: "",
    giro: "Servicios (Consultorio, Despacho, etc.)",
    descripcionNegocio: "",
    tieneDominio: "No sé qué es esto",
    dominioActual: "",
    tieneLogo: "No, necesito que lo diseñen",

    // SECCIÓN 2: Objetivo del sitio
    objetivos: {
      "Tener presencia en internet y que me conozcan": false,
      "Vender mis productos directamente en línea (E-commerce)": false,
      "Ofrecer y cobrar mis servicios profesionales": false,
      "Recibir mensajes y datos de clientes interesados": false,
      "Publicar artículos, noticias o recetas (Blog)": false,
      "Que mis clientes puedan agendar citas o reservar": false,
      "Otro propósito": false,
    } as Record<string, boolean>,
    clienteIdeal: "",
    oneAction: "",

    // SECCIÓN 3: Páginas y contenido
    paginas: {
      "Inicio (Página principal)": true,
      "Quiénes somos (Sobre nosotros)": false,
      "Nuestros Servicios": false,
      "Catálogo de Productos": false,
      "Sección de Blog / Noticias": false,
      "Formulario de Contacto": true,
      "Galería de fotos o videos": false,
      "Preguntas Frecuentes (FAQ)": false,
      "Precios / Tarifas": false,
      "Otras secciones": false,
    } as Record<string, boolean>,
    contenidoEscrito: "No tengo nada, necesito que redacten todo por mí",
    fotosPropias: "No tengo, prefiero usar imágenes de stock gratuitas",
    referenciasSitios: "",

    // SECCIÓN 4: Funcionalidades
    funcionalidades: {
      "Formulario para recibir correos": true,
      "Botón flotante para chatear por WhatsApp": false,
      "Mapa de Google para mostrar mi ubicación": false,
      "Chat en vivo en la pantalla de la web": false,
      "Carrito de compras en línea": false,
      "Cobros con tarjeta en línea (Stripe, PayPal, Clip)": false,
      "Sistema de reservación de citas con calendario": false,
      "Galería para presumir fotos o videos": false,
      "Sección para que mis clientes dejen opiniones reales": false,
      "Panel de administrador para subir contenido yo mismo": false,
      "Registro de usuarios con contraseña": false,
      "Enlaces directos a mis redes sociales": false,
    } as Record<string, boolean>,
    integracionSistemas: "",

    // SECCIÓN 5: Diseño
    estiloVisual: "Limpio, elegante y moderno",
    coloresMarca: "",
    tieneManualMarca: "No",
    tipografiaPreferida: "Sin preferencia, confío en tu criterio",

    // SECCIÓN 6: Técnico
    visitasEsperadas: "Entre 100 y 500 personas",
    necesitaMultiidioma: "No",
    dispositivos: {
      "Teléfonos celulares (móvil)": true,
      "Computadoras de escritorio": true,
      "Tabletas": false,
    } as Record<string, boolean>,
    scopeHosting: "Todo incluido (llave en mano sin preocuparme de nada)",

    // SECCIÓN 7: Tiempos y presupuesto
    cuandoNecesita: "En un mes aproximadamente",
    presupuestoAproximado: "Entre $15,000 y $30,000 MXN",
    notasAdicionales: "",

    // SECCIÓN 8: Contacto
    contactoNombre: "",
    contactoEmail: "",
    contactoWhatsapp: "",
    preferenciaContacto: "Indiferente",
  });

  const totalSteps = 8;

  // Check if environment variables exist
  useEffect(() => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setIsDemoMode(true);
    }
  }, []);

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateCheckboxGroup = (
    groupKey: "objetivos" | "paginas" | "funcionalidades" | "dispositivos",
    itemKey: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [groupKey]: {
        ...prev[groupKey],
        [itemKey]: checked,
      },
    }));
  };

  const isStepValid = () => {
    if (currentStep === 1) {
      return formData.nombreNegocio.trim() !== "" && formData.descripcionNegocio.trim() !== "";
    }
    if (currentStep === 8) {
      return formData.contactoNombre.trim() !== "" && formData.contactoEmail.trim() !== "";
    }
    return true;
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (isStepValid()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getGiros = () => [
    "Servicios (Consultorio, Despacho, etc.)",
    "Venta de Productos (Comercio)",
    "Comida y Bebida (Restaurante, Café)",
    "Salud y Bienestar",
    "Educación y Cursos",
    "Tecnología y Apps",
    "Otro",
  ];

  const getVisitasList = () => [
    "Menos de 100 personas",
    "Entre 100 y 500 personas",
    "Entre 500 y 2,000 personas",
    "Más de 2,000 personas",
    "No tengo idea",
  ];

  const getTimelines = () => [
    "¡Lo antes posible! (menos de 2 semanas)",
    "En un mes aproximadamente",
    "De 1 a 3 meses",
    "Sin prisa",
  ];

  const getBudgets = () => [
    "Menos de $5,000 MXN",
    "Entre $5,000 y $15,000 MXN",
    "Entre $15,000 y $30,000 MXN",
    "Entre $30,000 y $60,000 MXN",
    "Más de $60,000 MXN",
    "No estoy seguro / A discutir",
  ];

  const generateClaudeMd = () => {
    const pagesList = Object.entries(formData.paginas)
      .filter(([_, checked]) => checked)
      .map(([page, _]) => `- **${page}**`)
      .join("\n");

    const featuresList = Object.entries(formData.funcionalidades)
      .filter(([_, checked]) => checked)
      .map(([feat, _]) => `- **${feat}**`)
      .join("\n");

    const devicesList = Object.entries(formData.dispositivos)
      .filter(([_, checked]) => checked)
      .map(([device, _]) => device)
      .join(", ");

    const goalsList = Object.entries(formData.objetivos)
      .filter(([_, checked]) => checked)
      .map(([goal, _]) => goal)
      .join(", ");

    return `---
# BRIEF: ${formData.nombreNegocio}

## CONTEXTO DEL NEGOCIO
- **Nombre del negocio/marca:** ${formData.nombreNegocio}
- **A qué se dedica:** ${formData.giro}
- **Descripción sencilla:** ${formData.descripcionNegocio}
- **Tiene dominio/web anterior:** ${formData.tieneDominio === "Sí, ya lo compré" ? formData.dominioActual || "Sí" : formData.tieneDominio}
- **Logotipo disponible:** ${formData.tieneLogo}

## OBJETIVO
- **Propósito principal:** ${goalsList || "No especificado"}
- **Cliente ideal:** ${formData.clienteIdeal || "No especificado"}
- **Acción principal requerida:** ${formData.oneAction || "No especificado"}

## PÁGINAS REQUERIDAS
${pagesList || "- Ninguna seleccionada"}

## ESTADO DEL CONTENIDO
- **Copy (Textos):** ${formData.contenidoEscrito}
- **Fotos:** ${formData.fotosPropias}
- **Sitios de referencia:** ${formData.referenciasSitios || "Ninguno"}

## FUNCIONALIDADES
${featuresList || "- Ninguna seleccionada"}

## DISEÑO
- **Estilo visual deseado:** ${formData.estiloVisual}
- **Colores elegidos:** ${formData.coloresMarca || "No especificado"}
- **Tiene manual de marca:** ${formData.tieneManualMarca}
- **Tipografía:** ${formData.tipografiaPreferida}

## STACK SUGERIDO (a definir)
- Framework: Next.js 15 o Astro (según complejidad)
- Styling: Tailwind CSS
- CMS: Contentlayer / Sanity (si tiene blog)
- Hosting: Vercel
- Pagos: Stripe / Clip (si aplica)

## RESTRICCIONES TÉCNICAS
- **Visitas esperadas:** ${formData.visitasEsperadas}
- **Prioridad dispositivos:** ${devicesList || "No especificado"}
- **Requiere multiidioma:** ${formData.necesitaMultiidioma}
- **Scope del servicio:** ${formData.scopeHosting}

## TIMELINE Y BUDGET
- **Deadline sugerido:** ${formData.cuandoNecesita}
- **Presupuesto:** ${formData.presupuestoAproximado}

## CONTACTO DEL CLIENTE
- **Nombre:** ${formData.contactoNombre}
- **Email:** ${formData.contactoEmail}
- **WhatsApp:** ${formData.contactoWhatsapp || "No especificado"}
- **Preferencia para contactar:** ${formData.preferenciaContacto}

## NOTAS ADICIONALES
${formData.notasAdicionales || "Ninguna"}
---`;
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`[COTIZACIÓN] ${formData.nombreNegocio} - ${formData.giro} - ${formData.presupuestoAproximado}`);
    const body = encodeURIComponent(generateClaudeMd());
    return `mailto:antuansabe@gmail.com?subject=${subject}&body=${body}`;
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#A3C6A8", "#F5CBB7", "#C3D3E4", "#ffffff"],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isStepValid()) return;

    setIsSubmitting(true);
    setIsError(false);

    const emailSubject = `[COTIZACIÓN] ${formData.nombreNegocio} - ${formData.giro} - ${formData.presupuestoAproximado}`;
    const emailBody = generateClaudeMd();

    // Simulation/Demo mode for local testing
    if (isDemoMode) {
      setLoadingText("Estructurando especificación técnica...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingText("Conectando con buzón de desarrollo local...");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoadingText("Abriendo tu correo nativo para el envío...");
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Trigger automatic mailto in background
      window.location.href = getMailtoUrl();

      triggerConfetti();
      setIsSuccess(true);
      setIsSubmitting(false);
      return;
    }

    try {
      setLoadingText("Conectando con EmailJS...");
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS credentials.");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          subject: emailSubject,
          message: emailBody,
          client_name: formData.contactoNombre,
          client_email: formData.contactoEmail,
          business_name: formData.nombreNegocio,
        },
        publicKey
      );

      triggerConfetti();
      setIsSuccess(true);
    } catch (err: any) {
      console.warn("EmailJS Failed, falling back to simulated mailto:", err);
      // Automatic fallback if EmailJS fails so it NEVER blocks the user!
      window.location.href = getMailtoUrl();
      triggerConfetti();
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-bg-zen text-foreground-zen selection:bg-pastel-sage">
      
      {/* Mini Zen Header */}
      <header className="w-full bg-bg-zen/80 border-b border-border-zen/60 py-5 text-center">
        <Link href="/" className="inline-flex items-center gap-2 group">
          <span className="font-serif font-black text-xl tracking-tight text-foreground-zen">
            Antonn
          </span>
          <span className="w-2 h-2 bg-pastel-sage-dark rounded-full" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 block ml-2">
            · Cotizador
          </span>
        </Link>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-xl w-full mx-auto px-4 py-6 sm:py-10 flex flex-col justify-center">
        
        {/* Soft Pastel Demo Mode Notification */}
        {isDemoMode && !isSuccess && !isError && (
          <div className="mb-5 p-4 bg-pastel-sage/20 border border-pastel-sage-dark/30 rounded-2xl flex gap-3 text-xs text-neutral-700 leading-relaxed shadow-sm">
            <Sparkles size={16} className="text-pastel-sage-dark shrink-0 mt-0.5 animate-pulse" />
            <div>
              <span className="font-bold block uppercase tracking-wider text-[9px] text-neutral-800 mb-0.5">
                Modo Demo Activado
              </span>
              Rellena los datos. Al dar clic en enviar se abrirá **tu aplicación de correo** con tu especificación estructurada lista para enviar.
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-border-zen p-6 sm:p-10 text-center space-y-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)]"
            >
              <div className="w-16 h-16 bg-pastel-sage/40 rounded-full flex items-center justify-center mx-auto text-neutral-700">
                <CheckCircle size={30} />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-black text-neutral-800 tracking-tight leading-tight">
                ¡Cotización Preparada!
              </h2>

              <p className="text-foreground-zen/80 font-serif leading-relaxed max-w-sm mx-auto text-xs sm:text-sm">
                Se ha generado tu especificación técnica detallada. Te contactaré en menos de 24 horas 
                para platicar sobre el inicio de tu proyecto.
              </p>

              <div className="bg-bg-zen border border-border-zen p-3.5 rounded-2xl max-h-36 overflow-y-auto text-left">
                <pre className="font-mono text-[9px] text-neutral-500 whitespace-pre-wrap select-all leading-normal">
                  {generateClaudeMd()}
                </pre>
              </div>

              <div className="h-[1px] bg-border-zen my-5" />

              <div className="flex flex-col gap-2.5">
                <a
                  href={getMailtoUrl()}
                  className="font-mono text-xs uppercase tracking-widest bg-pastel-sage hover:bg-pastel-sage-dark text-foreground-zen font-bold py-3.5 px-6 rounded-full transition-all duration-300 flex items-center justify-center gap-2 min-h-[48px]"
                >
                  <Mail size={14} />
                  Enviar por Correo
                </a>
                <Link
                  href="/"
                  className="font-mono text-xs uppercase tracking-widest border border-border-zen hover:border-neutral-400 text-neutral-500 hover:text-foreground-zen font-bold py-3.5 px-6 rounded-full transition-all duration-300 flex items-center justify-center min-h-[48px]"
                >
                  Regresar al Inicio
                </Link>
              </div>
            </motion.div>
          ) : (
            /* MULTI-STEP FORM */
            <form onSubmit={currentStep === totalSteps ? handleSubmit : handleNext} className="space-y-5">
              
              {/* Progress indicator */}
              <div className="space-y-2">
                <div className="flex justify-between items-end font-mono text-[9px] sm:text-[10px] text-neutral-400 uppercase tracking-widest px-1">
                  <span>Paso {currentStep} de {totalSteps}</span>
                  <span className="text-pastel-sage-dark font-bold">
                    {Math.round((currentStep / totalSteps) * 100)}% Listo
                  </span>
                </div>
                {/* Visual Progress Bar */}
                <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden relative border border-border-zen/30">
                  <motion.div
                    className="h-full bg-pastel-sage-dark rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Step Forms Container (Comfortable, Mobile-Optimized padding) */}
              <div className="bg-white border border-border-zen p-5 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] space-y-5 relative overflow-hidden">
                
                {/* Submitting Loader Overlay */}
                <AnimatePresence>
                  {isSubmitting && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col justify-center items-center p-6 text-center space-y-4"
                    >
                      <div className="relative w-14 h-14">
                        <div className="absolute inset-0 border-4 border-pastel-sage/30 rounded-full" />
                        <div className="absolute inset-0 border-4 border-pastel-sage-dark border-t-transparent rounded-full animate-spin" />
                      </div>
                      <h3 className="font-serif text-base font-bold text-neutral-800 pt-2">
                        Procesando tu Cotización
                      </h3>
                      <p className="font-mono text-[10px] text-neutral-500 uppercase tracking-wider animate-pulse">
                        {loadingText || "Preparando..."}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {/* STEP 1: NEGOCIO */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Cómo se llama tu proyecto o negocio? *
                        </h3>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Café Zen o Consultorio Dental"
                          value={formData.nombreNegocio}
                          onChange={(e) => updateField("nombreNegocio", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all focus:ring-2 focus:ring-pastel-sage/35 min-h-[48px]"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿A qué se dedica principalmente?
                        </h3>
                        <select
                          value={formData.giro}
                          onChange={(e) => updateField("giro", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all min-h-[48px]"
                        >
                          {getGiros().map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          Cuéntanos brevemente de qué trata tu negocio *
                        </h3>
                        <textarea
                          required
                          rows={3}
                          placeholder="Ej: Ofrecemos masajes terapéuticos a domicilio. Queremos capturar citas de clientes locales..."
                          value={formData.descripcionNegocio}
                          onChange={(e) => updateField("descripcionNegocio", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all resize-none focus:ring-2 focus:ring-pastel-sage/35 min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿Ya has comprado el nombre de tu web (ej: www.miweb.com)?
                        </h4>
                        <div className="flex flex-col gap-2">
                          {["Sí, ya lo compré", "No, necesito ayuda para comprarlo", "No sé qué es esto"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition-all min-h-[48px] ${formData.tieneDominio === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="radio"
                                name="tieneDominio"
                                value={opt}
                                checked={formData.tieneDominio === opt}
                                onChange={() => updateField("tieneDominio", opt)}
                                className="accent-pastel-sage-dark w-5 h-5 shrink-0"
                              />
                              <span className="font-serif text-sm text-neutral-700 font-semibold">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿Cuentas con un logotipo de tu marca?
                        </h4>
                        <div className="flex flex-col gap-2">
                          {["Sí, ya tengo un logo", "No, necesito que lo diseñen", "Está en proceso de creación"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition-all min-h-[48px] ${formData.tieneLogo === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="radio"
                                name="tieneLogo"
                                value={opt}
                                checked={formData.tieneLogo === opt}
                                onChange={() => updateField("tieneLogo", opt)}
                                className="accent-pastel-sage-dark w-5 h-5 shrink-0"
                              />
                              <span className="font-serif text-sm text-neutral-700 font-semibold">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      {formData.tieneDominio === "Sí, ya lo compré" && (
                        <div className="space-y-1 pt-1">
                          <h4 className="font-serif text-xs font-bold text-neutral-500 uppercase tracking-wide">Dirección web actual</h4>
                          <input
                            type="text"
                            placeholder="Ej: www.minegocio.com"
                            value={formData.dominioActual}
                            onChange={(e) => updateField("dominioActual", e.target.value)}
                            className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                          />
                        </div>
                      )}
                    </motion.div>
                  )}

                  {/* STEP 2: OBJETIVOS */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Para qué te gustaría tener esta página web?
                        </h3>
                        <p className="font-serif text-xs text-neutral-400 italic">Elige las opciones que necesites.</p>
                        <div className="flex flex-col gap-2 pt-1">
                          {Object.keys(formData.objetivos).map((goal) => (
                            <label
                              key={goal}
                              className={`flex items-center gap-3 p-3.5 border rounded-2xl cursor-pointer transition-all min-h-[48px] ${formData.objetivos[goal] ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="checkbox"
                                checked={formData.objetivos[goal]}
                                onChange={(e) => updateCheckboxGroup("objetivos", goal, e.target.checked)}
                                className="accent-pastel-sage-dark w-5 h-5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold leading-snug">{goal}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-border-zen/60">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Cómo es tu cliente ideal?
                        </h3>
                        <textarea
                          rows={2}
                          placeholder="Ej: Personas locales que quieren agendar masajes para relajarse..."
                          value={formData.clienteIdeal}
                          onChange={(e) => updateField("clienteIdeal", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all resize-none min-h-[70px]"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Cuál es la acción principal del visitante?
                        </h3>
                        <input
                          type="text"
                          placeholder="Ej: Que me mande WhatsApp o reserve una hora..."
                          value={formData.oneAction}
                          onChange={(e) => updateField("oneAction", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all min-h-[48px]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: SECCIONES Y CONTENIDO */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Qué secciones te gustaría incluir en la web?
                        </h3>
                        <div className="flex flex-col gap-2 pt-1 max-h-60 overflow-y-auto pr-1">
                          {Object.keys(formData.paginas).map((page) => (
                            <label
                              key={page}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.paginas[page] ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="checkbox"
                                checked={formData.paginas[page]}
                                onChange={(e) => updateCheckboxGroup("paginas", page, e.target.checked)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold">{page}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿Ya tienes la información (textos) escrita?
                        </h4>
                        <div className="flex flex-col gap-2">
                          {["Sí, ya tengo todo escrito", "Tengo una parte escrita, pero necesito ayuda para pulirla", "No tengo nada, necesito que redacten todo por mí"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.contenidoEscrito === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="radio"
                                name="contenidoEscrito"
                                value={opt}
                                checked={formData.contenidoEscrito === opt}
                                onChange={() => updateField("contenidoEscrito", opt)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold leading-tight">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿Cuentas con fotografías del negocio?
                        </h4>
                        <div className="flex flex-col gap-2">
                          {["Sí, tengo fotos de alta calidad", "No tengo, prefiero usar imágenes de stock gratuitas", "Tengo algunas fotos pero me gustaría mezclarlas con stock"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.fotosPropias === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="radio"
                                name="fotosPropias"
                                value={opt}
                                checked={formData.fotosPropias === opt}
                                onChange={() => updateField("fotosPropias", opt)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold leading-tight">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-border-zen/60">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          Referencias de páginas que te gusten
                        </h3>
                        <textarea
                          rows={2}
                          placeholder="Ej: www.apple.com por su elegancia y sencillez..."
                          value={formData.referenciasSitios}
                          onChange={(e) => updateField("referenciasSitios", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all resize-none min-h-[70px]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 4: FUNCIONES ESPECIALES */}
                  {currentStep === 4 && (
                    <motion.div
                      key="step4"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Qué te gustaría que haga la página?
                        </h3>
                        <div className="flex flex-col gap-2 pt-1 max-h-80 overflow-y-auto pr-1">
                          {Object.keys(formData.funcionalidades).map((feat) => (
                            <label
                              key={feat}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.funcionalidades[feat] ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="checkbox"
                                checked={formData.funcionalidades[feat]}
                                onChange={(e) => updateCheckboxGroup("funcionalidades", feat, e.target.checked)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold leading-tight">{feat}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-border-zen/60">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Deseas conectar algún sistema que ya uses?
                        </h3>
                        <textarea
                          rows={2}
                          placeholder="Ej: Que guarde datos en Google Sheets..."
                          value={formData.integracionSistemas}
                          onChange={(e) => updateField("integracionSistemas", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all resize-none min-h-[70px]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 5: ASPECTO VISUAL */}
                  {currentStep === 5 && (
                    <motion.div
                      key="step5"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Qué vibra o estilo te gustaría para el diseño?
                        </h3>
                        <div className="flex flex-col gap-2.5">
                          {[
                            { name: "Limpio, elegante y moderno", desc: "Minimalista, mucha paz visual y colores equilibrados." },
                            { name: "Colorido, alegre y creativo", desc: "Acentos alegres, dinámico y muy llamativo." },
                            { name: "Cálido, hogareño y amigable", desc: "Sensación acogedora, formas orgánicas y suaves." },
                            { name: "Serio, formal y corporativo", desc: "Estructuras firmes, colores neutros y aspecto institucional." },
                          ].map((style) => (
                            <label
                              key={style.name}
                              className={`flex flex-col p-3.5 border rounded-2xl cursor-pointer transition-all ${formData.estiloVisual === style.name ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <div className="flex items-center gap-3">
                                <input
                                  type="radio"
                                  name="estiloVisual"
                                  value={style.name}
                                  checked={formData.estiloVisual === style.name}
                                  onChange={() => updateField("estiloVisual", style.name)}
                                  className="accent-pastel-sage-dark w-5 h-5 shrink-0"
                                />
                                <span className="font-serif text-sm font-bold text-neutral-800 leading-tight">{style.name}</span>
                              </div>
                              <span className="font-mono text-[9px] text-neutral-400 mt-1 pl-8 leading-normal">{style.desc}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-border-zen/60">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          Colores preferidos para tu marca
                        </h3>
                        <input
                          type="text"
                          placeholder="Ej: Azul y blanco arena..."
                          value={formData.coloresMarca}
                          onChange={(e) => updateField("coloresMarca", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        />
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿Tienes un manual de identidad o colores definidos?
                        </h4>
                        <div className="flex gap-4">
                          {["Sí", "No"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex-1 flex items-center justify-center gap-2 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.tieneManualMarca === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20"}`}
                            >
                              <input
                                type="radio"
                                name="tieneManualMarca"
                                value={opt}
                                checked={formData.tieneManualMarca === opt}
                                onChange={() => updateField("tieneManualMarca", opt)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5"
                              />
                              <span className="font-serif text-sm text-neutral-700 font-semibold">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          Preferencia en estilos de letra
                        </h4>
                        <div className="flex flex-col gap-2">
                          {["Sin preferencia, confío en tu criterio", "Con serifas (clásicas y elegantes)", "Sin serifas (limpias y minimalistas)"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.tipografiaPreferida === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="radio"
                                name="tipografiaPreferida"
                                value={opt}
                                checked={formData.tipografiaPreferida === opt}
                                onChange={() => updateField("tipografiaPreferida", opt)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 6: TÉCNICO */}
                  {currentStep === 6 && (
                    <motion.div
                      key="step6"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Cuántas visitas esperas al mes aproximadamente?
                        </h3>
                        <select
                          value={formData.visitasEsperadas}
                          onChange={(e) => updateField("visitasEsperadas", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        >
                          {getVisitasList().map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿La página se leerá en más de un idioma?
                        </h4>
                        <div className="flex flex-col gap-2">
                          {["Sí", "No", "Tal vez en el futuro"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.necesitaMultiidioma === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="radio"
                                name="necesitaMultiidioma"
                                value={opt}
                                checked={formData.necesitaMultiidioma === opt}
                                onChange={() => updateField("necesitaMultiidioma", opt)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿Desde qué aparatos te visitarán más?
                        </h4>
                        <div className="flex flex-col gap-2">
                          {Object.keys(formData.dispositivos).map((device) => (
                            <label
                              key={device}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.dispositivos[device] ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="checkbox"
                                checked={formData.dispositivos[device]}
                                onChange={(e) => updateCheckboxGroup("dispositivos", device, e.target.checked)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-xs sm:text-sm text-neutral-700 font-semibold">{device}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-border-zen/60">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Qué parte del proceso técnico me delegarás?
                        </h3>
                        <select
                          value={formData.scopeHosting}
                          onChange={(e) => updateField("scopeHosting", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        >
                          {["Solo el diseño y desarrollo de la web", "Diseño, desarrollo y ayuda para configurar hosting/dominio", "Todo incluido (llave en mano sin preocuparme de nada)", "No estoy seguro, necesito asesoría"].map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Informative Zen box */}
                      <div className="bg-pastel-sage/20 border border-pastel-sage-dark/30 p-4 rounded-2xl flex gap-3 text-xs text-neutral-600 leading-relaxed font-serif pt-3.5">
                        <div className="text-pastel-sage-dark shrink-0 mt-0.5">
                          <Info size={16} />
                        </div>
                        <div>
                          <strong className="text-neutral-800 block font-mono uppercase tracking-widest text-[8px] mb-0.5">
                            Optimización para Google Incluida
                          </strong>
                          Todas las páginas web desarrolladas cuentan con posicionamiento básico en Google (SEO), 
                          excelente velocidad en celulares y computadoras, y diseño semántico limpio de manera estándar.
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 7: TIMELINE Y PRESUPUESTO */}
                  {currentStep === 7 && (
                    <motion.div
                      key="step7"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1.5">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Para cuándo necesitas tu página lista?
                        </h3>
                        <select
                          value={formData.cuandoNecesita}
                          onChange={(e) => updateField("cuandoNecesita", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        >
                          {getTimelines().map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          Presupuesto estimado aproximado en pesos mexicanos
                        </h3>
                        <select
                          value={formData.presupuestoAproximado}
                          onChange={(e) => updateField("presupuestoAproximado", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        >
                          {getBudgets().map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-border-zen/60">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Algún detalle o comentario adicional?
                        </h3>
                        <textarea
                          rows={4}
                          placeholder="Cualquier otra particularidad técnica o idea que tengas en mente..."
                          value={formData.notasAdicionales}
                          onChange={(e) => updateField("notasAdicionales", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base transition-all resize-none min-h-[80px]"
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 8: CONTACTO */}
                  {currentStep === 8 && (
                    <motion.div
                      key="step8"
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      className="space-y-4"
                    >
                      <div className="space-y-1">
                        <h3 className="font-serif text-lg font-bold text-neutral-800 leading-tight">
                          ¿Cuál es tu nombre completo? *
                        </h3>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Juan Pérez"
                          value={formData.contactoNombre}
                          onChange={(e) => updateField("contactoNombre", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-sm font-bold text-neutral-700">
                          Tu Correo Electrónico *
                        </h3>
                        <input
                          type="email"
                          required
                          placeholder="Ej: juan@correo.com"
                          value={formData.contactoEmail}
                          onChange={(e) => updateField("contactoEmail", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        />
                      </div>

                      <div className="space-y-1">
                        <h3 className="font-serif text-sm font-bold text-neutral-700">
                          Tu WhatsApp o Teléfono
                        </h3>
                        <input
                          type="tel"
                          placeholder="Ej: 55 1234 5678"
                          value={formData.contactoWhatsapp}
                          onChange={(e) => updateField("contactoWhatsapp", e.target.value)}
                          className="w-full bg-bg-zen border border-border-zen focus:border-pastel-sage-dark outline-none px-4 py-3.5 rounded-2xl font-serif text-base min-h-[48px]"
                        />
                      </div>

                      <div className="space-y-3 pt-2 border-t border-border-zen/60">
                        <h4 className="font-serif text-sm font-bold text-neutral-700">
                          ¿Por qué medio prefieres que hablemos sobre tu cotización?
                        </h4>
                        <div className="flex flex-col gap-2">
                          {["Email", "WhatsApp", "Indiferente"].map((opt) => (
                            <label
                              key={opt}
                              className={`flex items-center gap-3 p-3 border rounded-2xl cursor-pointer transition-all min-h-[44px] ${formData.preferenciaContacto === opt ? "border-pastel-sage-dark bg-pastel-sage/15" : "border-border-zen bg-bg-zen/20 hover:border-neutral-300"}`}
                            >
                              <input
                                type="radio"
                                name="preferenciaContacto"
                                value={opt}
                                checked={formData.preferenciaContacto === opt}
                                onChange={() => updateField("preferenciaContacto", opt)}
                                className="accent-pastel-sage-dark w-4.5 h-4.5 shrink-0"
                              />
                              <span className="font-serif text-sm text-neutral-700 font-semibold">{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
              </div>

              {/* Form Buttons */}
              <div className="flex justify-between items-center gap-3.5 px-1">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="flex-1 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest border border-border-zen hover:border-neutral-400 text-neutral-500 hover:text-foreground-zen py-3.5 rounded-full transition-all duration-300 font-bold bg-white shadow-sm min-h-[48px]"
                  >
                    <ArrowLeft size={14} />
                    Anterior
                  </button>
                ) : (
                  <Link
                    href="/"
                    className="flex-1 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest border border-border-zen hover:border-neutral-400 text-neutral-500 hover:text-foreground-zen py-3.5 rounded-full transition-all duration-300 font-bold bg-white shadow-sm min-h-[48px]"
                  >
                    <ArrowLeft size={14} />
                    Inicio
                  </Link>
                )}

                {currentStep < totalSteps ? (
                  <button
                    type="submit"
                    disabled={!isStepValid()}
                    className={`flex-1 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest py-3.5 rounded-full transition-all duration-300 font-bold shadow-sm min-h-[48px] ${isStepValid() ? "bg-neutral-800 text-white hover:bg-neutral-950 cursor-pointer" : "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-border-zen/60"}`}
                  >
                    Siguiente
                    <ArrowRight size={14} />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting || !isStepValid()}
                    className={`flex-1 flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest py-4 rounded-full transition-all duration-300 font-black shadow-sm min-h-[48px] ${!isStepValid() || isSubmitting ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-border-zen/60" : "bg-pastel-sage text-foreground-zen hover:bg-pastel-sage-dark cursor-pointer"}`}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar"}
                    <Send size={12} className="shrink-0" />
                  </button>
                )}
              </div>

            </form>
          )}
        </AnimatePresence>

      </main>

      {/* Editorial footer line */}
      <footer className="w-full bg-bg-surface-zen border-t border-border-zen mt-auto py-6 text-center text-[10px] font-mono text-neutral-400 uppercase tracking-widest">
        <span>Antonio Fernandez · Playful Harmony / Minimalismo Japonés</span>
      </footer>
    </div>
  );
}
