/**
 * Caso de Uso: Detectar Perfil del Lector.
 * Capa de Aplicación.
 * 
 * Lee la respuesta de Pregunta 0 y construye el ReaderProfile completo.
 * Si la respuesta es "Nunca he leído un libro completo" → activa Modo Lector Cero.
 */

import { ReaderProfile, createReaderProfile, ReaderType } from '../../domain/entities/ReaderProfile';

/** Estructura de respuestas del quiz */
export interface QuizAnswers {
  q0: string; // Frecuencia de lectura
  q1: string; // Hobbies
  q2: string; // Emoción deseada
  q3: string; // Tiempo disponible
  q4: string; // Contenido reciente
  q5: string; // Idioma
  q6?: string[]; // Géneros (solo Ruta A)
  q7?: string; // Época (solo Ruta A)
  q8: string; // Propósito
}

/**
 * Ejecuta la detección del perfil del lector a partir de las respuestas del quiz.
 */
export function detectReaderProfile(answers: QuizAnswers): ReaderProfile {
  // Detectar tipo de lector desde Pregunta 0
  const readerType: ReaderType = answers.q0 === 'nunca' ? 'cero' : 'experiencia';

  return createReaderProfile({
    readerType,
    readingFrequency: answers.q0,
    hobbies: answers.q1,
    preferredEmotion: answers.q2,
    readingTime: answers.q3,
    recentContent: answers.q4,
    language: answers.q5,
    genres: answers.q6 || [],
    era: answers.q7 || (readerType === 'cero' ? 'recientes' : 'igual'),
    purpose: answers.q8,
  });
}
