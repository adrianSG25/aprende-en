import { flushSync } from 'react-dom';

type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
};

/**
 * Envuelve cambios de vista en la API View Transitions cuando el navegador la soporta
 * y gestiona el foco en el destino tras completar la actualización.
 */
export function runViewTransition(update: () => void, focusElementId?: string) {
  const doc = document as DocumentWithVT;

  const focusTarget = () => {
    if (!focusElementId) return;
    requestAnimationFrame(() => {
      document.getElementById(focusElementId)?.focus({ preventScroll: true });
    });
  };

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!doc.startViewTransition || prefersReduced) {
    update();
    focusTarget();
    return;
  }

  const transition = doc.startViewTransition(() => {
    flushSync(() => {
      update();
    });
  });

  transition.finished.finally(focusTarget).catch(() => {});
}
