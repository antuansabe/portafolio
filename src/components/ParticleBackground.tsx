"use client";

import React from "react";

export default function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-80">
      {/* Sage Green Blob */}
      <div className="absolute w-[45vw] h-[45vw] -top-[10%] -left-[10%] rounded-full bg-pastel-sage/30 blur-[120px] animate-float-slow" />
      {/* Coral Blob */}
      <div className="absolute w-[50vw] h-[50vw] -bottom-[20%] -right-[10%] rounded-full bg-pastel-coral/20 blur-[130px] animate-float-medium" />
      {/* Slate Blue Blob */}
      <div className="absolute w-[35vw] h-[35vw] top-[40%] left-[60%] rounded-full bg-pastel-blue/25 blur-[100px] animate-float-slow" style={{ animationDelay: "2s" }} />
      {/* Cream Blob */}
      <div className="absolute w-[40vw] h-[40vw] top-[15%] left-[20%] rounded-full bg-pastel-cream/35 blur-[110px] animate-float-medium" style={{ animationDelay: "4s" }} />
    </div>
  );
}
