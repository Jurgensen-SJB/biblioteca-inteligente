/**
 * Caso de Uso: Generar Recomendaciones.
 * Capa de Aplicación.
 * 
 * Flujo (igual para ambos perfiles):
 * 1. Recibe ReaderProfile
 * 2. Construye palabras clave y filtros según el modo
 * 3. Busca en el repositorio (Google Books API)
 * 4. Aplica ScoringService para puntuar cada libro
 * 5. Selecciona los 3 mejores
 * 6. Si no hay suficientes resultados, usa fallback (lista curada)
 */

import { Book } from '../../domain/entities/Book';
import { ReaderProfile, isLectorCero } from '../../domain/entities/ReaderProfile';
import { calculateScore, buildSearchKeywords } from '../../domain/services/ScoringService';
import { BookRepository } from '../ports/BookRepository';

/** Número máximo de libros a devolver */
const RESULT_COUNT = 30;

/**
 * Genera las recomendaciones de libros para un perfil dado.
 */
export async function generateRecommendations(
  profile: ReaderProfile,
  primaryRepository: BookRepository,
  fallbackRepository: BookRepository
): Promise<Book[]> {
  const keywords = buildSearchKeywords(profile);
  const esLectorCero = isLectorCero(profile);

  let books: Book[] = [];

  try {
    // Buscar en repositorio principal (Google Books API)
    books = await primaryRepository.searchBooks(profile, keywords);

    // Filtros de calidad (Desafío 5 del documento)
    books = applyQualityFilters(books);
  } catch {
    // Si la API falla, continuamos con el fallback
    books = [];
  }

  // Si no hay suficientes resultados, buscar en fallback (lista curada)
  if (books.length < RESULT_COUNT) {
    try {
      const fallbackBooks = await fallbackRepository.searchBooks(profile, keywords);
      // Agregar los libros curados que no estén duplicados
      const existingIds = new Set(books.map(b => b.id));
      const newBooks = fallbackBooks.filter(b => !existingIds.has(b.id));
      books = [...books, ...newBooks];
    } catch {
      // Si también falla el fallback, trabajamos con lo que tenemos
    }
  }

  // Puntuar cada libro con el ScoringService
  const scoredBooks = books.map(book => ({
    ...book,
    score: calculateScore(book, profile),
  }));

  // Ordenar por puntuación descendente
  scoredBooks.sort((a, b) => b.score - a.score);

  // Seleccionar los mejores 3
  let topBooks = scoredBooks.slice(0, RESULT_COUNT);

  // Para Lector Cero: asignar nivel "fácil" y agregar etiqueta
  if (esLectorCero) {
    topBooks = topBooks.map(book => ({
      ...book,
      readingLevel: 'facil' as const,
    }));
  }

  return topBooks;
}

/**
 * Aplica filtros de calidad según el Desafío 5 del documento:
 * - Descartar libros sin imageLinks.thumbnail 
 * - Descartar libros con descripción menor a 50 caracteres
 */
function applyQualityFilters(books: Book[]): Book[] {
  return books.filter(book => {
    // Debe tener portada
    if (!book.coverUrl || book.coverUrl.length === 0) return false;
    // Descripción debe tener al menos 50 caracteres
    if (!book.description || book.description.length < 50) return false;
    return true;
  });
}
