"use client";

import { motion } from 'framer-motion';

/**
 * Pantalla 5 - Invitación a Continuar.
 * "¿No te convencieron? Prueba otro quiz" + "Guarda tus libros favoritos"
 */

interface ContinueScreenProps {
  isLectorCero: boolean;
  onRestart: () => void;
}

export default function ContinueScreen({ isLectorCero, onRestart }: ContinueScreenProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
    >
      {/* Icono */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', delay: 0.2 }}
        className="text-7xl mb-6"
      >
        📚
      </motion.div>

      {/* Título */}
      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-3xl font-bold text-bosque text-center mb-4"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        ¿Quieres descubrir más?
      </motion.h2>

      {/* Texto para Lector Cero */}
      {isLectorCero && (
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-bosque/60 max-w-md mb-8"
        >
          Cada libro es una puerta a un nuevo mundo. No importa si es tu
          primer libro o tu centésimo — siempre hay una historia esperándote. 🌟
        </motion.p>
      )}

      {!isLectorCero && (
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-bosque/60 max-w-md mb-8"
        >
          Tus gustos son únicos. Vuelve a intentar con diferentes respuestas 
          y descubre libros que no sabías que necesitabas.
        </motion.p>
      )}

      {/* Acciones */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <button
          onClick={onRestart}
          className="w-full px-8 py-4 bg-bosque text-white text-lg font-semibold rounded-2xl
                     shadow-lg shadow-bosque/20 hover:bg-bosque/90 transition-colors
                     focus:outline-none focus:ring-4 focus:ring-salvia/50"
          id="btn-nuevo-quiz"
        >
          🔍 Nuevo descubrimiento
        </button>

        <p className="text-center text-sm text-bosque/40 mt-2">
          Tus libros favoritos se guardan automáticamente en tu navegador ♥
        </p>
      </motion.div>

      {/* Filosofía del proyecto */}
      <motion.blockquote
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center text-sm italic text-bosque/40 max-w-md border-l-2 border-dorado/30 pl-4"
      >
        &quot;No existe un lector malo. Solo existe el libro equivocado en el momento equivocado.&quot;
      </motion.blockquote>
    </motion.section>
  );
}
