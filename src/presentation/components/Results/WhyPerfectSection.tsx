"use client";

import { motion } from 'framer-motion';
import { Book } from '../../../domain/entities/Book';

/**
 * Sección "¿Por qué este libro es perfecto para empezar?"
 * Solo visible en modo Lector Cero.
 * Muestra 2-3 razones cortas y amigables.
 */

interface WhyPerfectSectionProps {
  book: Book;
}

export default function WhyPerfectSection({ book }: WhyPerfectSectionProps) {
  if (!book.whyPerfectReasons || book.whyPerfectReasons.length === 0) {
    // Generar razones por defecto si no existen
    const defaultReasons = generateDefaultReasons(book);
    book = { ...book, whyPerfectReasons: defaultReasons };
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mt-3 pt-3 border-t border-ambar/40"
    >
      <p className="text-sm font-semibold text-bosque/80 mb-2 flex items-center gap-1">
        <span>💡</span> ¿Por qué este libro es perfecto para empezar?
      </p>
      <ul className="space-y-1.5">
        {book.whyPerfectReasons.slice(0, 3).map((reason, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            className="text-sm text-bosque/60 flex items-start gap-2"
          >
            <span className="text-salvia mt-0.5">✓</span>
            <span>{reason}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

/**
 * Genera razones automáticas basadas en los metadatos del libro.
 */
function generateDefaultReasons(book: Book): string[] {
  const reasons: string[] = [];

  if (book.pageCount > 0 && book.pageCount < 200) {
    reasons.push('Es un libro corto, ideal para empezar');
  } else if (book.pageCount >= 200 && book.pageCount < 300) {
    reasons.push('Tiene una extensión accesible');
  }

  if (book.rating >= 4.5) {
    reasons.push('Tiene excelentes valoraciones de otros lectores');
  } else if (book.rating >= 4) {
    reasons.push('Muy bien valorado por la comunidad lectora');
  }

  if (book.accessType === 'libre') {
    reasons.push('Puedes leerlo gratis completo');
  } else if (book.accessType === 'preview') {
    reasons.push('Tiene una muestra gratuita para que lo pruebes');
  }

  if (reasons.length < 2) {
    reasons.push('Historia que engancha desde la primera página');
  }
  if (reasons.length < 3) {
    reasons.push('No necesitas saber nada previo para disfrutarlo');
  }

  return reasons;
}
