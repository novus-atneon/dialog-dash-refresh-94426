import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Sparkles } from "lucide-react";

const NominationsWelcome = () => {
  return (
    <section aria-label="Welcome" className="mb-6 sm:mb-8">
      <Card className="border-primary/10 bg-[var(--gradient-card)] shadow-[var(--shadow-sm)] overflow-hidden">
        <CardHeader className="space-y-3 pb-4">
          <CardTitle className="text-2xl sm:text-3xl font-bold">Welcome</CardTitle>
          <CardDescription className="text-base">
            Invite colleagues to share feedback. Their responses will appear on your Feedback Matrix to help guide your growth.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-background/50 border border-primary/5 hover:border-primary/10 transition-[var(--transition-fast)]">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-base">Choose reviewers</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Invite peers, managers, or reports who know your work.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-background/50 border border-primary/5 hover:border-primary/10 transition-[var(--transition-fast)]">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-base">They share feedback</p>
                <p className="text-sm text-muted-foreground leading-relaxed">A secure link lets them respond quickly from any device.</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-xl bg-background/50 border border-primary/5 hover:border-primary/10 transition-[var(--transition-fast)]">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                <Sparkles className="h-5 w-5" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-base">See insights</p>
                <p className="text-sm text-muted-foreground leading-relaxed">Results update your Feedback Matrix in real time.</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default NominationsWelcome;
