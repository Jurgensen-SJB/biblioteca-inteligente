"use client";

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import WelcomeScreen from '../presentation/components/WelcomeScreen';
import QuizContainer from '../presentation/components/Quiz/QuizContainer';
import LoadingScreen from '../presentation/components/LoadingScreen';
import ResultsContainer from '../presentation/components/Results/ResultsContainer';
import ContinueScreen from '../presentation/components/ContinueScreen';
import { Book } from '../domain/entities/Book';
import { QuizAnswers } from '../application/usecases/DetectReaderProfileUseCase';

/**
 * Página principal - Orquesta las 5 pantallas del flujo:
 * 1. Bienvenida
 * 2. Quiz adaptativo
 * 3. Cargando
 * 4. Resultados
 * 5. Invitación a continuar
 */

type Screen = 'welcome' | 'quiz' | 'loading' | 'results' | 'continue';

export default function HomePage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [recommendations, setRecommendations] = useState<Book[]>([]);
  const [isLectorCero, setIsLectorCero] = useState(false);
  const [lastAnswers, setLastAnswers] = useState<QuizAnswers | null>(null);

  /** Comenzar el quiz */
  const handleStart = useCallback(() => {
    setCurrentScreen('quiz');
  }, []);

  /** Quiz completado: enviar respuestas al servidor */
  const handleQuizComplete = useCallback(async (answers: QuizAnswers, readerType: 'cero' | 'experiencia') => {
    setLastAnswers(answers);
    setIsLectorCero(readerType === 'cero');
    setCurrentScreen('loading');

    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });

      if (!response.ok) {
        throw new Error('Error en la API');
      }

      const data = await response.json();
      setRecommendations(data.books || []);
      setIsLectorCero(data.isLectorCero || false);

      // Pequeña pausa para que la animación se vea
      setTimeout(() => {
        setCurrentScreen('results');
      }, 1500);
    } catch (error) {
      console.error('Error al obtener recomendaciones:', error);
      // Mostrar resultado con lo que tengamos
      setTimeout(() => {
        setCurrentScreen('results');
      }, 1500);
    }
  }, []);

  /** Reiniciar todo */
  const handleRestart = useCallback(() => {
    setRecommendations([]);
    setLastAnswers(null);
    setIsLectorCero(false);
    setCurrentScreen('welcome');
  }, []);

  return (
    <main className="min-h-screen bg-crema">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onStart={handleStart} />
        )}
        {currentScreen === 'quiz' && (
          <QuizContainer
            key="quiz"
            onComplete={handleQuizComplete}
            onBack={() => setCurrentScreen('welcome')}
          />
        )}
        {currentScreen === 'loading' && (
          <LoadingScreen key="loading" />
        )}
        {currentScreen === 'results' && (
          <ResultsContainer
            key="results"
            books={recommendations}
            isLectorCero={isLectorCero}
            onRestart={handleRestart}
          />
        )}
        {currentScreen === 'continue' && (
          <ContinueScreen
            key="continue"
            isLectorCero={isLectorCero}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
