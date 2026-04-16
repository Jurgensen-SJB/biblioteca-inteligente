/**
 * Repositorio de Libros - Implementación con Google Books API.
 * Capa de Infraestructura.
 */

import { Book, AccessType } from '../../domain/entities/Book';
import { ReaderProfile, isLectorCero } from '../../domain/entities/ReaderProfile';
import { BookRepository } from '../../application/ports/BookRepository';

const GOOGLE_BOOKS_API_URL = 'https://www.googleapis.com/books/v1/volumes';

export class GoogleBooksRepository implements BookRepository {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async searchBooks(profile: ReaderProfile, keywords: string[]): Promise<Book[]> {
    if (!this.apiKey) {
      console.warn('Advertencia: No se proporcionó GOOGLE_BOOKS_API_KEY. Usando fallback.');
      throw new Error('API Key missing');
    }

    const esLectorCero = isLectorCero(profile);
    const query = keywords.join('+');
    
    // Parámetros diferenciados según el perfil
    const maxResults = esLectorCero ? 40 : 20;
    const langRestrict = profile.language !== 'cualquiera' ? `&langRestrict=${profile.language}` : '';
    // Lector Cero prefiere los mejores valorados o más relevantes para empezar
    const orderBy = esLectorCero ? '&orderBy=relevance' : '';

    const url = `${GOOGLE_BOOKS_API_URL}?q=${encodeURIComponent(query)}${langRestrict}&maxResults=${maxResults}${orderBy}&key=${this.apiKey}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Google Books API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    if (!data.items || data.items.length === 0) {
      return [];
    }

    // Mapear la respuesta de la API a nuestra entidad Book
    return data.items.map((item: any) => this.mapToBook(item));
  }

  private mapToBook(item: any): Book {
    const vol = item.volumeInfo || {};
    const access = item.accessInfo || {};

    let accessType: AccessType = 'comercial';
    let downloadLink = '';

    // Determinar tipo de acceso y enlace de descarga
    if (access.epub && access.epub.isAvailable && access.epub.downloadLink) {
      accessType = 'libre';
      // Agregar API Key al enlace de descarga para acceso autenticado
      downloadLink = access.epub.downloadLink;
    } else if (access.pdf && access.pdf.isAvailable && access.pdf.downloadLink) {
      accessType = 'libre';
      downloadLink = access.pdf.downloadLink;
    } else if (access.viewability === 'ALL_PAGES' || access.viewability === 'PARTIAL') {
      accessType = access.viewability === 'ALL_PAGES' ? 'libre' : 'preview';
    }

    // Construir enlace de preview directo a la ficha del libro
    // Prioridad: webReaderLink > infoLink con ID > previewLink genérico
    const bookPageUrl = `https://books.google.com/books?id=${item.id}&printsec=frontcover`;
    const readerUrl = access.webReaderLink || bookPageUrl;
    const previewLink = readerUrl;

    // Extraer año de publicación (puede venir como 'YYYY-MM-DD' o 'YYYY')
    let publishedYear = 0;
    if (vol.publishedDate) {
      const yearMatch = vol.publishedDate.match(/^(\d{4})/);
      if (yearMatch) {
        publishedYear = parseInt(yearMatch[1], 10);
      }
    }

    return {
      id: item.id,
      title: vol.title || 'Sin título',
      author: vol.authors ? vol.authors.join(', ') : 'Autor desconocido',
      description: vol.description || '',
      coverUrl: vol.imageLinks ? (vol.imageLinks.thumbnail || vol.imageLinks.smallThumbnail || '').replace('http:', 'https:') : '',
      pageCount: vol.pageCount || 0,
      rating: vol.averageRating || 0,
      publishedYear,
      language: vol.language || 'es',
      readingLevel: 'medio', // Se ajustará luego en el UseCase o Scoring
      previewLink,
      downloadLink,
      accessType,
      whyPerfectReasons: [], // Solo para la lista curada
      score: 0, // Se calcula después
      categories: vol.categories || [],
    };
  }
}
