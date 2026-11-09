/** Shared class strings and aria helpers for form controls (Input, Select). */

export const fieldBase =
  'h-10 w-full rounded-lg border bg-surface px-3 text-sm text-neutral-900 transition-colors ' +
  'placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ' +
  'disabled:cursor-not-allowed disabled:bg-neutral-100 disabled:text-neutral-500';

export const fieldState = (hasError: boolean) =>
  hasError
    ? 'border-danger-500 focus:border-danger-500 focus:ring-danger-100'
    : 'border-neutral-300 focus:border-primary-500 focus:ring-primary-100';

export const describedBy = (id: string, error?: string, hint?: string) =>
  error ? `${id}-error` : hint ? `${id}-hint` : undefined;
