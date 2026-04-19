import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Menu, Terminal } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const [location] = useLocation();
  const { user, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Journal" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight hover:opacity-80 transition-opacity">
          <Terminal className="h-6 w-6" />
          <span>LEO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                location === link.href ? "text-primary" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated && (
             <Link 
               href="/admin"
               className={cn(
                 "text-sm font-medium transition-colors hover:text-primary",
                 location.startsWith("/admin") ? "text-primary" : "text-muted-foreground"
               )}
             >
               Admin
             </Link>
          )}

          <div className="flex items-center gap-2 border-l pl-6 ml-2">
            <ThemeToggle />
            {!isAuthenticated ? (
              <Button variant="ghost" size="sm" asChild className="hover-elevate">
                <Link href="/login">Login</Link>
              </Button>
            ) : (
              <Button variant="ghost" size="sm" asChild className="hover-elevate">
                <a href="/api/auth/logout">Logout</a>
              </Button>
            )}
          </div>
        </nav>

        {/* Mobile Nav */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 mt-10">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-primary",
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                {isAuthenticated && (
                  <Link
                    href="/admin"
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    Admin
                  </Link>
                )}
                {!isAuthenticated ? (
                  <a 
                    href="/login"
                    className="text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    Login
                  </a>
                ) : (
                  <a 
                    href="/logout"
                    className="text-lg font-medium text-muted-foreground hover:text-primary"
                  >
                    Logout
                  </a>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
