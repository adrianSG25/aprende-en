import React, { useEffect, useRef } from 'react';

interface NativeDialogProps {
  open: boolean;
  onClose: () => void;
  labelledBy?: string;
  lightDismiss?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * Diálogo modal accesible basado en <dialog showModal()>, con contención de scroll,
 * cierre con Esc y fallback de clic exterior compatible con Safari.
 */
export const NativeDialog: React.FC<NativeDialogProps> = ({
  open,
  onClose,
  labelledBy,
  lightDismiss = true,
  children,
  className = ''
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pointerDownTargetOutside = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const isOutsideRect = (dialog: HTMLDialogElement, clientX: number, clientY: number) => {
    const rect = dialog.getBoundingClientRect();
    return (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    );
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      {...(lightDismiss ? { closedby: 'any' } : {})}
      className={`native-dialog ${className}`.trim()}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={() => {
        if (open) onClose();
      }}
      onPointerDown={(e) => {
        if (!lightDismiss || !dialogRef.current) return;
        pointerDownTargetOutside.current =
          e.target === dialogRef.current &&
          isOutsideRect(dialogRef.current, e.clientX, e.clientY);
      }}
      onPointerUp={(e) => {
        if (!lightDismiss || !dialogRef.current || !pointerDownTargetOutside.current) {
          pointerDownTargetOutside.current = false;
          return;
        }
        if (
          e.target === dialogRef.current &&
          isOutsideRect(dialogRef.current, e.clientX, e.clientY)
        ) {
          onClose();
        }
        pointerDownTargetOutside.current = false;
      }}
    >
      {children}
    </dialog>
  );
};
