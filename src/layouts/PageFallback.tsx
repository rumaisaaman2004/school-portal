import { Spinner } from '@/components/ui';

export function PageFallback() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center text-primary-600">
      <Spinner size="lg" />
    </div>
  );
}
