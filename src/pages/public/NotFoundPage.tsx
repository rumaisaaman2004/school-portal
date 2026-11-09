import { Link } from 'react-router-dom';
import { buttonStyles, EmptyState } from '@/components/ui';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <EmptyState
        title="Page not found"
        description="The page you're looking for doesn't exist or has moved."
        action={
          <Link to="/login" className={buttonStyles()}>
            Back to sign in
          </Link>
        }
      />
    </div>
  );
}
