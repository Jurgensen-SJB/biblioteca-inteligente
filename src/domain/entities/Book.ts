/**
 * Entidad Libro - Representa un libro recomendado por el sistema.
 * Capa de Dominio: No depende de ninguna otra capa.
 */

/** Tipo de acceso disponible para el libro */
export type AccessType = 'libre' | 'preview' | 'comercial';

/** Nivel de lectura del libro */
export type ReadingLevel = 'facil' | 'medio' | 'avanzado';

/** Interfaz principal de la entidad Libro */
export interface Book {
  /** Identificador único del libro */
  id: string;
  /** Título del libro */
  title: string;
  /** Autor(es) del libro */
  author: string;
  /** Descripción o sinopsis del libro */
  description: string;
  /** URL de la imagen de portada */
  coverUrl: string;
  /** Número de páginas */
  pageCount: number;
  /** Valoración promedio (0-5) */
  rating: number;
  /** Año de publicación */
  publishedYear: number;
  /** Idioma del libro (es, en, etc.) */
  language: string;
  /** Nivel de lectura estimado */
  readingLevel: ReadingLevel;
  /** Enlace de vista previa */
  previewLink: string;
  /** Enlace de descarga (si disponible) */
  downloadLink: string;
  /** Tipo de acceso disponible */
  accessType: AccessType;
  /** Razones de por qué es perfecto para empezar (solo Lector Cero) */
  whyPerfectReasons: string[];
  /** Puntuación calculada por el algoritmo */
  score: number;
  /** Categorías/géneros del libro */
  categories: string[];
}

/**
 * Crea una entidad Book con valores por defecto.
 */
export function createBook(partial: Partial<Book>): Book {
  return {
    id: partial.id || '',
    title: partial.title || 'Sin título',
    author: partial.author || 'Autor desconocido',
    description: partial.description || '',
    coverUrl: partial.coverUrl || '',
    pageCount: partial.pageCount || 0,
    rating: partial.rating || 0,
    publishedYear: partial.publishedYear || 2000,
    language: partial.language || 'es',
    readingLevel: partial.readingLevel || 'facil',
    previewLink: partial.previewLink || '',
    downloadLink: partial.downloadLink || '',
    accessType: partial.accessType || 'comercial',
    whyPerfectReasons: partial.whyPerfectReasons || [],
    score: partial.score || 0,
    categories: partial.categories || [],
  };
}
