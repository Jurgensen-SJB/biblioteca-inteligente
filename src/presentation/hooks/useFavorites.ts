"use client";

import { useState, useEffect } from 'react';

/**
 * Hook para manejar favoritos con localStorage.
 * Capa de Presentación.
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Cargar favoritos desde localStorage al montar
  useEffect(() => {
    try {
      const stored = localStorage.getItem('biblioteca_favoritos');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // Si falla la lectura, empezar con lista vacía
    }
  }, []);

  // Guardar en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem('biblioteca_favoritos', JSON.stringify(favorites));
    } catch {
      // Silenciar error si localStorage no está disponible
    }
  }, [favorites]);

  const toggleFavorite = (bookId: string) => {
    setFavorites(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };

  const isFavorite = (bookId: string): boolean => {
    return favorites.includes(bookId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
