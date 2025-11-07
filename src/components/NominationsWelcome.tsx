import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Sparkles } from "lucide-react";

const NominationsWelcome = () => {
  return (
    <section aria-label="Welcome" className="mb-8">
      <Card className="border-primary/10 bg-gradient-to-br from-background via-background to-accent/5">
        <CardHeader>
          <CardTitle className="text-2xl">Welcome</CardTitle>
          <CardDescription>
            Invite colleagues to share feedback. Their responses will appear on your Feedback Matrix to help guide your growth.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Choose reviewers</p>
                <p className="text-sm text-muted-foreground">Invite peers, managers, or reports who know your work.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">They share feedback</p>
                <p className="text-sm text-muted-foreground">A secure link lets them respond quickly from any device.</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2 rounded-md bg-primary/10 text-primary">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">See insights</p>
                <p className="text-sm text-muted-foreground">Results update your Feedback Matrix in real time.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default NominationsWelcome;
