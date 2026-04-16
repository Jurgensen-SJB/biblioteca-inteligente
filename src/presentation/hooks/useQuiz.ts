"use client";

import { useState, useCallback } from 'react';
import { QuizQuestion } from '../../domain/entities/QuizQuestion';
import { ReaderType } from '../../domain/entities/ReaderProfile';
import { getQuizQuestions } from '../../application/usecases/GetQuizQuestionsUseCase';
import { QuizAnswers } from '../../application/usecases/DetectReaderProfileUseCase';

/**
 * Hook personalizado para manejar todo el flujo del quiz.
 * Capa de Presentación.
 */
export function useQuiz() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [readerType, setReaderType] = useState<ReaderType | null>(null);
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({});
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => getQuizQuestions(null));

  /** Responder una pregunta y avanzar */
  const answerQuestion = useCallback((questionId: string, value: string | string[]) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Si es la Pregunta 0, detectar tipo de lector y cargar preguntas correctas
    if (questionId === 'q0') {
      const detectedType: ReaderType = value === 'nunca' ? 'cero' : 'experiencia';
      setReaderType(detectedType);
      const newQuestions = getQuizQuestions(detectedType);
      setQuestions(newQuestions);
      setCurrentIndex(1); // Avanzar a la siguiente pregunta
      return;
    }

    // Avanzar al siguiente
    setCurrentIndex(prev => prev + 1);
  }, [answers]);

  /** Retroceder una pregunta */
  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  /** Resetear el quiz */
  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setReaderType(null);
    setAnswers({});
    setQuestions(getQuizQuestions(null));
  }, []);

  /** ¿El quiz terminó? */
  const isComplete = currentIndex >= questions.length;

  /** Pregunta actual */
  const currentQuestion = questions[currentIndex] || null;

  /** Progreso (1-indexed) */
  const progress = {
    current: Math.min(currentIndex + 1, questions.length),
    total: questions.length,
    percentage: ((currentIndex + 1) / questions.length) * 100,
  };

  return {
    currentQuestion,
    currentIndex,
    readerType,
    answers: answers as QuizAnswers,
    questions,
    progress,
    isComplete,
    answerQuestion,
    goBack,
    resetQuiz,
  };
}
