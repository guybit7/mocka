import * as ReactDOM from 'react-dom/client';

import AppAzure from './app/app-azure';

import { PublicClientApplication, EventType } from '@azure/msal-browser';

import { msalConfig } from './authConfig';

/**
 * MSAL should be instantiated outside of the component tree to prevent it from being re-instantiated on re-renders.
 * For more, visit: https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
export const msalInstance = new PublicClientApplication(msalConfig);

// Default to using the first account if no account is active on page load
if (!msalInstance.getActiveAccount() && msalInstance.getAllAccounts().length > 0) {
  // Account selection logic is app dependent. Adjust as needed for different use cases.

  const r: any = msalInstance.getActiveAccount();
  if (r && r.length) {
    msalInstance.setActiveAccount(r[0]);
  }
}

// Listen for sign-in event and set active account
msalInstance.addEventCallback((event: any) => {
  if (event.eventType === EventType.LOGIN_SUCCESS && event.payload.account) {
    const account = event.payload.account;
    msalInstance.setActiveAccount(account);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<AppAzure instance={msalInstance} />);
