import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";
import { useProjects, useDeleteProject } from "@/hooks/use-projects";
import { usePosts, useDeletePost } from "@/hooks/use-posts";
import { useMessages } from "@/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Trash2, Edit, ExternalLink, MessageSquare, Layout, FileText, Settings, LogOut, Globe } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import ProjectDialog from "./ProjectDialog";
import PostDialog from "./PostDialog";
import { useState } from "react";

export default function AdminDashboard() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [, setLocation] = useLocation();

  const isAdmin = user?.email === "leozzz.dev@gmail.com";

  // Re-fetch data when language changes if needed, but for admin we show all
  const { data: projects } = useProjects();
  const { data: posts } = usePosts();
  const { data: messages } = useMessages();
  
  const deleteProject = useDeleteProject();
  const deletePost = useDeletePost();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      setLocation("/login");
    }
  }, [user, isAuthLoading, setLocation]);

  if (isAuthLoading || !user) return null;

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4 font-display">Access Denied</h1>
        <p className="text-muted-foreground mb-8">This admin panel is restricted to authorized users only.</p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold font-display tracking-tight">Admin Control Center</h1>
          <p className="text-muted-foreground mt-1">Manage your professional portfolio and content.</p>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground" asChild>
          <a href="/api/logout" className="flex items-center gap-2">
            <LogOut className="h-4 w-4" /> Logout
          </a>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <Card className="hover-elevate transition-all border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Portfolio</CardTitle>
            <Layout className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{projects?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Active projects</p>
          </CardContent>
        </Card>
        <Card className="hover-elevate transition-all border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Journal</CardTitle>
            <FileText className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{posts?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">Published articles</p>
          </CardContent>
        </Card>
        <Card className="hover-elevate transition-all border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{messages?.length || 0}</div>
            <p className="text-xs text-muted-foreground mt-1">New submissions</p>
          </CardContent>
        </Card>
        <Card className="hover-elevate transition-all border-l-4 border-l-amber-500">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Status</CardTitle>
            <Settings className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-500">Online</div>
            <p className="text-xs text-muted-foreground mt-1">System healthy</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-xl">
          <TabsTrigger value="projects" className="rounded-lg data-[state=active]:bg-background px-6">Projects</TabsTrigger>
          <TabsTrigger value="posts" className="rounded-lg data-[state=active]:bg-background px-6">Posts</TabsTrigger>
          <TabsTrigger value="messages" className="rounded-lg data-[state=active]:bg-background px-6">Messages</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4 outline-none">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Projects</h2>
            <ProjectDialog>
              <Button className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" /> Add New Project
              </Button>
            </ProjectDialog>
          </div>
          
          <Card className="border-none shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Project Details</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Links</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects?.map((project) => (
                  <TableRow key={project.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="font-semibold text-base">{project.title}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[250px]">{project.description}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit font-normal border-primary/20 text-primary bg-primary/5">
                        {project.language}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {project.isFeatured ? (
                        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">Featured</Badge>
                      ) : (
                        <Badge variant="secondary" className="font-normal">Standard</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-3">
                        {project.githubRepo && (
                          <a href={project.githubRepo} target="_blank" rel="noreferrer" title="Github Repository" className="text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                        {project.seeCode && (
                          <a href={project.seeCode} target="_blank" rel="noreferrer" title="View Live" className="text-muted-foreground hover:text-primary transition-colors">
                            <Layout className="h-4 w-4" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <ProjectDialog project={project}>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </ProjectDialog>
                      
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove <span className="font-semibold">{project.title}</span> from your portfolio.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteProject.mutate(project.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete Project
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
                {projects?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <Layout className="h-10 w-10 mb-2 opacity-20" />
                        <p>No projects in your portfolio yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="posts" className="space-y-4 outline-none">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Manage Posts</h2>
            <PostDialog>
              <Button className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" /> Create New Post
              </Button>
            </PostDialog>
          </div>

          <Card className="border-none shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Article</TableHead>
                  <TableHead>Language</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {posts?.map((post) => (
                  <TableRow key={post.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="font-semibold text-base">{post.title}</div>
                      <div className="text-xs text-muted-foreground font-mono">{post.slug}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="flex items-center gap-1 w-fit font-normal border-primary/20 text-primary bg-primary/5">
                        {post.language}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {post.publishedAt ? (
                        <div className="flex flex-col">
                          <Badge className="w-fit bg-green-500/10 text-green-600 border-green-500/20">Published</Badge>
                          <span className="text-[10px] text-muted-foreground mt-1">{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
                        </div>
                      ) : (
                        <Badge variant="secondary" className="font-normal">Draft</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right space-x-1">
                      <PostDialog post={post}>
                        <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </PostDialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Article?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove the article <span className="font-semibold">{post.title}</span>.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deletePost.mutate(post.id)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                              Delete Post
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
                {posts?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FileText className="h-10 w-10 mb-2 opacity-20" />
                        <p>No blog posts written yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages" className="space-y-4 outline-none">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Contact Inquiries</h2>
            <Badge variant="outline">{messages?.length || 0} Total</Badge>
          </div>
          <Card className="border-none shadow-sm overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead>Sender</TableHead>
                  <TableHead className="w-[400px]">Message Preview</TableHead>
                  <TableHead>Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages?.map((msg) => (
                  <TableRow key={msg.id} className="hover:bg-muted/20 transition-colors">
                    <TableCell>
                      <div className="font-semibold">{msg.name}</div>
                      <div className="text-xs text-muted-foreground">{msg.email}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm line-clamp-2 text-muted-foreground" title={msg.message}>{msg.message}</div>
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {msg.createdAt && format(new Date(msg.createdAt), 'MMM d, HH:mm')}
                    </TableCell>
                  </TableRow>
                ))}
                {messages?.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} className="text-center py-12">
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <MessageSquare className="h-10 w-10 mb-2 opacity-20" />
                        <p>No messages received through your portfolio yet.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
