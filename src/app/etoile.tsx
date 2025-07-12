"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SparklesCore } from "../app/ui/sparkle"; // Ajustez le chemin selon votre structure
import Image from "next/image";

// Composant pour utiliser SparklesCore
export default function SparklesDemo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className=" bg-transparent flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.h1 
          className="text-4xl md:text-7xl lg:text-9xl font-bold text-center text-white relative z-20 mb-8"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
            textShadow: isHovered 
              ? "0 0 20px rgba(99, 102, 241, 0.8), 0 0 40px rgba(99, 102, 241, 0.4)" 
              : "0 0 10px rgba(255, 255, 255, 0.3)"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative inline-block">
                <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6 mx-auto border-2 border-cyan-400/30 shadow-lg shadow-cyan-400/20 overflow-hidden bg-slate-900/50">
                  <Image
                      src="/images/logojapanforge.png"
                      alt="Logo Forge Je'daii"
                      width={120}
                      height={120}
                      className="w-16 h-auto xs:w-18 xs:h-auto sm:w-20 sm:h-auto md:w-24 md:h-auto lg:w-28 lg:h-auto object-contain"
                    />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                <div className="absolute top-1 -right-5 w-4 h-4 bg-orange-500 rounded-full animate-pulse delay-300 shadow-lg shadow-purple-400/50"></div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2 tracking-wide">
                Forge <span className="text-cyan-400">Je&apos;daii</span>
              </h1>
              <div className="h-0.5 w-20 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mx-auto"></div>
        </motion.h1>
        
        <div className="w-full max-w-4xl h-40 relative">
          {/* Gradient lines */}
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm opacity-80" />
          <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm opacity-80" />
          <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

          {/* Sparkles */}
          <SparklesCore
            id="main-sparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1.5}
            particleDensity={80}
            className="w-full h-full"
            particleColor="#FFFFFF"
            speed={4}
          />

          {/* Radial gradient mask */}
          <div 
            className="absolute inset-0 w-full h-full bg-black pointer-events-none"
            style={{
              maskImage: "radial-gradient(350px 200px at top, transparent 20%, white)",
              WebkitMaskImage: "radial-gradient(350px 200px at top, transparent 20%, white)"
            }}
          />
        </div>

        {/* Additional sparkle effects on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SparklesCore
              id="hover-sparkles"
              background="transparent"
              minSize={1}
              maxSize={3}
              particleDensity={50}
              className="w-full h-full"
              particleColor="#60A5FA"
              speed={6}
            />
          </motion.div>
        )}
      </motion.div>

      {/* Interactive hint */}
      <motion.p 
        className="text-gray-400 text-sm mt-8 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {/* Hover over the title for more sparkles ✨ */}
      </motion.p>
    </div>
  );
}

// Autres exemples d'utilisation
export function SimpleSparklesBackground() {
  return (
    <div className="h-screen w-full relative">
      <SparklesCore
        id="background-sparkles"
        background="#0f0f23"
        minSize={0.3}
        maxSize={0.8}
        particleDensity={50}
        className="w-full h-full"
        particleColor="#3b82f6"
        speed={2}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <h1 className="text-6xl font-bold text-white z-10">
          coucou
        </h1>
      </div>
    </div>
  );
}

export function SparklesCard() {
  return (
    <div className="relative w-80 h-48 bg-gray-900 rounded-lg overflow-hidden">
      <SparklesCore
        id="card-sparkles"
        background="transparent"
        minSize={0.5}
        maxSize={1.2}
        particleDensity={30}
        className="w-full h-full"
        particleColor="#fbbf24"
        speed={3}
      />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-xl font-semibold text-white">
          Carte avec Sparkles
        </h3>
      </div>
    </div>
  );
}