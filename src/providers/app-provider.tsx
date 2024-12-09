import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import { Auth0Provider } from '@auth0/auth0-react';
import { queryClient } from '@/lib/query-client';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" />
      </QueryClientProvider>
    </Auth0Provider>
  );
}