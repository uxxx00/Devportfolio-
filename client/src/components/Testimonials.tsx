import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Alex Johnson",
    role: "CEO, TechStart",
    content: "Leo delivered an exceptional website that exceeded our expectations. His attention to detail and technical expertise made the entire process smooth and enjoyable.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Founder, DesignLab",
    content: "Working with Leo was a fantastic experience. He understood our vision perfectly and transformed it into a beautiful, functional product.",
    rating: 5,
  },
  {
    name: "Marcus Williams",
    role: "CTO, DataFlow",
    content: "Incredibly talented developer with a keen eye for design. The Discord bot he built for our community works flawlessly and our members love it.",
    rating: 5,
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

export function Testimonials() {
  return (
    <section className="container mx-auto px-6 py-32">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
          <Star className="h-4 w-4" />
          Testimonials
        </div>
        <h2 className="text-4xl md:text-6xl font-display font-bold mb-4">
          What <span className="gradient-text-static">Clients</span> Say
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Don't just take my word for it — hear from some of the amazing people I've worked with.
        </p>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid md:grid-cols-3 gap-6"
      >
        {testimonials.map((testimonial, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            className="group relative p-8 rounded-3xl glass-strong border border-white/5 hover:border-primary/20 transition-all duration-300 card-hover-effect"
          >
            <Quote className="absolute top-6 right-6 h-8 w-8 text-primary/10" />
            
            <div className="flex gap-1 mb-6">
              {Array.from({ length: testimonial.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-primary text-primary" />
              ))}
            </div>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              "{testimonial.content}"
            </p>
            
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
