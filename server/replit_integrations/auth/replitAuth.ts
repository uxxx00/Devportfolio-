import type { Request, Response, NextFunction, Express } from "express";
import session from "express-session";
import MemoryStoreFactory from "memorystore";

const MemoryStore = MemoryStoreFactory(session);

export function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(
    session({
      cookie: { 
        maxAge: 86400000,
        secure: false,
        httpOnly: true,
        path: '/',
        sameSite: 'lax'
      },
      store: new MemoryStore({
        checkPeriod: 86400000,
      }),
      resave: true,
      saveUninitialized: true,
      secret: "portfolio-secret-123",
      name: 'portfolio.sid'
    })
  );
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).user) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}

export function getSession(req: Request) {
  return (req.session as any).user || null;
}
