import { Outlet } from 'react-router-dom';
import { Brand } from './Brand';

/** Centered card layout for public auth pages. */
export function AuthLayout() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-muted px-4 py-10">
      <Brand to="/login" className="mb-8 text-lg" />
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
