"use client";

import { motion } from 'framer-motion';

/**
 * Barra de Progreso Amigable.
 * Muestra "3 de 5 preguntas" en vez de un número abstracto.
 */

interface ProgressBarProps {
  current: number;
  total: number;
  percentage: number;
}

export default function ProgressBar({ current, total, percentage }: ProgressBarProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-8">
      {/* Texto de progreso */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-bosque/70">
          {current} de {total} preguntas
        </span>
        <span className="text-sm text-bosque/40">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Barra visual */}
      <div className="w-full h-2.5 bg-bosque/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(percentage, 100)}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-bosque to-salvia rounded-full"
        />
      </div>
    </div>
  );
}
