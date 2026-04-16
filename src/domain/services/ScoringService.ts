/**
 * Servicio de Puntuación - Implementa la tabla de scoring del Documento Técnico v2.0.
 * Capa de Dominio.
 * 
 * Tabla de puntuación diferenciada por perfil:
 * ┌──────────────────────────────────┬──────────────────┬──────────────────────────┐
 * │ Criterio                         │ Ruta A (Experto) │ Ruta B (Lector Cero)     │
 * ├──────────────────────────────────┼──────────────────┼──────────────────────────┤
 * │ Coincide género/emoción          │ +5               │ +5                       │
 * │ Idioma preferido                 │ +3               │ +5 (prioridad alta)      │
 * │ Longitud en rango                │ +2               │ +4 (si < 250 páginas)    │
 * │ Época correcta                   │ +2               │ N/A (siempre post-2000)  │
 * │ Tiene portada                    │ +1               │ +1                       │
 * │ Tiene descarga/preview           │ +2               │ +2                       │
 * │ Valoración 4+                    │ +1               │ +3 (muy importante)      │
 * │ Publicado post-2000              │ N/A              │ +2 extra                 │
 * │ Descripción amigable (<300 pal.) │ N/A              │ +1                       │
 * └──────────────────────────────────┴──────────────────┴──────────────────────────┘
 */

import { Book } from '../entities/Book';
import { ReaderProfile, isLectorCero } from '../entities/ReaderProfile';

/** Mapeo de hobbies a géneros/categorías para inferencia */
const HOBBY_TO_GENRE: Record<string, string[]> = {
  'series': ['ficcion', 'thriller', 'misterio', 'drama'],
  'musica': ['poesia', 'biografia', 'arte'],
  'videojuegos': ['fantasia', 'ciencia-ficcion', 'aventura'],
  'aventuras': ['aventura', 'viajes', 'no-ficcion'],
  'reflexionar': ['filosofia', 'psicologia', 'autoayuda'],
  'documentales': ['historia', 'ciencia', 'no-ficcion'],
};

/** Mapeo de emociones a géneros para inferencia */
const EMOTION_TO_GENRE: Record<string, string[]> = {
  'emocion-suspenso': ['thriller', 'misterio', 'suspenso'],
  'reirme': ['humor', 'comedia', 'satirico'],
  'aprender': ['no-ficcion', 'ciencia', 'historia', 'divulgacion'],
  'escapar': ['fantasia', 'ciencia-ficcion', 'aventura'],
  'reflexionar': ['filosofia', 'psicologia', 'literatura'],
  'cualquiera': ['ficcion', 'aventura', 'fantasia'],
};

/** Mapeo de contenido reciente a géneros */
const CONTENT_TO_GENRE: Record<string, string[]> = {
  'pelicula-serie': ['ficcion', 'thriller', 'drama'],
  'podcast-historia': ['no-ficcion', 'historia', 'biografia'],
  'documental': ['ciencia', 'historia', 'no-ficcion'],
  'videojuego': ['fantasia', 'ciencia-ficcion', 'aventura'],
  'nada-especial': ['ficcion', 'aventura'],
};

/**
 * Calcula la puntuación de un libro basado en el perfil del lector.
 * Implementa la tabla exacta del documento técnico v2.0.
 */
export function calculateScore(book: Book, profile: ReaderProfile): number {
  let score = 0;
  const esLectorCero = isLectorCero(profile);

  // 1. Coincide con género/emoción (+5 para ambos perfiles)
  const genresInferidos = inferirGeneros(profile);
  const bookCategories = book.categories.map(c => c.toLowerCase());
  const coincideGenero = genresInferidos.some(g => 
    bookCategories.some(bc => bc.includes(g) || g.includes(bc))
  );
  if (coincideGenero) {
    score += 5;
  }

  // 2. Disponible en idioma preferido
  if (profile.language === 'cualquiera' || book.language === profile.language) {
    score += esLectorCero ? 5 : 3; // Prioridad alta para Lector Cero
  }

  // 3. Longitud dentro del rango
  if (esLectorCero) {
    if (book.pageCount > 0 && book.pageCount < 250) {
      score += 4; // +4 si < 250 páginas para Lector Cero
    }
  } else {
    if (matchesReadingTime(book.pageCount, profile.readingTime)) {
      score += 2;
    }
  }

  // 4. Época de publicación correcta
  if (!esLectorCero) {
    if (matchesEra(book.publishedYear, profile.era)) {
      score += 2;
    }
  }

  // 5. Tiene portada de imagen (+1 para ambos)
  if (book.coverUrl && book.coverUrl.length > 0) {
    score += 1;
  }

  // 6. Tiene descarga/preview (+2 para ambos)
  if (book.accessType === 'libre' || book.accessType === 'preview') {
    score += 2;
  }

  // 7. Valoración 4+ estrellas
  if (book.rating >= 4) {
    score += esLectorCero ? 3 : 1; // Muy importante para principiantes
  }

  // 8. Publicado post-2000 (solo Lector Cero)
  if (esLectorCero && book.publishedYear >= 2000) {
    score += 2;
  }

  // 9. Descripción amigable < 300 palabras (solo Lector Cero)
  if (esLectorCero) {
    const wordCount = book.description.split(/\s+/).length;
    if (wordCount > 0 && wordCount < 300) {
      score += 1;
    }
  }

  return score;
}

/**
 * Infiere los géneros relevantes a partir del perfil del lector.
 */
export function inferirGeneros(profile: ReaderProfile): string[] {
  const genres: Set<string> = new Set();

  // Si es lector con experiencia y tiene géneros explícitos, usarlos
  if (profile.readerType === 'experiencia' && profile.genres.length > 0) {
    profile.genres.forEach(g => genres.add(g.toLowerCase()));
  }

  // Inferir desde hobbies
  const hobbyGenres = HOBBY_TO_GENRE[profile.hobbies] || [];
  hobbyGenres.forEach(g => genres.add(g));

  // Inferir desde emociones
  const emotionGenres = EMOTION_TO_GENRE[profile.preferredEmotion] || [];
  emotionGenres.forEach(g => genres.add(g));

  // Inferir desde contenido reciente
  const contentGenres = CONTENT_TO_GENRE[profile.recentContent] || [];
  contentGenres.forEach(g => genres.add(g));

  return Array.from(genres);
}

/**
 * Comprueba si la longitud del libro coincide con el tiempo disponible del lector.
 */
function matchesReadingTime(pageCount: number, readingTime: string): boolean {
  if (pageCount === 0) return false;
  
  switch (readingTime) {
    case 'poco': return pageCount < 200;
    case 'algo': return pageCount >= 200 && pageCount <= 400;
    case 'bastante': return pageCount > 300;
    default: return true;
  }
}

/**
 * Comprueba si el año de publicación coincide con la época preferida.
 */
function matchesEra(year: number, era: string): boolean {
  if (year === 0) return false;
  
  switch (era) {
    case 'clasicos': return year < 1980;
    case 'contemporaneos': return year >= 1980 && year <= 2010;
    case 'recientes': return year > 2010;
    case 'igual': return true;
    default: return true;
  }
}

/**
 * Construye las palabras clave de búsqueda a partir del perfil.
 */
export function buildSearchKeywords(profile: ReaderProfile): string[] {
  const keywords: string[] = [];
  const generos = inferirGeneros(profile);
  
  // Agregar géneros inferidos como keywords
  keywords.push(...generos.slice(0, 3));

  // Mapeo de emociones a palabras clave de búsqueda
  const emotionKeywords: Record<string, string[]> = {
    'emocion-suspenso': ['thriller', 'misterio', 'suspenso'],
    'reirme': ['humor', 'comedia'],
    'aprender': ['divulgacion', 'ensayo'],
    'escapar': ['fantasia', 'aventura', 'mundos'],
    'reflexionar': ['filosofia', 'reflexion'],
    'cualquiera': ['ficcion', 'bestseller'],
  };

  const emotionKeys = emotionKeywords[profile.preferredEmotion] || ['ficcion'];
  keywords.push(...emotionKeys);

  return [...new Set(keywords)];
}
