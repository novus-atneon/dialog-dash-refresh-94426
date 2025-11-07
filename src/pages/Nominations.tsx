import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { UserPlus, Send, CheckCircle2, Clock, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NominationsWelcome from "@/components/NominationsWelcome";

const Nominations = () => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Feedback request sent!",
      description: `An invitation has been sent to ${name || email}`,
    });
    setEmail("");
    setName("");
    setMessage("");
    setOpen(false);
  };

  // Stats removed per design update

  const recentInvites = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", status: "pending", date: "2024-01-15", avatar: "SJ" },
    { id: 2, name: "Michael Chen", email: "michael@example.com", status: "completed", date: "2024-01-14", avatar: "MC" },
    { id: 3, name: "Emily Davis", email: "emily@example.com", status: "pending", date: "2024-01-13", avatar: "ED" },
    { id: 4, name: "Alex Thompson", email: "alex@example.com", status: "completed", date: "2024-01-12", avatar: "AT" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 md:p-12 mb-8">
          <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(white,transparent_85%)]" />
          <div className="relative">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Request Feedback
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl">
                  Grow through insights. Invite colleagues and peers to share feedback that powers your development journey.
                </p>
              </div>
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="gap-2 shadow-lg hover:shadow-xl transition-shadow">
                    <UserPlus className="h-5 w-5" />
                    Send Invitation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <UserPlus className="h-5 w-5 text-primary" />
                      Invite for Feedback
                    </DialogTitle>
                    <DialogDescription>
                      Send a feedback request to a colleague or peer. They'll receive a personalized link to provide their insights.
                    </DialogDescription>
                  </DialogHeader>
                  
                  <form onSubmit={handleInvite} className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Personal Message (Optional)</Label>
                      <Textarea
                        id="message"
                        placeholder="I'd appreciate your feedback on my recent work and collaboration..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                      />
                    </div>

                    <Button type="submit" className="w-full gap-2">
                      <Send className="h-4 w-4" />
                      Send Invitation
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Welcome Section */}
        <NominationsWelcome />

        {/* Recent Invitations */}
        <Card className="border-primary/10">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Recent Invitations</CardTitle>
                <CardDescription className="mt-2">
                  Track the status of your feedback requests
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {recentInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors border border-border/50"
                >
                  <Avatar className="h-14 w-14 ring-2 ring-background">
                    <AvatarImage 
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${invite.email}`}
                      alt={invite.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {invite.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base">{invite.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{invite.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm text-muted-foreground">
                        {new Date(invite.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    <div className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                      invite.status === "completed" 
                        ? "bg-green-500/10 text-green-700 dark:text-green-400 border border-green-500/20"
                        : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border border-yellow-500/20"
                    }`}>
                      {invite.status === "completed" ? (
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Completed
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Nominations;
