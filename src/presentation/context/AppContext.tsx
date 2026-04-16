"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Book } from '../../domain/entities/Book';
import { QuizAnswers } from '../../application/usecases/DetectReaderProfileUseCase';

// Tipos de pantallas posibles
export type ScreenState = 'welcome' | 'quiz' | 'loading' | 'results' | 'continue';

interface AppState {
  currentScreen: ScreenState;
  answers: Partial<QuizAnswers>;
  recommendations: Book[];
  error: string | null;
}

interface AppContextType {
  state: AppState;
  goToScreen: (screen: ScreenState) => void;
  saveAnswer: (questionId: keyof QuizAnswers, value: string | string[]) => void;
  setRecommendations: (books: Book[]) => void;
  setError: (error: string | null) => void;
  resetApp: () => void;
}

const initialState: AppState = {
  currentScreen: 'welcome',
  answers: {},
  recommendations: [],
  error: null,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const goToScreen = (screen: ScreenState) => {
    setState(prev => ({ ...prev, currentScreen: screen }));
  };

  const saveAnswer = (questionId: keyof QuizAnswers, value: string | string[]) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: value,
      },
    }));
  };

  const setRecommendations = (books: Book[]) => {
    setState(prev => ({ ...prev, recommendations: books }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error }));
  };

  const resetApp = () => {
    setState(initialState);
  };

  return (
    <AppContext.Provider value={{ state, goToScreen, saveAnswer, setRecommendations, setError, resetApp }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
