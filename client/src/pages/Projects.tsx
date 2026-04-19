import { useProjects } from "@/hooks/use-projects";
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import { Code2, Sparkles, Globe } from "lucide-react";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      
      <div className="container relative mx-auto px-6 py-20 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-12"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="h-4 w-4" />
            Portfolio
          </motion.div>
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-6">
            My <span className="gradient-text-static">Projects</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            A collection of experiments, products, and open-source contributions I've worked on. Each project represents a unique challenge solved with creativity and code.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[450px] rounded-3xl animate-shimmer" />
            ))}
          </div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects?.map((project, index) => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} index={index} />
              </motion.div>
            ))}
            {projects?.length === 0 && (
              <motion.div 
                variants={itemVariants}
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
      </div>
    </div>
  );
}
