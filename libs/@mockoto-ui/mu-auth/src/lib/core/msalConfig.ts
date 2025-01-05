import { PublicClientApplication } from '@azure/msal-browser';
const env = import.meta.env;

console.log(`----VITE_SSO_REDIRECT_URI---> `, env.VITE_SSO_REDIRECT_URI);
console.log(`----VITE_AZURE_CLIENT_ID---> `, env.VITE_AZURE_CLIENT_ID);

const MSAL_CONFIG = {
  auth: {
    clientId: env.VITE_AZURE_CLIENT_ID,
    authority: 'https://login.microsoftonline.com/common/v2.0',
    redirectUri: env.VITE_SSO_REDIRECT_URI,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
};

const LOGIN_REQUEST = {
  scopes: ['openid', 'offline_access'],
};

const TOKEN_REQUEST = {
  scopes: ['User.ReadWrite.All'],
};

const GRAPH_CONFIG = {
  graphUsersEndpoint: 'https://graph.microsoft.com/v1.0/users',
};

const PUBLIC_CLIENT_APPLICATION = new PublicClientApplication(MSAL_CONFIG);
async function initializeMsal() {
  await PUBLIC_CLIENT_APPLICATION.initialize();
}
initializeMsal();

export { MSAL_CONFIG, LOGIN_REQUEST, TOKEN_REQUEST, GRAPH_CONFIG, PUBLIC_CLIENT_APPLICATION };
