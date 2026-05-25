"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export default function ServiceCard({
  number,
  title,
  description,
  features,
  icon: Icon,
}: ServiceCardProps) {
  // Pastel backgrounds for decorative purposes based on index number
  const getBadgeStyle = () => {
    if (number === "01") return "bg-pastel-sage/40 text-pastel-sage-dark";
    if (number === "02") return "bg-pastel-coral/40 text-neutral-600";
    return "bg-pastel-blue/40 text-neutral-600";
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="bg-bg-surface-zen border border-border-zen rounded-3xl p-8 flex flex-col justify-between h-full relative group transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.015)] hover:shadow-[0_15px_40px_rgba(163,198,168,0.08)] hover:border-pastel-sage-dark"
    >
      <div className="flex-1">
        {/* Header containing number and icon */}
        <div className="flex items-center justify-between mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 group-hover:text-pastel-sage-dark transition-colors font-bold">
            Servicio {number}
          </span>
          <div className={`p-3 rounded-2xl transition-all duration-300 ${getBadgeStyle()}`}>
            <Icon size={22} className="shrink-0" />
          </div>
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl font-black text-foreground-zen tracking-tight mb-4 group-hover:text-neutral-800 transition-colors">
          {title}
        </h3>

        {/* Delicate divider */}
        <div className="h-[1px] bg-border-zen w-12 mb-5 group-hover:w-20 transition-all duration-300" />

        {/* Description */}
        <p className="text-foreground-zen/70 text-sm leading-relaxed mb-6 font-serif">
          {description}
        </p>

        {/* Feature badges as clean pastel list tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {features.map((feature, i) => (
            <span
              key={i}
              className="font-mono text-[10px] uppercase tracking-wider text-neutral-500 bg-neutral-50 border border-border-zen px-2.5 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
