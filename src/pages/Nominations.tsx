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
      <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-10 max-w-7xl">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-[var(--gradient-card)] border border-primary/10 p-6 sm:p-10 md:p-12 mb-6 sm:mb-8 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-[box-shadow] duration-300">
          <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:radial-gradient(white,transparent_85%)]" />
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative">
            <div className="flex items-start justify-between flex-wrap gap-6">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-primary/10 rounded-xl">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                    Request Feedback
                  </h1>
                </div>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Grow through insights. Invite colleagues and peers to share feedback that powers your development journey.
                </p>
              </div>
              
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button 
                    size="lg" 
                    className="gap-2 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-glow)] transition-[box-shadow,transform] hover:scale-105 duration-300"
                  >
                    <UserPlus className="h-5 w-5" />
                    Send Invitation
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[520px] p-0 gap-0 overflow-hidden">
                  <div className="bg-[var(--gradient-card)] p-6 border-b">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2.5 text-xl">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <UserPlus className="h-5 w-5 text-primary" />
                        </div>
                        Invite for Feedback
                      </DialogTitle>
                      <DialogDescription className="text-base mt-2">
                        Send a feedback request to a colleague or peer. They'll receive a personalized link to provide their insights.
                      </DialogDescription>
                    </DialogHeader>
                  </div>
                  
                  <form onSubmit={handleInvite} className="p-6 space-y-5">
                    <div className="space-y-2.5">
                      <Label htmlFor="name" className="text-sm font-medium">Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2.5">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11"
                      />
                    </div>

                    <div className="space-y-2.5">
                      <Label htmlFor="message" className="text-sm font-medium">
                        Personal Message <span className="text-muted-foreground">(Optional)</span>
                      </Label>
                      <Textarea
                        id="message"
                        placeholder="I'd appreciate your feedback on my recent work and collaboration..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full gap-2 h-11 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] transition-[box-shadow]"
                    >
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
        <Card className="border-primary/10 shadow-[var(--shadow-sm)] overflow-hidden">
          <CardHeader className="bg-[var(--gradient-card)] border-b pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Recent Invitations</CardTitle>
                <CardDescription className="mt-1.5 text-base">
                  Track the status of your feedback requests
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3">
              {recentInvites.map((invite) => (
                <div
                  key={invite.id}
                  className="group flex items-center gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-card hover:bg-accent/50 transition-[var(--transition-smooth)] border border-border hover:border-primary/20 hover:shadow-[var(--shadow-sm)]"
                >
                  <Avatar className="h-12 w-12 sm:h-14 sm:w-14 ring-2 ring-primary/10 group-hover:ring-primary/20 transition-[var(--transition-fast)]">
                    <AvatarImage 
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${invite.email}`}
                      alt={invite.name}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                      {invite.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base sm:text-lg mb-0.5">{invite.name}</p>
                    <p className="text-sm text-muted-foreground truncate">{invite.email}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
                    <div className="text-right hidden md:block">
                      <p className="text-xs text-muted-foreground font-medium">
                        {new Date(invite.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    
                    {invite.status === "completed" ? (
                      <div className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[hsl(var(--success))]/10 text-[hsl(var(--success))] border border-[hsl(var(--success))]/20">
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Completed</span>
                          <span className="sm:hidden">Done</span>
                        </span>
                      </div>
                    ) : (
                      <div className="px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-[hsl(var(--warning))]/10 text-[hsl(var(--warning))] border border-[hsl(var(--warning))]/20">
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          Pending
                        </span>
                      </div>
                    )}
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
