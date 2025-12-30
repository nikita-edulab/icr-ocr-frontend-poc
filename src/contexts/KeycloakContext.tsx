import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

import Keycloak from 'keycloak-js';

type KeycloakCtx = {
  keycloak: Keycloak | null;
  authenticated: boolean;
  initialized: boolean;
  logout: () => void;
};

const KeycloakContext = createContext<KeycloakCtx | undefined>(undefined);

export function KeycloakProvider({ children }: { children: ReactNode }) {
  const [keycloak, setKeycloak] = useState<Keycloak | null>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const kc = new Keycloak({
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
    });

    kc.init({ onLoad: 'login-required', checkLoginIframe: false })
      .then((auth) => {
        setKeycloak(kc);
        setAuthenticated(!!auth);

        kc.onTokenExpired = async () => {
          try {
            await kc.updateToken(5);
          } catch (e) {
            console.error('Token refresh failed', e);
          }
        };
      })
      .catch((err) => {
        console.error('Keycloak init error', err);
      })
      .finally(() => {
        setInitialized(true);
      });
  }, []);

  const logout = () => {
    if (!keycloak) return;

    keycloak.logout({
      redirectUri: "http://localhost:3000/login",
    });
  };

  if (!initialized) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    // Keycloak will usually redirect automatically, this is a fallback
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <p className="text-gray-600">Redirecting to login...</p>
      </div>
    );
  }

  return (
    <KeycloakContext.Provider value={{ keycloak, authenticated, initialized ,logout}}>
      {children}
    </KeycloakContext.Provider>
  );
}

export function useKeycloakAuth() {
  const ctx = useContext(KeycloakContext);
  if (!ctx) {
    throw new Error('useKeycloakAuth must be used within KeycloakProvider');
  }
  return ctx;
}

