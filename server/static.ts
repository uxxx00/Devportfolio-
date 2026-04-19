import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "..", "dist", "public");
  if (!fs.existsSync(distPath)) {
    return; // Don't crash if dist doesn't exist yet
  }

  app.use(express.static(distPath));

app.use(express.static(distPath));
  
  // fall through to index.html if the file doesn't exist
  app.get("(.*)", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
