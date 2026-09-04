import fs from 'fs';
import path from 'path';
import { LoginAPIClient } from '@api/loginApi.js';
import { getEnv } from '@utils/env.js';


async function globalSetup() {
    const authDir = path.resolve(process.cwd(), '.auth');
    const tokenFile = path.join(authDir, 'api-token.json');

    const loginAPI = new LoginAPIClient();
    const response = await loginAPI.loginAs(getEnv('JANE_DOE'), getEnv('PASSWORD'));

    if (!response.ok()) {
        throw new Error(
            `Global setup login failed: ${response.status()} ${await response.text()}`
        );
    }

    const body = await response.json();

    fs.mkdirSync(authDir, { recursive: true });
    fs.writeFileSync(tokenFile, JSON.stringify(body, null, 2));
}

export default globalSetup;
