import * as dotenv from 'dotenv';
dotenv.config();

/**
 * Reads a required environment variable, throwing if it is missing or empty.
 * Keeps call sites free of `string | undefined` handling under strict mode.
 */
export function getEnv(name: string): string {
    const value = process.env[name];
    if (value === undefined || value === '') {
        throw new Error(`Missing required environment variable: ${name}`);
    }
    return value;
}
