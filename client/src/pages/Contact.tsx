import { useCreateMessage } from "@/hooks/use-messages";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Send, ArrowRight, Sparkles, Clock, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Contact() {
  const { mutate, isPending } = useCreateMessage();
  
  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  function onSubmit(data: InsertMessage) {
    mutate(data, {
      onSuccess: () => form.reset()
    });
  }

  return (
    <div className="min-h-screen">
      <div className="absolute inset-0 bg-grid-pattern opacity-50" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]" />
      
      <div className="container relative mx-auto px-6 py-20 md:py-32">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl mx-auto text-center mb-16"
        >
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 text-primary text-sm font-medium mb-4 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <MessageSquare className="h-4 w-4" />
            Get in Touch
          </motion.div>
          <motion.h1 variants={itemVariants} className="font-display font-bold text-4xl md:text-6xl mb-6">
            Let's <span className="gradient-text-static">Connect</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl text-muted-foreground">
            Have a project in mind? I'd love to hear about it and discuss how we can work together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { icon: Mail, title: "Email", value: "leozzz.dev@gmail.com", href: "mailto:leozzz.dev@gmail.com", subtitle: "Drop me a line anytime" },
              { icon: MessageSquare, title: "Discord", value: "leohsmachine", href: "https://discord.com/users/leohsmachine", subtitle: "Let's chat on Discord" },
              { icon: MapPin, title: "Location", value: "Pristine Kosovo", subtitle: "Available worldwide" },
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group p-6 rounded-2xl glass-strong border border-white/5 hover:border-primary/20 transition-all duration-300"
              >
                {item.href ? (
                  <a href={item.href} className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                      <p className="font-semibold text-lg mb-1">{item.value}</p>
                      <p className="text-sm text-muted-foreground/60">{item.subtitle}</p>
                    </div>
                  </a>
                ) : (
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{item.title}</p>
                      <p className="font-semibold text-lg mb-1">{item.value}</p>
                      <p className="text-sm text-muted-foreground/60">{item.subtitle}</p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="relative p-8 md:p-10 rounded-3xl glass-strong border border-white/5 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-[80px]" />
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="relative space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your name" 
                              {...field} 
                              className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-colors"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="you@example.com" 
                              type="email" 
                              {...field} 
                              className="h-12 bg-white/5 border-white/10 rounded-xl focus:border-primary/50 focus:ring-primary/20 transition-colors"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell me about your project, goals, and timeline..." 
                            className="min-h-[180px] bg-white/5 border-white/10 rounded-xl resize-none focus:border-primary/50 focus:ring-primary/20 transition-colors" 
                            {...field}
                            data-testid="input-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full h-14 rounded-xl btn-glow font-semibold text-base" 
                    disabled={isPending}
                    data-testid="button-submit"
                  >
                    {isPending ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
