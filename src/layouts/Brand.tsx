import { Link } from 'react-router-dom';
import { CapIcon } from '@/components/icons';
import { cn } from '@/lib/cn';

export function Brand({ to = '/', className }: { to?: string; className?: string }) {
  return (
    <Link to={to} className={cn('flex items-center gap-2 font-semibold text-neutral-900', className)}>
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
        <CapIcon className="h-5 w-5" />
      </span>
      <span>School Portal</span>
    </Link>
  );
}
