import type { Express } from "express";
import { isAuthenticated } from "./replitAuth";

export function registerAuthRoutes(app: Express): void {
  // Logout route
  app.get("/api/logout", (req, res) => {
    req.session.destroy(() => {
      res.redirect("/");
    });
  });

  // Get current authenticated user
  app.get("/api/auth/user", (req, res) => {
    console.log("Session check:", req.sessionID, (req.session as any).user);
    if (req.session && (req.session as any).user) {
      return res.json((req.session as any).user);
    }
    res.status(401).json({ message: "Unauthorized" });
  });

  // Login route
  app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt:", { email });
    if (email === "leozzz.dev@gmail.com" && password === "leo1234512345") {
      (req.session as any).user = { email: "leozzz.dev@gmail.com", id: "admin" };
      req.session.save((err) => {
        if (err) {
          console.error("Session save error:", err);
          return res.status(500).json({ message: "Session error" });
        }
        res.json({ message: "Logged in", user: (req.session as any).user });
      });
      return;
    }
    res.status(401).json({ message: "Invalid credentials" });
  });
}
