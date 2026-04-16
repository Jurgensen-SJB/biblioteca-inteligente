/**
 * Entidad Pregunta del Quiz - Define la estructura de cada pregunta.
 * Capa de Dominio.
 */

/** Opción individual del quiz */
export interface QuizOption {
  /** Texto visible para el usuario */
  label: string;
  /** Valor interno para el sistema */
  value: string;
  /** Emoji/icono asociado a la opción */
  icon: string;
}

/** Pregunta completa del quiz */
export interface QuizQuestion {
  /** Identificador único de la pregunta */
  id: string;
  /** Texto de la pregunta */
  question: string;
  /** Opciones de respuesta */
  options: QuizOption[];
  /** Si es verdadero, permite selección múltiple */
  multiSelect: boolean;
  /** Ruta a la que pertenece: 'ambas', 'experiencia', 'cero' */
  route: 'ambas' | 'experiencia' | 'cero';
}
