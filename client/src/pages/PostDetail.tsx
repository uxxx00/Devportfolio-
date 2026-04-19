import { usePostBySlug } from "@/hooks/use-posts";
import { useRoute } from "wouter";
import { format } from "date-fns";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function PostDetail() {
  const [, params] = useRoute("/blog/:slug");
  const slug = params?.slug || "";
  const { data: post, isLoading } = usePostBySlug(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 max-w-3xl">
        <div className="h-8 w-24 bg-secondary/50 rounded mb-8 animate-pulse" />
        <div className="h-12 w-3/4 bg-secondary/50 rounded mb-4 animate-pulse" />
        <div className="h-6 w-1/4 bg-secondary/50 rounded mb-12 animate-pulse" />
        <div className="space-y-4">
          <div className="h-4 w-full bg-secondary/30 rounded animate-pulse" />
          <div className="h-4 w-full bg-secondary/30 rounded animate-pulse" />
          <div className="h-4 w-2/3 bg-secondary/30 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        <Button asChild>
          <Link href="/blog">Back to Journal</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container mx-auto px-4 py-16 md:py-24 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Journal
      </Link>

      <header className="mb-12">
        <h1 className="font-display font-bold text-3xl md:text-5xl mb-6 leading-tight">
          {post.title}
        </h1>
        {post.publishedAt && (
          <time className="text-muted-foreground font-mono text-sm">
            {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
          </time>
        )}
      </header>

      <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-lg prose-p:text-muted-foreground prose-p:leading-relaxed">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}
