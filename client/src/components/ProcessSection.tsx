import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, Code, Rocket, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Discovery",
    description: "We start with a conversation to understand your goals, vision, and requirements.",
    number: "01",
  },
  {
    icon: Lightbulb,
    title: "Strategy",
    description: "I create a detailed plan and design concept tailored to your specific needs.",
    number: "02",
  },
  {
    icon: Code,
    title: "Development",
    description: "Building your project with clean code, modern technologies, and best practices.",
    number: "03",
  },
  {
    icon: Rocket,
    title: "Launch",
    description: "Deploying your project and ensuring everything runs smoothly in production.",
    number: "04",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function ProcessSection() {
  return (
    <section className="container mx-auto px-6 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-20"
      >
        <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Lightbulb className="h-4 w-4" />
          Process
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          How I <span className="gradient-text-static">Work</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A streamlined process designed to bring your ideas to life efficiently and effectively.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative"
      >
        <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-y-1/2" />
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative"
            >
              <div className="relative p-8 rounded-3xl glass-strong border border-white/5 hover:border-primary/20 transition-all duration-300 h-full">
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center font-mono text-sm text-primary font-bold">
                  {step.number}
                </div>
                
                <div className="p-4 rounded-2xl bg-primary/10 w-fit mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
              
              {i < steps.length - 1 && (
                <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight className="h-5 w-5 text-primary/30" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
