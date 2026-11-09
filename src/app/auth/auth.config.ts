import { PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'http://localhost:8180/realms/convox',
    redirectUrl: `http://localhost:4400`,
    postLogoutRedirectUri: `http://localhost:4400`,
    clientId: 'convox-web',
    scope: 'openid profile email organization:*',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    renewTimeBeforeTokenExpiresInSeconds: 30,
  },
};
