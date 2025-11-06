import { useState } from "react";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface FeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  employeeName: string;
  onSave: (feedback: string) => void;
  initialFeedback?: string;
}

export const FeedbackDialog = ({
  open,
  onOpenChange,
  employeeName,
  onSave,
  initialFeedback = "",
}: FeedbackDialogProps) => {
  const [feedback, setFeedback] = useState(initialFeedback);

  React.useEffect(() => {
    if (open) {
      setFeedback(initialFeedback);
    }
  }, [open, initialFeedback]);

  const handleSave = () => {
    onSave(feedback);
    setFeedback("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">General Feedback</DialogTitle>
          <DialogDescription>
            Provide open-ended feedback for <strong>{employeeName}</strong>
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="feedback" className="text-base">
              Your Feedback
            </Label>
            <Textarea
              id="feedback"
              placeholder="Share your thoughts, observations, or suggestions..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[200px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              This feedback will help {employeeName.split(" ")[0]} understand their strengths and
              areas for improvement.
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setFeedback("");
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!feedback.trim()}>
            Save Feedback
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
