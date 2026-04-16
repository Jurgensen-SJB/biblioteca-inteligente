"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book } from '../../../domain/entities/Book';
import BookCard from './BookCard';

/**
 * Pantalla 4 - Resultados.
 * Muestra un listado completo de libros con paginación.
 * Para Lector Cero incluye mensaje de ánimo y sección especial.
 */

const BOOKS_PER_PAGE = 6;

interface ResultsContainerProps {
  books: Book[];
  isLectorCero: boolean;
  onRestart: () => void;
}

export default function ResultsContainer({ books, isLectorCero, onRestart }: ResultsContainerProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(books.length / BOOKS_PER_PAGE)), [books.length]);

  const currentBooks = useMemo(() => {
    const start = (currentPage - 1) * BOOKS_PER_PAGE;
    return books.slice(start, start + BOOKS_PER_PAGE);
  }, [books, currentPage]);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    // Scroll suave al inicio de resultados
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /** Genera los números de página visibles con elipsis */
  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1];

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen px-6 py-10 max-w-5xl mx-auto"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center mb-10"
      >
        <span className="text-5xl mb-4 inline-block">🎉</span>
        <h1
          className="text-3xl md:text-4xl font-bold text-bosque"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          ¡Encontramos tus libros perfectos!
        </h1>
        <p className="mt-3 text-bosque/60">
          Basándonos en tus respuestas, estos son los libros ideales para ti
        </p>
        {books.length > 0 && (
          <p className="mt-2 text-sm text-bosque/40">
            {books.length} {books.length === 1 ? 'libro encontrado' : 'libros encontrados'}
            {totalPages > 1 && ` · Página ${currentPage} de ${totalPages}`}
          </p>
        )}
      </motion.div>

      {/* Mensaje motivador para Lector Cero */}
      {isLectorCero && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8 p-5 bg-ambar/30 rounded-2xl border border-ambar/50 text-center"
        >
          <p className="text-bosque/80 font-medium">
            💛 No hay un lector malo, solo el libro equivocado.
          </p>
          <p className="text-bosque/60 text-sm mt-1">
            Si este no es para ti, prueba el siguiente. ¡Tu libro perfecto está aquí!
          </p>
        </motion.div>
      )}

      {/* Tarjetas de libros */}
      {books.length > 0 ? (
        <div className="flex flex-col gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {currentBooks.map((book, idx) => (
                <BookCard
                  key={book.id}
                  book={book}
                  isLectorCero={isLectorCero}
                  index={idx}
                />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Paginación */}
          {totalPages > 1 && (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-2 mt-4"
              aria-label="Paginación de resultados"
            >
              {/* Botón Anterior */}
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all
                  ${currentPage === 1
                    ? 'text-bosque/25 cursor-not-allowed'
                    : 'text-bosque/70 hover:bg-bosque/10 hover:text-bosque active:scale-95'
                  }`}
                aria-label="Página anterior"
                id="btn-pagina-anterior"
              >
                <span>←</span>
                <span className="hidden sm:inline">Anterior</span>
              </button>

              {/* Números de página */}
              <div className="flex items-center gap-1">
                {getPageNumbers().map((page, idx) =>
                  page === '...' ? (
                    <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-bosque/30 text-sm">
                      ···
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => goToPage(page)}
                      className={`w-9 h-9 flex items-center justify-center rounded-xl text-sm font-semibold transition-all
                        ${currentPage === page
                          ? 'bg-bosque text-white shadow-md scale-105'
                          : 'text-bosque/60 hover:bg-bosque/10 hover:text-bosque active:scale-95'
                        }`}
                      aria-label={`Ir a página ${page}`}
                      aria-current={currentPage === page ? 'page' : undefined}
                    >
                      {page}
                    </button>
                  )
                )}
              </div>

              {/* Botón Siguiente */}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-all
                  ${currentPage === totalPages
                    ? 'text-bosque/25 cursor-not-allowed'
                    : 'text-bosque/70 hover:bg-bosque/10 hover:text-bosque active:scale-95'
                  }`}
                aria-label="Página siguiente"
                id="btn-pagina-siguiente"
              >
                <span className="hidden sm:inline">Siguiente</span>
                <span>→</span>
              </button>
            </motion.nav>
          )}
        </div>
      ) : (
        /* Sin resultados */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <span className="text-6xl mb-4 inline-block">🔍</span>
          <p className="text-xl text-bosque/70 font-medium">
            Ampliando la búsqueda para ti...
          </p>
          <p className="text-bosque/50 mt-2">
            No encontramos resultados exactos. Intenta ajustar tus preferencias.
          </p>
        </motion.div>
      )}

      {/* Botones de acción */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
      >

        <button
          onClick={onRestart}
          className="px-6 py-3 bg-bosque/10 text-bosque rounded-xl font-semibold
                     hover:bg-bosque/20 transition-colors
                     focus:outline-none focus:ring-2 focus:ring-salvia/50"
          id="btn-reiniciar"
        >
          🔄 Volver a empezar
        </button>
      </motion.div>
    </motion.section>
  );
}
