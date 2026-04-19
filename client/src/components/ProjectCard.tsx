import { type Project } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Card 
      className="group h-full overflow-hidden rounded-3xl bg-card/50 border border-white/5 hover:border-primary/30 transition-all duration-500 card-hover-effect glow-card"
      data-testid={`card-project-${project.id}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-muted/50 to-muted/20">
        {project.imageUrl ? (
          <>
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent opacity-60" />
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-purple-500/5">
            <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10">
              <span className="font-mono text-2xl text-muted-foreground/30">{project.title.charAt(0)}</span>
            </div>
          </div>
        )}
        
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {project.seeCode && (
            <a 
              href={project.seeCode} 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 hover:bg-primary hover:border-primary transition-colors"
              title="View Code"
            >
              <Github className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display font-bold text-xl leading-tight group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <ArrowUpRight className="h-5 w-5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all flex-shrink-0" />
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          <Badge variant="secondary" className="rounded-lg bg-primary/10 border-primary/20 text-primary text-xs font-medium">
            {project.language}
          </Badge>
          {project.githubRepo && <Badge variant="secondary" className="rounded-lg bg-white/5 border-0 text-xs font-medium">Open Source</Badge>}
        </div>
      </div>
    </Card>
  );
}
