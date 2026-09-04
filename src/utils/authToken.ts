import fs from 'fs';
import path from 'path';

type CachedToken = {
    access_token: string;
    token_type: string;
    expires_in: number;
};

const tokenFile = path.resolve(process.cwd(), '.auth', 'api-token.json');

/**
 * Reads the token cached by globalSetup and returns a ready-to-use
 * `Authorization` header value, e.g. `Bearer eyJ...`.
 *
 * Throws if globalSetup hasn't run (no `.auth/api-token.json` yet).
 */
export function getAuthHeader(): string {
    if (!fs.existsSync(tokenFile)) {
        throw new Error(
            `No cached auth token found at ${tokenFile}. Has globalSetup run?`
        );
    }
    const { access_token, token_type }: CachedToken = JSON.parse(
        fs.readFileSync(tokenFile, 'utf-8')
    );
    return `${token_type[0]?.toUpperCase()}${token_type.slice(1)} ${access_token}`;
}
