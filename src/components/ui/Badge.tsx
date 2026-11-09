import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeVariant = 'soft' | 'solid' | 'outline';

const tones: Record<BadgeTone, Record<BadgeVariant, string>> = {
  neutral: {
    soft: 'bg-neutral-100 text-neutral-700',
    solid: 'bg-neutral-700 text-white',
    outline: 'border border-neutral-300 text-neutral-700',
  },
  primary: {
    soft: 'bg-primary-50 text-primary-700',
    solid: 'bg-primary-600 text-white',
    outline: 'border border-primary-300 text-primary-700',
  },
  success: {
    soft: 'bg-success-50 text-success-700',
    solid: 'bg-success-600 text-white',
    outline: 'border border-success-500 text-success-700',
  },
  warning: {
    soft: 'bg-warning-50 text-warning-700',
    solid: 'bg-warning-500 text-white',
    outline: 'border border-warning-500 text-warning-700',
  },
  danger: {
    soft: 'bg-danger-50 text-danger-700',
    solid: 'bg-danger-600 text-white',
    outline: 'border border-danger-500 text-danger-700',
  },
  info: {
    soft: 'bg-info-50 text-info-700',
    solid: 'bg-info-600 text-white',
    outline: 'border border-info-500 text-info-700',
  },
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({ tone = 'neutral', variant = 'soft', dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        tones[tone][variant],
        className,
      )}
      {...props}
    >
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
