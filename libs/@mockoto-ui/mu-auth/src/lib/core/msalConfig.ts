import { PublicClientApplication } from '@azure/msal-browser';

const MSAL_CONFIG = {
  auth: {
    clientId: '5bc675d0-fe2f-4c77-8e54-fadd21eb8930',
    authority: 'https://login.microsoftonline.com/common/v2.0', //59a0c420-f364-4780-a8ce-759b1f501580',
    redirectUri: 'http://localhost:4200',
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
