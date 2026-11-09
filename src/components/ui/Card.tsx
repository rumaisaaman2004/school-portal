import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type CardVariant = 'default' | 'outlined' | 'elevated';

const variants: Record<CardVariant, string> = {
  default: 'border border-neutral-200 bg-surface shadow-card',
  outlined: 'border border-neutral-200 bg-surface',
  elevated: 'bg-surface shadow-overlay',
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
}

export function Card({ variant = 'default', className, ...props }: CardProps) {
  return <div className={cn('rounded-xl', variants[variant], className)} {...props} />;
}

interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}

export function CardHeader({ title, description, action, className, ...props }: CardHeaderProps) {
  return (
    <div
      className={cn('flex items-start justify-between gap-4 border-b border-neutral-200 px-5 py-4', className)}
      {...props}
    >
      <div className="min-w-0">
        <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
        {description && <p className="mt-0.5 text-sm text-neutral-500">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function CardBody({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('px-5 py-4', className)} {...props} />;
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center justify-end gap-2 border-t border-neutral-200 px-5 py-3',
        className,
      )}
      {...props}
    />
  );
}
