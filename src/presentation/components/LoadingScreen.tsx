"use client";

import { motion } from 'framer-motion';

/**
 * Pantalla 3 - Cargando.
 * Animación de libro abriéndose.
 * Texto: "Buscando tus libros perfectos..."
 */

export default function LoadingScreen() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center px-6"
    >
      {/* Animación de libro */}
      <motion.div
        className="relative mb-8"
        animate={{ rotateY: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="text-8xl">📖</div>
      </motion.div>

      {/* Puntos de carga animados */}
      <div className="flex gap-2 mb-6">
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
            className="w-3 h-3 rounded-full bg-bosque"
          />
        ))}
      </div>

      {/* Texto principal */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold text-bosque text-center"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Buscando tus libros perfectos…
      </motion.h2>

      {/* Subtexto */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-bosque/50 text-center"
      >
        Explorando entre miles de opciones para ti
      </motion.p>

      {/* Mensajes rotativos */}
      <motion.div
        className="mt-8 text-sm text-salvia font-medium"
        animate={{ opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        ✨ Analizando tus preferencias...
      </motion.div>
    </motion.section>
  );
}
