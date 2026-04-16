/**
 * API Route: /api/recommendations
 * 
 * Protege la API Key de Google Books (nunca en frontend).
 * Recibe las respuestas del quiz, ejecuta los use cases, y devuelve libros con paginación en frontend.
 */

import { NextRequest, NextResponse } from 'next/server';
import { detectReaderProfile, QuizAnswers } from '../../../application/usecases/DetectReaderProfileUseCase';
import { generateRecommendations } from '../../../application/usecases/GenerateRecommendationsUseCase';
import { GoogleBooksRepository } from '../../../infrastructure/repositories/GoogleBooksRepository';
import { CuratedBooksRepository } from '../../../infrastructure/repositories/CuratedBooksRepository';
import { serverCache } from '../../../infrastructure/cache/SimpleCache';
import { buildSearchKeywords } from '../../../domain/services/ScoringService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const answers: QuizAnswers = body.answers;

    if (!answers || !answers.q0) {
      return NextResponse.json(
        { error: 'Respuestas del quiz incompletas' },
        { status: 400 }
      );
    }

    // 1. Detectar perfil del lector
    const profile = detectReaderProfile(answers);

    // 2. Verificar caché
    const profileKey = `${profile.readerType}|${profile.preferredEmotion}|${profile.language}`;
    const keywords = buildSearchKeywords(profile);
    const cached = serverCache.get(profileKey, keywords);

    if (cached && cached.length >= 3) {
      return NextResponse.json({
        books: cached,
        isLectorCero: profile.readerType === 'cero',
        fromCache: true,
      });
    }

    // 3. Crear repositorios (inyección de dependencias)
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY || '';
    const googleBooksRepo = new GoogleBooksRepository(apiKey);
    const curatedBooksRepo = new CuratedBooksRepository();

    // 4. Generar recomendaciones
    const books = await generateRecommendations(profile, googleBooksRepo, curatedBooksRepo);

    // 5. Guardar en caché
    if (books.length > 0) {
      serverCache.set(profileKey, keywords, books);
    }

    // 6. Devolver resultados
    return NextResponse.json({
      books,
      isLectorCero: profile.readerType === 'cero',
      fromCache: false,
    });
  } catch (error) {
    console.error('Error en /api/recommendations:', error);
    
    // Fallback: si todo falla, devolver libros curados
    try {
      const curatedRepo = new CuratedBooksRepository();
      const fallbackBooks = await curatedRepo.searchBooks(
        { readerType: 'cero', readingFrequency: 'nunca', hobbies: '', preferredEmotion: 'cualquiera', readingTime: 'poco', recentContent: '', language: 'es', genres: [], era: '', purpose: 'probar' },
        ['ficcion', 'aventura']
      );
      return NextResponse.json({
        books: fallbackBooks,
        isLectorCero: true,
        fromCache: false,
        fallback: true,
      });
    } catch {
      return NextResponse.json(
        { error: 'No se pudieron generar recomendaciones. Inténtalo de nuevo.' },
        { status: 500 }
      );
    }
  }
}
