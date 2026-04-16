"use client";

import { motion } from 'framer-motion';

/**
 * Pantalla 1 - Bienvenida.
 * Tagline: "Tu próxima historia favorita te espera"
 * Botón: "Comenzar" (sin mencionar "quiz")
 */

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden"
    >
      {/* Formas decorativas de fondo */}
      <div className="absolute top-[-80px] right-[-80px] w-64 h-64 rounded-full bg-salvia/20 blur-3xl" />
      <div className="absolute bottom-[-60px] left-[-60px] w-48 h-48 rounded-full bg-dorado/15 blur-3xl" />
      <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-bosque/10 blur-2xl" />

      {/* Icono de libro */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: 'spring' }}
        className="text-7xl mb-8"
      >
        📚
      </motion.div>

      {/* Título */}
      <motion.h1
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl md:text-5xl lg:text-6xl font-bold text-bosque text-center leading-tight max-w-3xl"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Tu próxima historia favorita te espera
      </motion.h1>

      {/* Subtítulo */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mt-6 text-lg md:text-xl text-bosque/70 text-center max-w-xl leading-relaxed"
      >
        Responde unas breves preguntas y descubre los libros perfectos para ti, 
        adaptados a tus gustos y necesidades.
      </motion.p>

      {/* Badge "Sin registro • 100% gratis" */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-4 flex gap-3 items-center text-sm text-bosque/50"
      >
        <span className="flex items-center gap-1">✨ Sin registro</span>
        <span>•</span>
        <span className="flex items-center gap-1">🆓 100% gratis</span>
        <span>•</span>
        <span className="flex items-center gap-1">⏱️ 2 minutos</span>
      </motion.div>

      {/* Botón principal */}
      <motion.button
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: '0 8px 30px rgba(45,106,79,0.3)' }}
        whileTap={{ scale: 0.97 }}
        onClick={onStart}
        className="mt-10 px-12 py-4 bg-bosque text-white text-lg font-semibold rounded-2xl
                   shadow-lg shadow-bosque/20 hover:bg-bosque/90 transition-colors
                   focus:outline-none focus:ring-4 focus:ring-salvia/50"
        id="btn-comenzar"
      >
        Comenzar
      </motion.button>

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 text-bosque/30 text-sm flex flex-col items-center gap-1"
      >
        <span>Para todos los niveles de lectura</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.span>
      </motion.div>
    </motion.section>
  );
}
