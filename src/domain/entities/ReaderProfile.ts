/**
 * Entidad Perfil del Lector - Representa el perfil construido a partir del quiz.
 * Capa de Dominio.
 */

/** Tipo de lector detectado por el sistema */
export type ReaderType = 'cero' | 'experiencia';

/** Interfaz del Perfil del Lector */
export interface ReaderProfile {
  /** Tipo de lector: cero (nunca ha leído) o experiencia */
  readerType: ReaderType;
  /** Nivel de lectura auto-reportado (Pregunta 0) */
  readingFrequency: string;
  /** Hobbies/actividades (Pregunta 1) */
  hobbies: string;
  /** Emoción deseada al leer (Pregunta 2) */
  preferredEmotion: string;
  /** Tiempo disponible para leer (Pregunta 3) */
  readingTime: string;
  /** Contenido reciente que disfrutó (Pregunta 4) */
  recentContent: string;
  /** Idioma preferido (Pregunta 5) */
  language: string;
  /** Géneros literarios preferidos - Solo Ruta A (Pregunta 6) */
  genres: string[];
  /** Preferencia de época - Solo Ruta A (Pregunta 7) */
  era: string;
  /** Propósito de lectura (Pregunta 8) */
  purpose: string;
}

/**
 * Crea un ReaderProfile con valores por defecto.
 */
export function createReaderProfile(partial: Partial<ReaderProfile>): ReaderProfile {
  return {
    readerType: partial.readerType || 'experiencia',
    readingFrequency: partial.readingFrequency || '',
    hobbies: partial.hobbies || '',
    preferredEmotion: partial.preferredEmotion || '',
    readingTime: partial.readingTime || '',
    recentContent: partial.recentContent || '',
    language: partial.language || 'es',
    genres: partial.genres || [],
    era: partial.era || '',
    purpose: partial.purpose || '',
  };
}

/**
 * Determina si un perfil es de tipo Lector Cero.
 */
export function isLectorCero(profile: ReaderProfile): boolean {
  return profile.readerType === 'cero';
}
