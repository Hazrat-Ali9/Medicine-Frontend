import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import Router from './Routs/Router';
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Context/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// TanStack Query Client তৈরি
const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <StrictMode>
          <RouterProvider router={Router} />
        </StrictMode>
      </QueryClientProvider>
    </HelmetProvider>
  </AuthProvider>
);
