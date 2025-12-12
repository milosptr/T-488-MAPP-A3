import { authenticate, isTokenValid } from '@/src/api';
import { useEffect, useState } from 'react';

type AuthState = {
    isLoading: boolean;
    isAuthenticated: boolean;
    error: Error | null;
};

let authAttempted = false;
let cachedAuthState: AuthState | null = null;

export const useInitializeAuth = (): AuthState => {
    const [state, setState] = useState<AuthState>(
        cachedAuthState ?? {
            isLoading: true,
            isAuthenticated: false,
            error: null,
        }
    );

    useEffect(() => {
        if (authAttempted) {
            return;
        }

        authAttempted = true;

        const initAuth = async () => {
            if (isTokenValid()) {
                const newState = { isLoading: false, isAuthenticated: true, error: null };
                cachedAuthState = newState;
                setState(newState);
                return;
            }

            try {
                await authenticate();
                const newState: AuthState = {
                    isLoading: false,
                    isAuthenticated: true,
                    error: null,
                };
                cachedAuthState = newState;
                setState(newState);
            } catch (err) {
                const newState: AuthState = {
                    isLoading: false,
                    isAuthenticated: false,
                    error: err instanceof Error ? err : new Error('Authentication failed'),
                };
                cachedAuthState = newState;
                setState(newState);
            }
        };

        initAuth();
    }, []);

    return state;
};
