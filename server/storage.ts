import { db } from "./db";
import {
  projects, posts, messages,
  type Project, type InsertProject,
  type Post, type InsertPost,
  type Message, type InsertMessage
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Posts
  getPosts(): Promise<Post[]>;
  getPost(id: number): Promise<Post | undefined>;
  getPostBySlug(slug: string): Promise<Post | undefined>;
  createPost(post: InsertPost): Promise<Post>;
  updatePost(id: number, post: Partial<InsertPost>): Promise<Post>;
  deletePost(id: number): Promise<void>;

  // Messages
  createMessage(message: InsertMessage): Promise<Message>;
  getMessages(): Promise<Message[]>;
}

export class DatabaseStorage implements IStorage {
  // Projects
  async getProjects(): Promise<Project[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(projects).orderBy(desc(projects.createdAt));
  }

  async getProject(id: number): Promise<Project | undefined> {
    if (!db) throw new Error("Database not available");
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    if (!db) throw new Error("Database not available");
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project> {
    if (!db) throw new Error("Database not available");
    const [updated] = await db
      .update(projects)
      .set(updates)
      .where(eq(projects.id, id))
      .returning();
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    if (!db) throw new Error("Database not available");
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Posts
  async getPosts(): Promise<Post[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPost(id: number): Promise<Post | undefined> {
    if (!db) throw new Error("Database not available");
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    return post;
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    if (!db) throw new Error("Database not available");
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    return post;
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    if (!db) throw new Error("Database not available");
    const [post] = await db.insert(posts).values(insertPost).returning();
    return post;
  }

  async updatePost(id: number, updates: Partial<InsertPost>): Promise<Post> {
    if (!db) throw new Error("Database not available");
    const [updated] = await db
      .update(posts)
      .set(updates)
      .where(eq(posts.id, id))
      .returning();
    return updated;
  }

  async deletePost(id: number): Promise<void> {
    if (!db) throw new Error("Database not available");
    await db.delete(posts).where(eq(posts.id, id));
  }

  // Messages
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    if (!db) throw new Error("Database not available");
    const [message] = await db.insert(messages).values(insertMessage).returning();
    return message;
  }

  async getMessages(): Promise<Message[]> {
    if (!db) throw new Error("Database not available");
    return await db.select().from(messages).orderBy(desc(messages.createdAt));
  }
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private posts: Map<number, Post>;
  private messages: Map<number, Message>;
  private currentId: { [key: string]: number };

  constructor() {
    this.projects = new Map();
    this.posts = new Map();
    this.messages = new Map();
    this.currentId = { projects: 1, posts: 1, messages: 1 };
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.currentId.projects++;
    const project: Project = { 
      ...insertProject, 
      id, 
      createdAt: new Date(), 
      isFeatured: insertProject.isFeatured ?? false,
      language: insertProject.language ?? "en",
      imageUrl: insertProject.imageUrl ?? null,
      githubRepo: insertProject.githubRepo ?? null,
      seeCode: insertProject.seeCode ?? null
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, updates: Partial<InsertProject>): Promise<Project> {
    const project = this.projects.get(id);
    if (!project) throw new Error("Project not found");
    const updated = { 
      ...project, 
      ...updates,
      imageUrl: updates.imageUrl === undefined ? project.imageUrl : (updates.imageUrl ?? null),
      githubRepo: updates.githubRepo === undefined ? project.githubRepo : (updates.githubRepo ?? null),
      seeCode: updates.seeCode === undefined ? project.seeCode : (updates.seeCode ?? null),
      language: updates.language === undefined ? project.language : (updates.language ?? null),
      isFeatured: updates.isFeatured === undefined ? project.isFeatured : (updates.isFeatured ?? null)
    };
    this.projects.set(id, updated);
    return updated;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  async getPosts(): Promise<Post[]> {
    return Array.from(this.posts.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }

  async getPost(id: number): Promise<Post | undefined> {
    return this.posts.get(id);
  }

  async getPostBySlug(slug: string): Promise<Post | undefined> {
    return Array.from(this.posts.values()).find(p => p.slug === slug);
  }

  async createPost(insertPost: InsertPost): Promise<Post> {
    const id = this.currentId.posts++;
    const post: Post = { 
      ...insertPost, 
      id, 
      createdAt: new Date(), 
      publishedAt: insertPost.publishedAt ?? null,
      language: insertPost.language ?? "en"
    };
    this.posts.set(id, post);
    return post;
  }

  async updatePost(id: number, updates: Partial<InsertPost>): Promise<Post> {
    const post = this.posts.get(id);
    if (!post) throw new Error("Post not found");
    const updated = { 
      ...post, 
      ...updates,
      language: updates.language === undefined ? post.language : (updates.language ?? null)
    };
    this.posts.set(id, updated);
    return updated;
  }

  async deletePost(id: number): Promise<void> {
    this.posts.delete(id);
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentId.messages++;
    const message: Message = { ...insertMessage, id, createdAt: new Date() };
    this.messages.set(id, message);
    return message;
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      (b.createdAt?.getTime() || 0) - (a.createdAt?.getTime() || 0)
    );
  }
}

let storage: IStorage;
if (process.env.DATABASE_URL) {
  storage = new DatabaseStorage();
} else {
  storage = new MemStorage();
}

export { storage };
