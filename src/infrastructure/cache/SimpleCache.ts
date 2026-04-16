/**
 * Caché Simple en Servidor (En memoria) para la API.
 * Capa de Infraestructura.
 * 
 * Útil para evitar llamar a la Google Books API excesivamente
 * y prevenir agotar las 10,000 peticiones diarias.
 */

import { Book } from '../../domain/entities/Book';

interface CacheEntry {
  books: Book[];
  timestamp: number;
}

export class SimpleCache {
  private cache: Map<string, CacheEntry>;
  private ttlMs: number;

  constructor(ttlMinutes: number = 60 * 24) { // 24 horas por defecto
    this.cache = new Map();
    this.ttlMs = ttlMinutes * 60 * 1000;
  }

  /** Genera una clave hash simple basada en el perfil y las palabras clave */
  private generateKey(profileKeys: string, keywords: string[]): string {
    return `${profileKeys}|${keywords.sort().join(',')}`;
  }

  get(profileKeys: string, keywords: string[]): Book[] | null {
    const key = this.generateKey(profileKeys, keywords);
    const entry = this.cache.get(key);

    if (!entry) return null;

    // Si expiró, eliminar y retornar nulo
    if (Date.now() - entry.timestamp > this.ttlMs) {
      this.cache.delete(key);
      return null;
    }

    return entry.books;
  }

  set(profileKeys: string, keywords: string[], books: Book[]): void {
    const key = this.generateKey(profileKeys, keywords);
    this.cache.set(key, {
      books,
      timestamp: Date.now(),
    });
  }
}

// Instancia singleton para ser usada por la API Route en el servidor
export const serverCache = new SimpleCache();
