"use client";

import { motion } from 'framer-motion';
import { QuizOption } from '../../../domain/entities/QuizQuestion';

/**
 * Botón de opción individual con icono y texto.
 * El documento pide que cada opción del quiz vaya acompañada de un icono visual.
 */

interface OptionButtonProps {
  option: QuizOption;
  isSelected: boolean;
  onClick: () => void;
  index: number;
}

export default function OptionButton({ option, isSelected, onClick, index }: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(45,106,79,0.12)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 px-5 py-4 rounded-xl border-2 text-left
        transition-all duration-200 min-h-[56px]
        focus:outline-none focus:ring-2 focus:ring-salvia/50
        ${isSelected
          ? 'border-bosque bg-bosque/5 text-bosque shadow-md'
          : 'border-bosque/15 bg-white hover:border-salvia/40 text-bosque/80'
        }
      `}
      aria-label={option.label}
    >
      {/* Icono */}
      <span className="text-2xl flex-shrink-0" role="img" aria-hidden="true">
        {option.icon}
      </span>

      {/* Texto */}
      <span className="font-medium text-base leading-snug">
        {option.label}
      </span>

      {/* Indicador de selección */}
      {isSelected && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto text-bosque flex-shrink-0"
        >
          ✓
        </motion.span>
      )}
    </motion.button>
  );
}
