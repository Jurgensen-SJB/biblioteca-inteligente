"use client";

import { motion } from 'framer-motion';
import { Book, ReadingLevel } from '../../../domain/entities/Book';
import WhyPerfectSection from './WhyPerfectSection';

/**
 * Tarjeta de Libro individual.
 * Incluye: portada, título, autor, descripción, pastilla de nivel, 
 * botón de lectura/descarga, y sección especial para Lector Cero.
 */

interface BookCardProps {
  book: Book;
  isLectorCero: boolean;
  index: number;
}

const levelLabels: Record<ReadingLevel, { text: string; color: string }> = {
  facil: { text: 'Fácil de leer', color: 'bg-green-100 text-green-700' },
  medio: { text: 'Lectura media', color: 'bg-yellow-100 text-yellow-700' },
  avanzado: { text: 'Para lectores avanzados', color: 'bg-red-100 text-red-700' },
};

export default function BookCard({ book, isLectorCero, index }: BookCardProps) {
  /**
   * Construye los enlaces de acción para el libro.
   * Como todos los libros curados son de Gutenberg, siempre son gratuitos.
   */
  const getActionButtons = () => {
    const isGutenberg = book.id.startsWith('pg-');
    
    if (isGutenberg || book.accessType === 'libre') {
      return {
        primary: { text: 'Descargar gratis', icon: '📥', href: book.downloadLink || book.previewLink },
        secondary: book.previewLink ? { text: 'Leer online', icon: '📖', href: book.previewLink } : null,
      };
    }
    
    if (book.accessType === 'preview') {
      return {
        primary: { text: 'Leer muestra gratis', icon: '👁️', href: book.previewLink },
        secondary: null,
      };
    }
    
    return {
      primary: { text: 'Ver libro', icon: '🔗', href: book.previewLink || `https://books.google.com/books?id=${book.id}` },
      secondary: null,
    };
  };

  const actions = getActionButtons();
  const level = levelLabels[book.readingLevel] || levelLabels.medio;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className={`
        relative rounded-2xl overflow-hidden shadow-lg border
        ${isLectorCero ? 'border-ambar bg-ambar/5' : 'border-bosque/10 bg-white'}
        hover:shadow-xl transition-shadow duration-300
      `}
    >
      {/* Etiqueta "Perfecto para empezar" - Solo Lector Cero */}
      {isLectorCero && (
        <div className="bg-ambar px-4 py-1.5 text-center">
          <span className="text-sm font-semibold text-bosque/80">
            🌟 Perfecto para empezar
          </span>
        </div>
      )}

      <div className="flex flex-col p-5 gap-4">
        {/* Portada */}
        <div className="flex-shrink-0 mx-auto">
          <div className="w-32 h-48 rounded-lg overflow-hidden shadow-md bg-bosque/5">
            {book.coverUrl ? (
              <img
                src={book.coverUrl}
                alt={`Portada de ${book.title}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl bg-bosque/10">
                📖
              </div>
            )}
          </div>
        </div>

        {/* Info del libro */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Nivel de lectura */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${level.color}`}>
              {level.text}
            </span>
            {book.rating > 0 && (
              <span className="text-xs text-bosque/50 flex items-center gap-1">
                ⭐ {book.rating.toFixed(1)}
              </span>
            )}
            {book.pageCount > 0 && (
              <span className="text-xs text-bosque/40">
                {book.pageCount} págs.
              </span>
            )}
          </div>

          {/* Título */}
          <h3
            className="text-lg font-bold text-bosque leading-snug mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {book.title}
          </h3>

          {/* Autor */}
          <p className="text-sm text-bosque/60 mb-2">{book.author}</p>

          {/* Descripción truncada */}
          <p className="text-sm text-bosque/50 line-clamp-3 mb-4 leading-relaxed">
            {book.description}
          </p>

          {/* Acciones */}
          <div className="flex items-center gap-2 mt-auto flex-wrap">
            {/* Botón principal: Descargar gratis */}
            <a
              href={actions.primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 bg-bosque text-white rounded-xl text-sm font-semibold
                         hover:bg-bosque/90 transition-colors shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-salvia/50"
            >
              <span>{actions.primary.icon}</span>
              <span>{actions.primary.text}</span>
            </a>

            {/* Botón secundario: Leer online */}
            {actions.secondary && (
              <a
                href={actions.secondary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 border-2 border-bosque/20 text-bosque rounded-xl text-sm font-semibold
                           hover:border-bosque/40 hover:bg-bosque/5 transition-colors
                           focus:outline-none focus:ring-2 focus:ring-salvia/50"
              >
                <span>{actions.secondary.icon}</span>
                <span>{actions.secondary.text}</span>
              </a>
            )}

            {/* Botón Leer más libros - Redirige al catálogo de Gutenberg */}
            <a
              href="https://www.gutenberg.org/ebooks/search/?query=l.es&submit_search=Go%21&sort_order=downloads"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 border-2 border-emerald-600/30 text-emerald-700 rounded-xl text-sm font-semibold
                         hover:border-emerald-600/50 hover:bg-emerald-50 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-emerald-300"
            >
              <span>📚</span>
              <span>Leer más libros</span>
            </a>
          </div>

          {/* Sección especial Lector Cero */}
          {isLectorCero && <WhyPerfectSection book={book} />}
        </div>
      </div>
    </motion.div>
  );
}
