/**
 * Normaliza una frase eliminando signos de puntuación, apóstrofes y espacios extra
 * para que no penalice al usuario por tonterías ortográficas en ambiente cotidiano.
 */
export function normalizeAnswer(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/['’`´]/g, '')            // can't -> cant
    .replace(/[-_]/g, ' ')             // second-hand -> second hand
    .replace(/[.,/#!$%^&*;:{}=\-_~()?"!¡¿]/g, '') // fuera signos
    .replace(/\s+/g, ' ')              // espacios simples
    .trim();
}

/**
 * Comprueba si la respuesta del usuario es válida dentro de una lista de respuestas aceptadas.
 */
export function checkAnswer(userInput: string, acceptedAnswers: string[]): boolean {
  const normUser = normalizeAnswer(userInput);
  if (!normUser) return false;

  for (const accepted of acceptedAnswers) {
    const normAccepted = normalizeAnswer(accepted);

    // Coincidencia exacta normalizada
    if (normUser === normAccepted) return true;

    // Si la respuesta del usuario contiene la frase clave obligatoria
    if (normAccepted.length > 5 && normUser.includes(normAccepted)) return true;

    // Pequeña tolerancia a omisión de palabras de relleno como "mate" o "please"
    const userWithoutMate = normUser.replace(/\b(mate|please|thanks|yeah|yes|no)\b/g, '').replace(/\s+/g, ' ').trim();
    const acceptedWithoutMate = normAccepted.replace(/\b(mate|please|thanks|yeah|yes|no)\b/g, '').replace(/\s+/g, ' ').trim();
    if (userWithoutMate && acceptedWithoutMate && userWithoutMate === acceptedWithoutMate) {
      return true;
    }
  }

  return false;
}
