import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/cn';
import { ToastContext, type ToastItem, type ToastOptions, type ToastTone } from './toast-context';

const toneStyles: Record<ToastTone, { bar: string; icon: string; path: string }> = {
  success: {
    bar: 'bg-success-500',
    icon: 'text-success-600',
    path: 'M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z',
  },
  error: {
    bar: 'bg-danger-500',
    icon: 'text-danger-600',
    path: 'M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z',
  },
  warning: {
    bar: 'bg-warning-500',
    icon: 'text-warning-600',
    path: 'M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z',
  },
  info: {
    bar: 'bg-info-500',
    icon: 'text-info-600',
    path: 'M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z',
  },
};

export interface ToastProps {
  title: string;
  description?: string;
  tone?: ToastTone;
  onClose?: () => void;
  className?: string;
}

/** Presentational toast. Use `useToast()` to show one; render directly for static previews. */
export function Toast({ title, description, tone = 'info', onClose, className }: ToastProps) {
  const style = toneStyles[tone];
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn(
        'pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-xl',
        'border border-neutral-200 bg-surface p-4 pl-5 shadow-overlay',
        className,
      )}
    >
      <span aria-hidden className={cn('absolute inset-y-0 left-0 w-1', style.bar)} />
      <svg aria-hidden viewBox="0 0 20 20" fill="currentColor" className={cn('mt-0.5 h-5 w-5 shrink-0', style.icon)}>
        <path fillRule="evenodd" clipRule="evenodd" d={style.path} />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-neutral-900">{title}</p>
        {description && <p className="mt-0.5 text-sm text-neutral-600">{description}</p>}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss notification"
          className="-m-1 rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      )}
    </div>
  );
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);
  const timers = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: number) => {
    setToasts((list) => list.filter((t) => t.id !== id));
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    ({ title, description, tone = 'info', duration = 4000 }: ToastOptions) => {
      const id = nextId.current++;
      setToasts((list) => [...list, { id, title, description, tone, duration }]);
      if (duration > 0) {
        timers.current.set(id, setTimeout(() => dismiss(id), duration));
      }
      return id;
    },
    [dismiss],
  );

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  const value = useMemo(() => ({ toast, dismiss }), [toast, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {createPortal(
        <div
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex flex-col items-center gap-2 p-4 sm:inset-x-auto sm:right-0 sm:items-end"
        >
          {toasts.map((t) => (
            <Toast
              key={t.id}
              title={t.title}
              description={t.description}
              tone={t.tone}
              onClose={() => dismiss(t.id)}
              className="animate-slide-in sm:w-96"
            />
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
