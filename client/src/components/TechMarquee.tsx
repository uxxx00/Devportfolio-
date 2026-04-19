import { SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiTailwindcss, SiNextdotjs, SiPython, SiDocker, SiGit, SiAmazon, SiFigma, SiVercel } from "react-icons/si";

const technologies = [
  { icon: SiReact, name: "React" },
  { icon: SiTypescript, name: "TypeScript" },
  { icon: SiNodedotjs, name: "Node.js" },
  { icon: SiPostgresql, name: "PostgreSQL" },
  { icon: SiTailwindcss, name: "Tailwind" },
  { icon: SiNextdotjs, name: "Next.js" },
  { icon: SiPython, name: "Python" },
  { icon: SiDocker, name: "Docker" },
  { icon: SiGit, name: "Git" },
  { icon: SiAmazon, name: "AWS" },
  { icon: SiFigma, name: "Figma" },
  { icon: SiVercel, name: "Vercel" },
];

export function TechMarquee() {
  return (
    <div className="relative overflow-hidden py-8 border-y border-white/5">
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex animate-marquee">
        {[...technologies, ...technologies].map((tech, i) => (
          <div 
            key={i} 
            className="flex items-center gap-3 mx-8 px-6 py-3 rounded-full bg-white/5 border border-white/5 whitespace-nowrap"
          >
            <tech.icon className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">{tech.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
