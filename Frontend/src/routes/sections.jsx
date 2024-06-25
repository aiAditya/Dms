import { lazy, Suspense, useEffect, useState } from 'react';
import { Outlet, Navigate, useRoutes, useLocation } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import Loader from 'src/layouts/dashboard/common/loader';
import SignupPage from 'src/sections/login/signup';
import Folder from 'src/sections/user/Folder/Folder';
import Profile from 'src/sections/user/profile/profile';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense  fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'roots/*', element: <UserPage />,
         },
        { path: 'starred/*', element: <ProductsPage /> },
        {
          path:'profile',
          element:<Profile />,
        },
       
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path:'register',
      element:<SignupPage />,
    },
    
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
