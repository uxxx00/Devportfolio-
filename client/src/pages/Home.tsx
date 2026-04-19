import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Github, Twitter, Mail, MessageSquare, Settings, Sparkles, Code2, Zap, ExternalLink, ChevronRight, Star, Users, Briefcase, Rocket, CheckCircle2, Trophy } from "lucide-react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@shared/schema";
import { useRef } from "react";
import { TechMarquee } from "@/components/TechMarquee";
import { Testimonials } from "@/components/Testimonials";
import { ProcessSection } from "@/components/ProcessSection";
import { SiTypescript, SiReact, SiNodedotjs, SiNextdotjs, SiTailwindcss, SiPostgresql, SiVite, SiDiscord } from "react-icons/si";
import { ThemeToggle } from "@/components/theme-toggle";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const scaleVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Home() {
  const { data: projects, isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects", "TS"],
    queryFn: async () => {
      const res = await fetch("/api/projects?lang=TS", { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch projects");
      return res.json();
    }
  });
  const featuredProjects = projects?.filter(p => p.isFeatured).slice(0, 3);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <div className="flex flex-col pb-32 overflow-hidden">
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-grid-pattern" />
        <div className="absolute inset-0 bg-radial-gradient" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />
        <div className="hero-glow hero-glow-3" />
        
        <div className="floating-shapes">
          <div className="floating-shape w-32 h-32 rounded-full top-[20%] left-[15%]" style={{ animationDelay: '0s' }} />
          <div className="floating-shape w-20 h-20 rounded-lg top-[60%] left-[10%] rotate-45" style={{ animationDelay: '2s' }} />
          <div className="floating-shape w-16 h-16 rounded-full top-[30%] right-[20%]" style={{ animationDelay: '1s' }} />
          <div className="floating-shape w-24 h-24 rounded-lg bottom-[20%] right-[15%] rotate-12" style={{ animationDelay: '3s' }} />
        </div>
        
        <motion.div 
          style={{ opacity: heroOpacity, y: heroY }}
          className="container relative mx-auto px-6 py-20"
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass mb-10 border border-primary/20"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-primary">Available for hire</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold tracking-tighter mb-8"
            >
              <span className="block gradient-text-static">Creative</span>
              <span className="block text-white">Developer</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed"
            >
              Hi, I'm <span className="text-white font-semibold">Leo</span> — CEO of Orihost.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto"
            >
              Building exceptional digital experiences with modern technologies and creative solutions.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl mx-auto"
            >
              {['TypeScript', 'React', 'Node.js', 'Next.js', 'Tailwind CSS', 'PostgreSQL', 'Discord.js', 'Vite'].map((tech) => (
                <span 
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary/5 border border-primary/10 text-primary/80 hover:bg-primary/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <Button 
                size="lg" 
                asChild 
                className="btn-glow h-14 px-8 rounded-full bg-primary text-primary-foreground font-semibold text-base group"
                data-testid="button-view-work"
              >
                <Link href="/projects">
                  Explore My Work
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="h-14 px-8 rounded-full font-semibold text-base glass border-white/10 hover:border-primary/50 hover:bg-primary/5"
                data-testid="button-contact"
              >
                <Link href="/contact">
                  Let's Talk
                  <ChevronRight className="ml-1 h-5 w-5" />
                </Link>
              </Button>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-8 mb-16"
            >
              {[
                { icon: Briefcase, label: "Years Experience", value: "5+" },
                { icon: Star, label: "Projects Completed", value: "50+" },
                { icon: Users, label: "Happy Clients", value: "30+" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  variants={scaleVariants}
                  className="flex items-center gap-4 px-6 py-4 rounded-2xl glass border border-white/5"
                >
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold stat-number">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex justify-center gap-3"
            >
              {[
                { icon: Github, href: "https://github.com/uxxx00", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Mail, href: "mailto:leozzz.dev@gmail.com", label: "Email" },
                { icon: MessageSquare, href: "https://discord.com/users/leohsmachine", label: "Discord" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="p-4 rounded-2xl glass border border-white/5 hover:border-primary/30 transition-all duration-300 hover:scale-105 group"
                  data-testid={`link-${social.label.toLowerCase()}`}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        <div className="absolute top-8 right-8 z-50">
          <ThemeToggle />
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-muted-foreground/50"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <div className="w-5 h-8 rounded-full border border-muted-foreground/30 flex items-start justify-center p-1">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-primary"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      <TechMarquee />

      <section className="container mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Github className="h-4 w-4" />
              Open Source
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Activity & <span className="gradient-text-static">Statistics</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Consistently contributing to the developer community and building high-performance applications.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Total Stars", value: "150+" },
                { label: "Repositories", value: "45+" },
                { label: "Contributions", value: "1.2k+" },
                { label: "Pull Requests", value: "80+" },
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-2xl glass border border-white/5">
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative group">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative p-8 rounded-3xl glass-strong border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="text-xs text-muted-foreground font-mono">github-contributions.json</div>
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 49 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.01 }}
                    className={`aspect-square rounded-[2px] ${
                      i % 7 === 0 ? 'bg-primary/40' : 
                      i % 3 === 0 ? 'bg-primary/20' : 
                      i % 5 === 0 ? 'bg-primary/60' : 'bg-primary/5'
                    }`}
                  />
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center text-xs text-muted-foreground">
                <span>Less</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 rounded-[2px] bg-primary/5" />
                  <div className="w-3 h-3 rounded-[2px] bg-primary/20" />
                  <div className="w-3 h-3 rounded-[2px] bg-primary/40" />
                  <div className="w-3 h-3 rounded-[2px] bg-primary/60" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-6 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Code2 className="h-4 w-4" />
              Technical Showcase
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Clean Code, <span className="gradient-text-static">Modern Stack</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              I specialize in building scalable applications with a focus on type safety and performance.
            </p>
            <div className="space-y-4">
              {[
                "TypeScript for robust, maintainable code",
                "React & Next.js for high-performance frontends",
                "PostgreSQL & Drizzle for reliable data storage",
                "Tailwind CSS for beautiful, responsive design"
              ].map((text, i) => (
                <div key={i} className="flex items-center gap-3 text-muted-foreground">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                  {text}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full group-hover:bg-primary/20 transition-colors duration-700" />
            <div className="relative p-1 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/5">
              <div className="bg-[#0b0b0b] rounded-xl overflow-hidden shadow-2xl">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
                  <div className="ml-2 text-[10px] font-mono text-muted-foreground/60 tracking-wider uppercase">portfolio-service.ts</div>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/30 select-none">01</span>
                    <span className="text-purple-400">async function</span> <span className="text-blue-400">deploySuccess</span><span className="text-white">(</span><span className="text-orange-300">client</span>: <span className="text-yellow-200">User</span><span className="text-white">) {`{`}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/30 select-none">02</span>
                    <span className="ml-4 text-purple-400">const</span> <span className="text-blue-300">project</span> = <span className="text-purple-400">await</span> <span className="text-blue-400">buildFuture</span><span className="text-white">(</span><span className="text-orange-300">client</span><span className="text-white">);</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/30 select-none">03</span>
                    <span className="ml-4 text-purple-400">if</span> <span className="text-white">(</span><span className="text-blue-300">project</span><span className="text-white">.</span><span className="text-blue-300">isAmazing</span><span className="text-white">) {`{`}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/30 select-none">04</span>
                    <span className="ml-8 text-blue-400">console</span><span className="text-white">.</span><span className="text-blue-300">log</span><span className="text-white">(</span><span className="text-green-300">"Launching 🚀"</span><span className="text-white">);</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/30 select-none">05</span>
                    <span className="ml-8 text-purple-400">return</span> <span className="text-blue-300">project</span><span className="text-white">.</span><span className="text-blue-400">deploy</span><span className="text-white">();</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/30 select-none">06</span>
                    <span className="ml-4 text-white">{`}`}</span>
                  </div>
                  <div className="flex gap-4">
                    <span className="text-muted-foreground/30 select-none">07</span>
                    <span className="text-white">{`}`}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <Zap className="h-4 w-4" />
              Expertise
            </div>
            <h2 className="text-4xl font-display font-bold mb-4">Technical <span className="gradient-text-static">Proficiency</span></h2>
            <p className="text-muted-foreground">Deep dive into my core technical skills and specialization areas.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
            {[
              { name: "TypeScript / JavaScript", level: 95, icon: SiTypescript },
              { name: "React / Next.js", level: 90, icon: SiReact },
              { name: "Node.js / Express", level: 85, icon: SiNodedotjs },
              { name: "PostgreSQL / Drizzle", level: 80, icon: SiPostgresql },
              { name: "Tailwind CSS", level: 95, icon: SiTailwindcss },
              { name: "Discord.js", level: 90, icon: SiDiscord },
            ].map((skill, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <skill.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="font-medium text-white/90">{skill.name}</span>
                  </div>
                  <span className="text-sm font-mono text-primary/70">{skill.level}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 + i * 0.1 }}
                    className="h-full bg-gradient-to-r from-primary/40 to-primary rounded-full relative"
                  >
                    <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32" id="projects-section">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
            >
              <Sparkles className="h-4 w-4" />
              Featured Work
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
              <span className="gradient-text-static">Selected</span> Projects
            </h2>
            <p className="text-xl text-muted-foreground">Crafting digital experiences that leave lasting impressions.</p>
          </div>
          <Button variant="ghost" asChild className="group text-base px-6 py-3 rounded-full border border-white/10 hover:border-primary/30 hover:bg-primary/5" data-testid="button-see-all-projects">
            <Link href="/projects">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[450px] rounded-3xl animate-shimmer" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {featuredProjects?.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
            {(!featuredProjects || featuredProjects.length === 0) && (
              <motion.div 
                variants={scaleVariants}
                className="col-span-full py-32 text-center rounded-3xl glass-strong border border-white/5"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Code2 className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">No projects yet</h3>
                <p className="text-muted-foreground">Check back soon for new work.</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </section>

      <section className="container mx-auto px-6 py-32 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <CheckCircle2 className="h-4 w-4" />
            Accolades
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Recognitions & <span className="gradient-text-static">Awards</span></h2>
          <p className="text-muted-foreground">Milestones achieved through consistent dedication and technical excellence.</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Top Rated Plus", org: "Freelance Platform", year: "2024", icon: Trophy },
            { title: "Project of the Year", org: "Orihost Cloud", year: "2023", icon: Star },
            { title: "Open Source Contributor", org: "GitHub Community", year: "2022", icon: Github },
          ].map((award, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl glass-strong border border-white/5 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="p-3 rounded-xl bg-primary/10 w-fit mb-6 group-hover:scale-110 transition-transform">
                <award.icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xs font-semibold text-primary/60 uppercase tracking-widest">{award.year}</span>
              <h3 className="text-xl font-bold mt-2 mb-1">{award.title}</h3>
              <p className="text-sm text-muted-foreground">{award.org}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <ProcessSection />

      <section className="container mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Briefcase className="h-4 w-4" />
            Experience
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
            Professional <span className="gradient-text-static">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A history of building impactful solutions and leading technical teams.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent -translate-x-1/2 hidden md:block" />
          
          {[
            {
              title: "CEO & Founder",
              company: "Orihost",
              period: "2023 - Present",
              description: "Leading the vision and technical strategy for high-performance hosting solutions.",
              icon: Rocket
            },
            {
              title: "Senior Full Stack Developer",
              company: "Freelance",
              period: "2021 - 2023",
              description: "Developed complex web applications and custom Discord integrations for global clients.",
              icon: Code2
            },
            {
              title: "Web Developer",
              company: "Tech Solutions",
              period: "2019 - 2021",
              description: "Focused on frontend performance and interactive user experiences using React.",
              icon: Terminal
            }
          ].map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative mb-12 md:mb-24 flex flex-col md:flex-row items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full glass-strong border border-primary/30 items-center justify-center z-10 bg-background">
                <exp.icon className="h-5 w-5 text-primary" />
              </div>
              
              <div className="w-full md:w-[45%]">
                <div className="p-8 rounded-3xl glass-strong border border-white/5 hover:border-primary/20 transition-all duration-300 card-hover-effect">
                  <div className="flex items-center gap-3 mb-4 md:hidden">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <exp.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm font-semibold text-primary">{exp.period}</span>
                  </div>
                  <span className="hidden md:block text-sm font-semibold text-primary mb-2">{exp.period}</span>
                  <h3 className="text-2xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-muted-foreground font-medium mb-4">{exp.company}</p>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-6 py-32">
        <div className="relative rounded-[2.5rem] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
          <div className="absolute inset-0 bg-grid-pattern opacity-50" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
          
          <div className="relative p-12 md:p-20 border border-white/5 rounded-[2.5rem]">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
                <Zap className="h-4 w-4" />
                Services
              </div>
              <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
                What I <span className="gradient-text-static">Offer</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Professional solutions tailored to bring your vision to life.</p>
            </motion.div>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  title: "Web Development",
                  price: "15",
                  currency: "EUR",
                  description: "Modern, responsive websites built with cutting-edge technology.",
                  features: ["Responsive design", "Modern frameworks", "SEO optimization", "Performance focused"],
                  notIncluded: ["Domain"],
                  icon: Terminal,
                  popular: true
                },
                {
                  title: "Discord Bots",
                  price: "3",
                  currency: "EUR",
                  description: "Custom bots to automate and enhance your Discord server.",
                  features: ["Custom commands", "Advanced automation", "Priority Support", "Hosting included"],
                  notIncluded: ["Web Dashboard"],
                  icon: MessageSquare,
                  popular: false
                },
                {
                  title: "Installation",
                  price: "3",
                  currency: "EUR",
                  description: "Complete setup and configuration of software solutions.",
                  features: ["Full installation", "Configuration", "Security setup", "Testing"],
                  notIncluded: ["VPS", "Maintenance"],
                  icon: Settings,
                  popular: false
                }
              ].map((service, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className={`group relative p-8 rounded-3xl glass-strong border transition-all duration-500 flex flex-col h-full card-hover-effect ${
                    service.popular 
                      ? 'border-primary/30 bg-gradient-to-b from-primary/5 to-transparent' 
                      : 'border-white/5 hover:border-primary/20'
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      Most Popular
                    </div>
                  )}
                  
                  <div className={`p-4 rounded-2xl w-fit mb-6 transition-colors ${
                    service.popular ? 'bg-primary/20' : 'bg-white/5 group-hover:bg-primary/10'
                  }`}>
                    <service.icon className={`h-7 w-7 ${service.popular ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'} transition-colors`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{service.description}</p>
                  
                  <div className="space-y-6 mb-8 flex-1">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-primary/80 mb-3">Included</div>
                      <ul className="space-y-2.5">
                        {service.features.map((f, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm">
                            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                            <span className="text-muted-foreground">{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/50 mb-3">Not Included</div>
                      <ul className="space-y-2.5">
                        {service.notIncluded.map((f, j) => (
                          <li key={j} className="flex items-center gap-3 text-sm text-muted-foreground/50">
                            <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="flex items-baseline gap-1 mb-5">
                      <span className="text-sm text-muted-foreground">from</span>
                      <span className="text-4xl font-bold stat-number">{service.price}</span>
                      <span className="text-lg text-muted-foreground">{service.currency}</span>
                    </div>
                    <Button 
                      className={`w-full rounded-xl font-semibold h-12 ${
                        service.popular 
                          ? 'btn-glow' 
                          : 'bg-white/5 hover:bg-primary hover:text-primary-foreground border border-white/10'
                      }`}
                      variant={service.popular ? "default" : "ghost"}
                      data-testid={`button-service-${i}`}
                    >
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-32 border-t border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <Users className="h-4 w-4" />
            Partnerships
          </div>
          <h2 className="text-4xl font-display font-bold mb-4">Trusted By <span className="gradient-text-static">Industry Leaders</span></h2>
          <p className="text-muted-foreground">Collaborating with innovative companies to build world-class solutions.</p>
        </motion.div>

        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {['Orihost', 'TechFlow', 'CloudNine', 'DevPulse', 'StreamLine'].map((brand, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-2xl font-display font-bold tracking-tighter hover:text-primary transition-colors cursor-default"
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="container mx-auto px-6 py-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative rounded-[2.5rem] p-12 md:p-20 text-center overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-500/20 to-primary/20 animate-gradient-shift" style={{ backgroundSize: '200% 100%' }} />
          <div className="absolute inset-0 glass-strong" />
          <div className="absolute inset-0 border border-white/10 rounded-[2.5rem]" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Let's Build Something <span className="gradient-text">Amazing</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's discuss how we can work together.
            </p>
            <Button 
              size="lg" 
              asChild 
              className="btn-glow h-14 px-10 rounded-full bg-primary text-primary-foreground font-semibold text-base"
              data-testid="button-cta-contact"
            >
              <Link href="/contact">
                Start a Conversation
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
