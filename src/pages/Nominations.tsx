import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Send, Users, MessageSquare, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Nominations = () => {
  const { toast } = useToast();
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
  };

  // Mock recent invitations
  const recentInvites = [
    { id: 1, name: "Sarah Johnson", email: "sarah@example.com", status: "pending", date: "2024-01-15" },
    { id: 2, name: "Michael Chen", email: "michael@example.com", status: "completed", date: "2024-01-14" },
    { id: 3, name: "Emily Davis", email: "emily@example.com", status: "pending", date: "2024-01-13" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto p-6 max-w-7xl">
        <div className="grid lg:grid-cols-[1fr,400px] gap-6">
          {/* Left: Welcome Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">
                Request Feedback
              </h1>
              <p className="text-muted-foreground text-lg">
                Invite colleagues and peers to provide feedback that will appear in your feedback matrix
              </p>
            </div>

            <Card className="border-primary/20 bg-card/50 backdrop-blur">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Send an Invitation</h4>
                    <p className="text-sm text-muted-foreground">
                      Invite people to provide feedback on your competencies using the form on the right
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">They Provide Feedback</h4>
                    <p className="text-sm text-muted-foreground">
                      Recipients will receive a link to rate your competencies across different areas
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-sm font-bold text-primary">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">View in Matrix</h4>
                    <p className="text-sm text-muted-foreground">
                      All feedback appears in your feedback matrix for comprehensive analysis
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Invitations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Invitations
                </CardTitle>
                <CardDescription>
                  Track the status of your feedback requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentInvites.map((invite) => (
                    <div key={invite.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                      <Avatar className="h-10 w-10">
                        <AvatarImage 
                          src={`https://api.dicebear.com/9.x/notionists/svg?seed=${invite.email}`}
                          alt={invite.name}
                        />
                        <AvatarFallback>{invite.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{invite.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{invite.email}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          invite.status === "completed" 
                            ? "bg-green-500/10 text-green-700 dark:text-green-400"
                            : "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400"
                        }`}>
                          {invite.status}
                        </span>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(invite.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right: Invite Panel */}
          <div className="lg:sticky lg:top-6 h-fit">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Invite for Feedback
                </CardTitle>
                <CardDescription>
                  Send a feedback request to a colleague or peer
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleInvite} className="space-y-4">
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
                      placeholder="I'd appreciate your feedback on my recent work..."
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

                <div className="mt-6 p-4 rounded-lg bg-muted/50">
                  <div className="flex gap-2">
                    <MessageSquare className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium mb-1">What will they receive?</p>
                      <p className="text-xs text-muted-foreground">
                        Recipients will get an email with a personalized link to provide feedback on your competencies. 
                        The process is quick and straightforward.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nominations;
