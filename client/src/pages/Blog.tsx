import { usePosts } from "@/hooks/use-posts";
import { Link } from "wouter";
import { format } from "date-fns";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2, Sparkles } from "lucide-react";

export default function Blog() {
  const [lang, setLang] = useState<'TS' | 'JS' | 'React'>('TS');
  const { data: posts, isLoading } = usePosts(lang);

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl">
      <div className="mb-16">
        <h1 className="font-display font-bold text-4xl md:text-5xl mb-6">Journal</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Thoughts on software engineering, design, and technology.
        </p>

        <Tabs value={lang} onValueChange={(v) => setLang(v as 'TS' | 'JS' | 'React')} className="w-fit">
          <TabsList className="bg-muted/50 border border-white/5 p-1 rounded-xl">
            <TabsTrigger value="TS" className="flex items-center gap-2 px-6 rounded-lg data-[state=active]:bg-background">
              <Code2 className="h-4 w-4" /> TypeScript
            </TabsTrigger>
            <TabsTrigger value="JS" className="flex items-center gap-2 px-6 rounded-lg data-[state=active]:bg-background">
              <Code2 className="h-4 w-4" /> JavaScript
            </TabsTrigger>
            <TabsTrigger value="React" className="flex items-center gap-2 px-6 rounded-lg data-[state=active]:bg-background">
              <Sparkles className="h-4 w-4" /> React
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-8">
        {isLoading ? (
          [1, 2, 3].map(i => (
            <div key={i} className="h-48 rounded-2xl bg-secondary/30 animate-pulse" />
          ))
        ) : (
          posts?.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card className="hover:bg-secondary/40 transition-colors border-0 shadow-none bg-transparent cursor-pointer group">
                  <CardHeader className="px-0 pt-0 pb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3 font-mono">
                      {post.publishedAt ? format(new Date(post.publishedAt), 'MMMM dd, yyyy') : 'Draft'}
                    </div>
                    <CardTitle className="font-display text-2xl group-hover:text-primary/80 transition-colors">
                      {post.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-6 border-b border-border/50">
                    <p className="text-muted-foreground line-clamp-2">
                      {post.content.substring(0, 150)}...
                    </p>
                    <span className="inline-block mt-4 text-sm font-medium underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary transition-all">
                      Read Article
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))
        )}
        
        {posts?.length === 0 && (
          <div className="py-20 text-center text-muted-foreground">
            No posts found for the selected language.
          </div>
        )}
      </div>
    </div>
  );
}
