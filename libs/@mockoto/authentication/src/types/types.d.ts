import 'express-session';
import 'express';

declare module 'express-session' {
  interface SessionData {
    user: any;
  }
}

declare module 'express' {
  export interface Request {
    tenantId?: string;
  }
}
