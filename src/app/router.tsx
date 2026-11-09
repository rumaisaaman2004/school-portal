import { lazy, Suspense, type ComponentType, type LazyExoticComponent, type ReactNode } from 'react';
import { createBrowserRouter, Navigate, type RouteObject } from 'react-router-dom';
import { areaList, type AreaConfig, type AreaKey } from '@/config/navigation';
import { AreaLayout } from '@/layouts/AreaLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { PageFallback } from '@/layouts/PageFallback';

// Route-level code splitting: each page is its own chunk.
const LoginPage = lazy(() => import('@/pages/public/LoginPage'));
const RegisterPage = lazy(() => import('@/pages/public/RegisterPage'));
const DemoPage = lazy(() => import('@/pages/public/DemoPage'));
const NotFoundPage = lazy(() => import('@/pages/public/NotFoundPage'));
const PlaceholderPage = lazy(() => import('@/pages/shared/PlaceholderPage'));

const dashboards: Record<AreaKey, LazyExoticComponent<ComponentType>> = {
  student: lazy(() => import('@/pages/student/StudentDashboard')),
  parent: lazy(() => import('@/pages/parent/ParentDashboard')),
  admin: lazy(() => import('@/pages/admin/AdminDashboard')),
};

const withSuspense = (node: ReactNode) => <Suspense fallback={<PageFallback />}>{node}</Suspense>;

/** Builds an area's route subtree from its navigation config. */
function buildAreaRoute(area: AreaConfig): RouteObject {
  const Dashboard = dashboards[area.key];
  return {
    path: area.basePath,
    element: <AreaLayout area={area} />,
    children: area.nav.map((item) =>
      item.path === ''
        ? { index: true, element: <Dashboard /> }
        : {
            path: item.path,
            element: <PlaceholderPage title={item.label} description={item.description} />,
          },
    ),
  };
}

export const router = createBrowserRouter([
  { path: '/', element: <Navigate to="/login" replace /> },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: withSuspense(<LoginPage />) },
      { path: '/register', element: withSuspense(<RegisterPage />) },
    ],
  },
  { path: '/demo', element: withSuspense(<DemoPage />) },
  ...areaList.map(buildAreaRoute),
  { path: '*', element: withSuspense(<NotFoundPage />) },
]);
