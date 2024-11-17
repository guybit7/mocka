import 'express-session';

// to make the file a module and avoid the TypeScript error
export {};

declare module 'express-session' {
  interface SessionData {
    user: any;
  }
}

declare global {
  namespace Express {
    interface Request {
      tenant?: string;
      cookies: { [key: string]: string };
      user?: any; // You can type `user` as needed
    }
  }
}
