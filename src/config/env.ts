/**
 * Environment configuration with validation
 * I've added this so that we don't forget to add the environment variables to the app.
 * Find the environment variables in the .env.example file. You can copy it to .env and fill in the values.
 */

const getEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
    return value;
};

export const env = {
    kvikmyndir: {
        baseUrl: getEnvVar('EXPO_PUBLIC_KVIKMYNDIR_API_BASE_URL'),
        username: getEnvVar('EXPO_PUBLIC_KVIKMYNDIR_API_AUTH_USERNAME'),
        password: getEnvVar('EXPO_PUBLIC_KVIKMYNDIR_API_AUTH_PASSWORD'),
        tmdbKey: getEnvVar('EXPO_PUBLIC_TMDB_API_KEY'),
    },
} as const;

export type Env = typeof env;
