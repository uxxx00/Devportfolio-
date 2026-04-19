import { Github, Twitter, Mail, ArrowUpRight, Heart, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-50" />
      
      <div className="container relative mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-display font-bold text-3xl gradient-text-static">LEO</span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs leading-relaxed">
              Crafting exceptional digital experiences with modern technologies and creative solutions.
            </p>
            
            <div className="flex gap-3 mt-6">
              {[
                { icon: Github, href: "https://github.com/uxxx00", label: "GitHub" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Mail, href: "mailto:leozzz.dev@gmail.com", label: "Email" },
                { icon: MessageSquare, href: "https://discord.com/users/leohsmachine", label: "Discord" },
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href}
                  className="p-3 rounded-xl bg-white/5 hover:bg-primary/10 border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Projects", href: "/projects" },
                { label: "Journal", href: "/journal" },
                { label: "Contact", href: "/contact" },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="text-muted-foreground hover:text-white transition-colors link-underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Services</h4>
            <ul className="space-y-3">
              {[
                "Web Development",
                "Discord Bots",
                "Installation Services",
                "Consulting",
              ].map((service, i) => (
                <li key={i}>
                  <span className="text-muted-foreground hover:text-white transition-colors cursor-default">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Based in Pristina, Kosovo</span>
            <span className="text-white/20">|</span>
            <span>Available Worldwide</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>&copy; {currentYear} Leo</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-3 w-3 text-primary fill-primary" /> & caffeine
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
