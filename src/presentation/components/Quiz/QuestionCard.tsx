"use client";

import { motion } from 'framer-motion';
import { QuizQuestion } from '../../../domain/entities/QuizQuestion';
import OptionButton from './OptionButton';

/**
 * Tarjeta de Pregunta - Renderiza la pregunta actual con animación.
 */

interface QuestionCardProps {
  question: QuizQuestion;
  selectedValues: string | string[] | undefined;
  onAnswer: (questionId: string, value: string | string[]) => void;
}

export default function QuestionCard({ question, selectedValues, onAnswer }: QuestionCardProps) {
  const handleOptionClick = (value: string) => {
    if (question.multiSelect) {
      // Multiselección: toggle del valor
      const current = Array.isArray(selectedValues) ? selectedValues : [];
      if (current.includes(value)) {
        onAnswer(question.id, current.filter(v => v !== value));
      } else {
        onAnswer(question.id, [...current, value]);
      }
    } else {
      // Selección simple: avanzar automáticamente
      onAnswer(question.id, value);
    }
  };

  const isSelected = (value: string): boolean => {
    if (Array.isArray(selectedValues)) {
      return selectedValues.includes(value);
    }
    return selectedValues === value;
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Título de la pregunta */}
      <h2
        className="text-2xl md:text-3xl font-bold text-bosque mb-2 leading-tight"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {question.question}
      </h2>

      {/* Micro-copy motivador */}
      <p className="text-sm text-bosque/50 mb-6">
        {question.multiSelect
          ? 'Puedes seleccionar varias opciones'
          : 'Elige la que mejor te represente'}
      </p>

      {/* Grid de opciones */}
      <div className="flex flex-col gap-3">
        {question.options.map((opt, idx) => (
          <OptionButton
            key={opt.value}
            option={opt}
            isSelected={isSelected(opt.value)}
            onClick={() => handleOptionClick(opt.value)}
            index={idx}
          />
        ))}
      </div>

      {/* Botón "Continuar" para multi-select */}
      {question.multiSelect && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => {
            if (Array.isArray(selectedValues) && selectedValues.length > 0) {
              onAnswer(question.id, selectedValues);
            }
          }}
          disabled={!Array.isArray(selectedValues) || selectedValues.length === 0}
          className="mt-6 w-full py-3 bg-bosque text-white rounded-xl font-semibold
                     disabled:opacity-40 disabled:cursor-not-allowed
                     hover:bg-bosque/90 transition-colors
                     focus:outline-none focus:ring-4 focus:ring-salvia/50"
        >
          Continuar →
        </motion.button>
      )}
    </motion.div>
  );
}
