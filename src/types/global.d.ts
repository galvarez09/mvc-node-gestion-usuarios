import 'express-session';

declare module 'express-session' {
  interface SessionData {
    user?: any;
    success?: string;
    error?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      session: any;
    }
  }
}

export {};
