import { Suspense, useEffect } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { CloseIcon, GridIcon, LogoutIcon, MenuIcon } from '@/components/icons';
import type { AreaConfig } from '@/config/navigation';
import { useDisclosure } from '@/hooks/useDisclosure';
import { cn } from '@/lib/cn';
import { Brand } from './Brand';
import { PageFallback } from './PageFallback';

interface AreaLayoutProps {
  area: AreaConfig;
}

/**
 * Shell for an authenticated area: fixed sidebar on large screens,
 * top bar + slide-over drawer on small screens.
 */
export function AreaLayout({ area }: AreaLayoutProps) {
  const drawer = useDisclosure();
  const { pathname } = useLocation();

  const { close } = drawer;
  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-neutral-200 bg-surface lg:block">
        <SidebarContent area={area} />
      </aside>

      {/* Mobile drawer */}
      {drawer.isOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation">
          <div className="absolute inset-0 animate-fade-in bg-overlay" onClick={drawer.close} aria-hidden />
          <aside className="relative h-full w-72 max-w-[85%] animate-slide-in bg-surface shadow-overlay">
            <button
              type="button"
              onClick={drawer.close}
              aria-label="Close navigation"
              className="absolute right-3 top-4 rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
            <SidebarContent area={area} />
          </aside>
        </div>
      )}

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-neutral-200 bg-surface px-4 lg:hidden">
        <button
          type="button"
          onClick={drawer.open}
          aria-label="Open navigation"
          className="-ml-1.5 rounded-md p-1.5 text-neutral-600 hover:bg-neutral-100"
        >
          <MenuIcon className="h-6 w-6" />
        </button>
        <Brand to={area.basePath} />
        <Avatar name={area.user.name} />
      </header>

      <main className="mx-auto w-full min-w-0 max-w-6xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}

function SidebarContent({ area }: AreaLayoutProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center px-5">
        <Brand to={area.basePath} />
      </div>

      <p className="px-5 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        {area.label} area
      </p>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label={`${area.label} navigation`}>
        {area.nav.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={label}
            to={path ? `${area.basePath}/${path}` : area.basePath}
            end={!path}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900',
              )
            }
          >
            <Icon className="h-5 w-5 shrink-0" />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="space-y-1 border-t border-neutral-200 p-3">
        <Link
          to="/demo"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100"
        >
          <GridIcon className="h-5 w-5" />
          Component demo
        </Link>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2">
          <Avatar name={area.user.name} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-neutral-900">{area.user.name}</p>
            <p className="truncate text-xs text-neutral-500">{area.user.role}</p>
          </div>
          <Link
            to="/login"
            aria-label="Sign out"
            className="rounded-md p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
          >
            <LogoutIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('');
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
      {initials}
    </span>
  );
}
