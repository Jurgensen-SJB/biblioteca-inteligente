/**
 * Caso de Uso: Obtener Preguntas del Quiz.
 * Capa de Aplicación.
 */

import { QuizQuestion } from '../../domain/entities/QuizQuestion';
import { ReaderType } from '../../domain/entities/ReaderProfile';

// Preguntas hardcodeadas (podrían venir de una BD en el futuro)
const questionsData: QuizQuestion[] = [
  {
    id: 'q0',
    route: 'ambas',
    multiSelect: false,
    question: '¿Cuánto sueles leer?',
    options: [
      { label: 'Nunca he leído un libro completo', value: 'nunca', icon: '🌱' },
      { label: 'Leo de vez en cuando', value: 'ocasional', icon: '📖' },
      { label: 'Leo regularmente', value: 'regular', icon: '📚' },
      { label: 'Soy un lector frecuente', value: 'frecuente', icon: '🧙‍♂️' },
    ]
  },
  {
    id: 'q1',
    route: 'ambas',
    multiSelect: false,
    question: '¿Qué te gusta hacer en tu tiempo libre?',
    options: [
      { label: 'Ver series o películas', value: 'series', icon: '🎬' },
      { label: 'Escuchar música', value: 'musica', icon: '🎵' },
      { label: 'Jugar videojuegos', value: 'videojuegos', icon: '🎮' },
      { label: 'Salir a aventuras', value: 'aventuras', icon: '🏕️' },
      { label: 'Reflexionar y pensar', value: 'reflexionar', icon: '🤔' },
      { label: 'Ver documentales', value: 'documentales', icon: '🌍' },
    ]
  },
  {
    id: 'q2',
    route: 'ambas',
    multiSelect: false,
    question: '¿Cómo describirías lo que quieres sentir leyendo?',
    options: [
      { label: 'Quiero emoción y suspenso', value: 'emocion-suspenso', icon: '⚡' },
      { label: 'Quiero reírme', value: 'reirme', icon: '😂' },
      { label: 'Quiero aprender algo', value: 'aprender', icon: '🧠' },
      { label: 'Quiero escapar a otro mundo', value: 'escapar', icon: '🚀' },
      { label: 'Quiero reflexionar', value: 'reflexionar', icon: '🧘‍♀️' },
      { label: 'No sé, cualquiera está bien', value: 'cualquiera', icon: '🎲' },
    ]
  },
  {
    id: 'q3',
    route: 'ambas',
    multiSelect: false,
    question: '¿Cuánto tiempo tienes para leer cada día?',
    options: [
      { label: 'Muy poco (15-20 minutos)', value: 'poco', icon: '⏳' },
      { label: 'Algo de tiempo (30-45 minutos)', value: 'algo', icon: '⏱️' },
      { label: 'Bastante tiempo (más de 1 hora)', value: 'bastante', icon: '🕰️' },
    ]
  },
  {
    id: 'q4',
    route: 'ambas',
    multiSelect: false,
    question: '¿Has visto o escuchado algo que te haya encantado últimamente?',
    options: [
      { label: 'Una película o serie', value: 'pelicula-serie', icon: '🍿' },
      { label: 'Un pódcast o historia', value: 'podcast-historia', icon: '🎧' },
      { label: 'Un documental', value: 'documental', icon: '🔬' },
      { label: 'Un videojuego', value: 'videojuego', icon: '👾' },
      { label: 'No recuerdo nada en especial', value: 'nada-especial', icon: '🤷‍♂️' },
    ]
  },
  {
    id: 'q5',
    route: 'ambas',
    multiSelect: false,
    question: '¿Prefieres leer en español o en inglés?',
    options: [
      { label: 'Solo español', value: 'es', icon: '🇪🇸' },
      { label: 'Solo inglés', value: 'en', icon: '🇬🇧' },
      { label: 'Cualquiera', value: 'cualquiera', icon: '🌎' },
    ]
  },
  {
    id: 'q6',
    route: 'experiencia',
    multiSelect: true,
    question: '¿Qué géneros literarios disfrutas más?',
    options: [
      { label: 'Novela', value: 'novela', icon: '📘' },
      { label: 'Ciencia Ficción', value: 'ciencia-ficcion', icon: '🛸' },
      { label: 'Romance', value: 'romance', icon: '💕' },
      { label: 'Terror', value: 'terror', icon: '👻' },
      { label: 'Fantasía', value: 'fantasia', icon: '🐉' },
      { label: 'Historia', value: 'historia', icon: '🏛️' },
      { label: 'Autoayuda', value: 'autoayuda', icon: '🌱' },
      { label: 'Aventura', value: 'aventura', icon: '🗺️' },
    ]
  },
  {
    id: 'q7',
    route: 'experiencia',
    multiSelect: false,
    question: '¿Te gustan más los libros clásicos o contemporáneos?',
    options: [
      { label: 'Clásicos (antes de 1980)', value: 'clasicos', icon: '🎩' },
      { label: 'Contemporáneos (1980-2010)', value: 'contemporaneos', icon: '📼' },
      { label: 'Recientes (2010 en adelante)', value: 'recientes', icon: '📱' },
      { label: 'Me da igual', value: 'igual', icon: '⚖️' },
    ]
  },
  {
    id: 'q8',
    route: 'ambas',
    multiSelect: false,
    question: '¿Para qué quieres leer?',
    options: [
      { label: 'Por entretenimiento', value: 'entretenimiento', icon: '🎉' },
      { label: 'Para aprender algo', value: 'aprender', icon: '🎓' },
      { label: 'Para relajarme', value: 'relajarme', icon: '☕' },
      { label: 'Para leer con mis hijos', value: 'hijos', icon: '👨‍👧‍👦' },
      { label: 'Quiero mejorar mi vocabulario', value: 'vocabulario', icon: '📝' },
      { label: 'Solo quiero probar', value: 'probar', icon: '👀' },
    ]
  }
];

/**
 * Obtiene las preguntas aplicables según el tipo de lector.
 */
export function getQuizQuestions(readerType: ReaderType | null): QuizQuestion[] {
  // Si no se sabe el tipo, devolvemos solo la pregunta 0
  if (!readerType) {
    return questionsData.filter(q => q.id === 'q0');
  }

  // Devolver las preguntas correspondientes a la ruta
  return questionsData.filter(q => q.route === 'ambas' || q.route === readerType);
}

/**
 * Obtiene una pregunta específica por su ID.
 */
export function getQuestionById(id: string): QuizQuestion | undefined {
  return questionsData.find(q => q.id === id);
}
