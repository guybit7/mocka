import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest } from '../../authConfig';
import { Button } from '@mui/material';

export const NavigationBar = () => {
  const { instance } = useMsal();

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch(error => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch(error => console.log(error));
  };

  /**
   * Most applications will need to conditionally render certain components based on whether a user is signed in or not.
   * msal-react provides 2 easy ways to do this. AuthenticatedTemplate and UnauthenticatedTemplate components will
   * only render their children if a user is authenticated or unauthenticated, respectively.
   */
  return (
    <div className="divStyle">
      <a className="navbar-brand" href="/">
        Microsoft identity platform
      </a>
      <AuthenticatedTemplate>
        <div className="collapse navbar-collapse justify-content-end">
          <Button onClick={handleLogoutRedirect}>Sign out</Button>
        </div>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className="collapse navbar-collapse justify-content-end">
          <Button onClick={handleLoginRedirect}>Sign in</Button>
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};
