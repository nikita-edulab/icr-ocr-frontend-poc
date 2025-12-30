import { useEffect } from 'react';
import { useKeycloakAuth } from '../contexts/KeycloakContext';

const useAuthCheck = () => {
  const { keycloak, authenticated } = useKeycloakAuth();

  useEffect(() => {
    if (!authenticated && keycloak) {
      keycloak.login();
    }
  }, [authenticated, keycloak]);
};

export default useAuthCheck;

