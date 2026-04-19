import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { setupAuth, registerAuthRoutes, isAuthenticated } from "./replit_integrations/auth";
import { z } from "zod";

interface AuthRequest extends Request {
  user?: any;
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Auth Setup
  setupAuth(app);
  registerAuthRoutes(app);

  // === Projects ===
  app.get(api.projects.list.path, async (req, res) => {
    try {
      const lang = req.query.lang as string;
      const projects = await storage.getProjects();
      const filtered = lang ? projects.filter(p => p.language === lang) : projects;
      res.json(filtered);
    } catch (err) {
      console.error("Error getting projects:", err);
      res.status(500).json({ message: "Error getting projects" });
    }
  });

  app.get(api.projects.get.path, async (req, res) => {
    try {
      const project = await storage.getProject(Number(req.params.id));
      if (!project) return res.status(404).json({ message: "Project not found" });
      res.json(project);
    } catch (err) {
      console.error("Error getting project:", err);
      res.status(500).json({ message: "Error getting project" });
    }
  });

  app.post(api.projects.create.path, isAuthenticated, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      const isAdmin = (user?.claims?.email === "leozzz.dev@gmail.com") || ((req.session as any)?.user?.email === "leozzz.dev@gmail.com");
      if (!isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admin access only for leozzz.dev@gmail.com" });
      }
      const input = api.projects.create.input.parse(req.body);
      const project = await storage.createProject(input);
      res.status(201).json(project);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put(api.projects.update.path, isAuthenticated, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      const isAdmin = (user?.claims?.email === "leozzz.dev@gmail.com") || ((req.session as any)?.user?.email === "leozzz.dev@gmail.com");
      if (!isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admin access only for leozzz.dev@gmail.com" });
      }
      const input = api.projects.update.input.parse(req.body);
      const updated = await storage.updateProject(Number(req.params.id), input);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.projects.delete.path, isAuthenticated, async (req: AuthRequest, res) => {
    const user = req.user;
    const isAdmin = (user?.claims?.email === "leozzz.dev@gmail.com") || ((req.session as any)?.user?.email === "leozzz.dev@gmail.com");
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access only for leozzz.dev@gmail.com" });
    }
    await storage.deleteProject(Number(req.params.id));
    res.status(204).send();
  });


  // === Posts ===
  app.get(api.posts.list.path, async (req, res) => {
    try {
      const lang = req.query.lang as string;
      const posts = await storage.getPosts();
      const filtered = lang ? posts.filter(p => p.language === lang) : posts;
      res.json(filtered);
    } catch (err) {
      console.error("Error getting posts:", err);
      res.status(500).json({ message: "Error getting posts" });
    }
  });

  app.get(api.posts.getBySlug.path, async (req, res) => {
    try {
      const slug = req.params.slug as string;
      const post = await storage.getPostBySlug(slug);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (err) {
      console.error("Error getting post:", err);
      res.status(500).json({ message: "Error getting post" });
    }
  });

  app.post(api.posts.create.path, isAuthenticated, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      const isAdmin = (user?.claims?.email === "leozzz.dev@gmail.com") || ((req.session as any)?.user?.email === "leozzz.dev@gmail.com");
      if (!isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admin access only for leozzz.dev@gmail.com" });
      }
      // Fix date coercion
      const input = api.posts.create.input.extend({
        publishedAt: z.preprocess((arg) => {
          if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
        }, z.date().optional()),
      }).parse(req.body);
      const post = await storage.createPost(input as any);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put(api.posts.update.path, isAuthenticated, async (req: AuthRequest, res) => {
    try {
      const user = req.user;
      const isAdmin = (user?.claims?.email === "leozzz.dev@gmail.com") || ((req.session as any)?.user?.email === "leozzz.dev@gmail.com");
      if (!isAdmin) {
        return res.status(403).json({ message: "Forbidden: Admin access only for leozzz.dev@gmail.com" });
      }
      // Fix date coercion
      const input = api.posts.update.input.extend({
        publishedAt: z.preprocess((arg) => {
          if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
        }, z.date().optional()),
      }).parse(req.body);
      const updated = await storage.updatePost(Number(req.params.id), input as any);
      res.json(updated);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete(api.posts.delete.path, isAuthenticated, async (req: AuthRequest, res) => {
    const user = req.user;
    const isAdmin = (user?.claims?.email === "leozzz.dev@gmail.com") || ((req.session as any)?.user?.email === "leozzz.dev@gmail.com");
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access only for leozzz.dev@gmail.com" });
    }
    await storage.deletePost(Number(req.params.id));
    res.status(204).send();
  });


  // === Messages ===
  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
       if (err instanceof z.ZodError) {
          return res.status(400).json({
            message: err.errors[0].message,
            field: err.errors[0].path.join('.'),
          });
        }
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get(api.messages.list.path, isAuthenticated, async (req: AuthRequest, res) => {
    const user = req.user;
    const isAdmin = (user?.claims?.email === "leozzz.dev@gmail.com") || ((req.session as any)?.user?.email === "leozzz.dev@gmail.com");
    if (!isAdmin) {
      return res.status(403).json({ message: "Forbidden: Admin access only for leozzz.dev@gmail.com" });
    }
    const messages = await storage.getMessages();
    res.json(messages);
  });

  // Seed Data
  try {
    seedDatabase();
  } catch (err) {
    console.error("Seeding failed:", err);
  }

  return httpServer;
}

async function seedDatabase() {
  try {
    // Clear projects and posts seed data as requested
    const existingProjects = await storage.getProjects();
    if (existingProjects.length > 0) {
      // Delete all existing projects to start with 0
      for (const project of existingProjects) {
        await storage.deleteProject(project.id);
      }
    }

    const existingPosts = await storage.getPosts();
    if (existingPosts.length === 0) {
      await storage.createPost({
        title: "Hello World",
        slug: "hello-world",
        content: "This is the first post on my new portfolio.",
        publishedAt: new Date()
      });
    }
  } catch (err) {
    console.error("Seed database error:", err);
  }
}
