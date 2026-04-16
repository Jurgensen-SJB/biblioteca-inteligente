/**
 * Puerto del Repositorio de Libros - Interfaz que deben implementar los repositorios.
 * Capa de Aplicación: Define el contrato, no la implementación.
 */

import { Book } from '../../domain/entities/Book';
import { ReaderProfile } from '../../domain/entities/ReaderProfile';

export interface BookRepository {
  /**
   * Busca libros según el perfil del lector.
   * @param profile - Perfil del lector construido desde el quiz
   * @param keywords - Palabras clave de búsqueda
   * @returns Lista de libros encontrados
   */
  searchBooks(profile: ReaderProfile, keywords: string[]): Promise<Book[]>;
}
