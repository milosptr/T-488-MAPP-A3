import { env } from '@/src/config';
import type { AuthResponse } from '@/src/types';

// ============ Error Handling ============
export class ApiError extends Error {
    constructor(
        message: string,
        public status: number,
        public data?: unknown
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

// ============ Token Management ============
let authToken: string | null = null;
let tokenExpiry: number | null = null;

export const setAuthToken = (token: string | null, expiry?: number) => {
    authToken = token;
    tokenExpiry = expiry ?? null;
};

export const getAuthToken = () => authToken;

export const isTokenValid = () => {
    if (!authToken || !tokenExpiry) return false;
    return Date.now() < tokenExpiry;
};

// ============ URL Builder ============
type QueryParams = Record<string, string | number | boolean | undefined | null>;

const buildUrl = (endpoint: string, params?: QueryParams): string => {
    let url = `${env.kvikmyndir.baseUrl}${endpoint}`;

    if (params) {
        const searchParams: string[] = [];
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.push(
                    `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
                );
            }
        });
        if (searchParams.length > 0) {
            url += `?${searchParams.join('&')}`;
        }
    }

    return url;
};

// ============ API Client ============
type RequestConfig = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    body?: Record<string, unknown>;
    headers?: Record<string, string>;
    params?: QueryParams;
};

export const apiClient = async <T>(endpoint: string, config: RequestConfig = {}): Promise<T> => {
    const { method = 'GET', body, headers = {}, params } = config;

    const requestHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        ...headers,
    };

    // Add auth token if available
    if (authToken) {
        requestHeaders['x-access-token'] = authToken;
    }

    const url = buildUrl(endpoint, params);

    const response = await fetch(url, {
        method,
        headers: requestHeaders,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new ApiError(`API Error: ${response.statusText}`, response.status, errorData);
    }

    return response.json() as Promise<T>;
};

// ============ Authentication ============
export const authenticate = async (): Promise<AuthResponse> => {
    const basicAuth = btoa(`${env.kvikmyndir.username}:${env.kvikmyndir.password}`);

    const response = await fetch(`${env.kvikmyndir.baseUrl}/authenticate`, {
        method: 'POST',
        headers: {
            Authorization: `Basic ${basicAuth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });

    const data = (await response.json()) as AuthResponse;

    if (!data.success) {
        throw new ApiError(data.message || 'Authentication failed', 401, data);
    }

    // Store token (expires in 24 hours)
    const expiry = Date.now() + 24 * 60 * 60 * 1000;
    setAuthToken(data.token, expiry);

    return data;
};

// ============ TMDB API Client ============
export const tmdbClient = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`https://api.themoviedb.org/3${endpoint}`, {
        headers: {
            Authorization: `Bearer ${env.kvikmyndir.tmdbKey}`,
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new ApiError(`TMDB Error: ${response.statusText}`, response.status);
    }

    return response.json() as Promise<T>;
};
