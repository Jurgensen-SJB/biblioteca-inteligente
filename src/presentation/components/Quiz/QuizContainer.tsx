"use client";

import { motion, AnimatePresence } from 'framer-motion';
import ProgressBar from './ProgressBar';
import QuestionCard from './QuestionCard';
import { useQuiz } from '../../hooks/useQuiz';
import { QuizAnswers } from '../../../application/usecases/DetectReaderProfileUseCase';

/**
 * Pantalla 2 - Quiz Adaptativo.
 * Pregunta 0 detecta el perfil.
 * Ruta A (experiencia): 8 preguntas.
 * Ruta B (Lector Cero): 5 preguntas (sin jerga).
 */

interface QuizContainerProps {
  onComplete: (answers: QuizAnswers, readerType: 'cero' | 'experiencia') => void;
  onBack: () => void;
}

export default function QuizContainer({ onComplete, onBack }: QuizContainerProps) {
  const {
    currentQuestion,
    currentIndex,
    readerType,
    answers,
    progress,
    isComplete,
    answerQuestion,
    goBack,
  } = useQuiz();

  // Cuando el quiz se completa, informar al padre
  if (isComplete) {
    // Ejecutar en el siguiente tick para evitar actualizar durante renderizado
    setTimeout(() => {
      onComplete(answers, readerType || 'experiencia');
    }, 0);
    return null;
  }

  if (!currentQuestion) {
    return null;
  }

  // Micro-copy motivador contextual
  const getMotivationalText = (): string => {
    if (currentIndex === 0) return '¡Empecemos a conocerte! 🌟';
    if (readerType === 'cero' && currentIndex === 1) return '¡Perfecto! Vamos a encontrar algo genial para ti 💪';
    if (currentIndex >= progress.total - 1) return '¡Última pregunta! Ya casi tienes tus libros 📚';
    return '¡Vas muy bien!';
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex flex-col px-6 py-8 max-w-2xl mx-auto"
    >
      {/* Header con botón atrás y progreso */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={currentIndex > 0 ? goBack : onBack}
          className="p-2 rounded-lg hover:bg-bosque/5 transition-colors text-bosque/60 hover:text-bosque
                     focus:outline-none focus:ring-2 focus:ring-salvia/50"
          aria-label="Volver"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
      </div>

      {/* Barra de progreso */}
      <ProgressBar
        current={progress.current}
        total={progress.total}
        percentage={progress.percentage}
      />

      {/* Micro-copy motivador */}
      <motion.p
        key={currentIndex}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-sm text-salvia font-medium mb-8"
      >
        {getMotivationalText()}
      </motion.p>

      {/* Pregunta actual con animación */}
      <div className="flex-1 flex items-start justify-center">
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            selectedValues={answers[currentQuestion.id as keyof QuizAnswers]}
            onAnswer={(qId, val) => answerQuestion(qId, val)}
          />
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
