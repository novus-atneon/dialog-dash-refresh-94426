import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus, Trophy, Calendar } from "lucide-react";

const Nominations = () => {
  // Mock nominations data
  const nominations = [
    {
      id: 1,
      nominee: "Sarah Johnson",
      nominator: "Michael Chen",
      category: "Leadership Excellence",
      date: "2024-01-15",
      status: "pending",
      description: "Outstanding leadership during Q4 project delivery"
    },
    {
      id: 2,
      nominee: "Alex Thompson",
      nominator: "Emily Davis",
      category: "Innovation Award",
      date: "2024-01-14",
      status: "approved",
      description: "Developed innovative solution for customer onboarding"
    },
    {
      id: 3,
      nominee: "Jordan Lee",
      nominator: "Sarah Johnson",
      category: "Team Player",
      date: "2024-01-13",
      status: "pending",
      description: "Consistently goes above and beyond to help team members"
    }
  ];

  const getStatusColor = (status: string) => {
    return status === "approved" ? "bg-green-500/10 text-green-700 dark:text-green-400" : 
           status === "pending" ? "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400" : 
           "bg-gray-500/10 text-gray-700 dark:text-gray-400";
  };

  return (
    <div className="container mx-auto p-8 max-w-7xl">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Nominations
          </h1>
          <p className="text-muted-foreground">
            Recognize and celebrate outstanding contributions
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          New Nomination
        </Button>
      </div>

      <div className="grid gap-6">
        {nominations.map((nomination) => (
          <Card key={nomination.id} className="hover:shadow-lg transition-all duration-200 border-border/50">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/10">
                    <AvatarImage 
                      src={`https://api.dicebear.com/9.x/notionists/svg?seed=${nomination.nominee}`} 
                      alt={nomination.nominee}
                    />
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {nomination.nominee.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg mb-1">{nomination.nominee}</CardTitle>
                    <CardDescription className="flex items-center gap-2 text-xs">
                      <span>Nominated by {nomination.nominator}</span>
                      <span className="text-border">•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(nomination.date).toLocaleDateString()}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="secondary" className={getStatusColor(nomination.status)}>
                  {nomination.status.charAt(0).toUpperCase() + nomination.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <Trophy className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-semibold text-sm mb-1.5 text-foreground">{nomination.category}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{nomination.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Nominations;
