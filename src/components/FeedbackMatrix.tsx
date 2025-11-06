import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";
import { EmployeeColumn } from "./EmployeeColumn";
import { CompetencyRow } from "./CompetencyRow";
import { FeedbackDialog } from "./FeedbackDialog";
import { RatingCell } from "./RatingCell";

const employees = [
  {
    id: "1",
    name: "Self-Assessment",
    role: "Your Assessment",
    category: "SELF",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=self",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    role: "VP of Engineering",
    category: "MANAGER",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=sarah&backgroundColor=b6e3f4",
  },
  {
    id: "3",
    name: "Michael Chen",
    role: "Senior Engineer",
    category: "PEER",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=michael&backgroundColor=c0aede",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    role: "Senior Engineer",
    category: "PEER",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=emily&backgroundColor=ffdfbf",
  },
  {
    id: "5",
    name: "David Park",
    role: "Senior Engineer",
    category: "PEER",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=david&backgroundColor=d1d4f9",
  },
  {
    id: "6",
    name: "Jessica Williams",
    role: "Lead Engineer",
    category: "PEER",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=jessica&backgroundColor=ffd5dc",
  },
  {
    id: "7",
    name: "Alex Thompson",
    role: "Software Engineer",
    category: "DIRECT REPORT",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=alex&backgroundColor=c0fbdd",
  },
  {
    id: "8",
    name: "Maria Garcia",
    role: "Software Engineer",
    category: "DIRECT REPORT",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=maria&backgroundColor=b6e3f4",
  },
  {
    id: "9",
    name: "James Wilson",
    role: "Junior Engineer",
    category: "DIRECT REPORT",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=james&backgroundColor=ffdfbf",
  },
  {
    id: "10",
    name: "Lisa Anderson",
    role: "Product Manager",
    category: "STAKEHOLDER",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=lisa&backgroundColor=ffd5dc",
  },
  {
    id: "11",
    name: "Robert Taylor",
    role: "Design Lead",
    category: "STAKEHOLDER",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=robert&backgroundColor=c0aede",
  },
];

const competencies = [
  {
    id: "1",
    name: "Strategic Thinking",
    description: "Ability to think ahead and plan",
    icon: "🎯",
  },
  {
    id: "2",
    name: "Communication",
    description: "Effectiveness in conveying ideas and information",
    icon: "💬",
  },
  {
    id: "3",
    name: "Leadership",
    description: "Capacity to guide and inspire others",
    icon: "👑",
  },
  {
    id: "4",
    name: "Problem Solving",
    description: "Skill in identifying and resolving issues",
    icon: "🧩",
  },
  {
    id: "5",
    name: "Collaboration",
    description: "Ability to work effectively with teams",
    icon: "🤝",
  },
  {
    id: "6",
    name: "Technical Excellence",
    description: "Depth of technical knowledge and expertise",
    icon: "⚡",
  },
  {
    id: "7",
    name: "Innovation",
    description: "Creativity and ability to drive new ideas",
    icon: "💡",
  },
  {
    id: "8",
    name: "Adaptability",
    description: "Flexibility in responding to change",
    icon: "🔄",
  },
];

interface FeedbackMatrixProps {
  is360View: boolean;
}

export const FeedbackMatrix = ({ is360View }: FeedbackMatrixProps) => {
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<Record<string, string>>({});

  const handleFeedbackClick = (employeeId: string) => {
    setSelectedEmployee(employeeId);
    setDialogOpen(true);
  };

  const handleSaveFeedback = (feedback: string) => {
    if (selectedEmployee) {
      const newFeedbackData = { ...feedbackData, [selectedEmployee]: feedback };
      setFeedbackData(newFeedbackData);
      localStorage.setItem("360-feedback", JSON.stringify(newFeedbackData));
    }
    setDialogOpen(false);
  };

  const handleSubmitFeedback = () => {
    const incompleteFeedback = employees.filter(emp => !feedbackData[emp.id]);
    
    if (incompleteFeedback.length === 0) {
      if (confirm("Are you sure you want to submit your feedback?")) {
        console.log("Submitting feedback:", feedbackData);
        localStorage.removeItem("360-feedback");
        setFeedbackData({});
      }
    } else {
      const names = incompleteFeedback.map(emp => emp.name).join(", ");
      alert(`Incomplete feedback for: ${names}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <Card className="bg-gradient-to-r from-primary via-[hsl(273,70%,55%)] to-[hsl(283,70%,60%)] text-primary-foreground p-5 shadow-lg border-0">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="min-w-[200px]">
              <h1 className="text-2xl font-bold mb-1">360° Feedback Matrix</h1>
              <p className="text-sm text-primary-foreground/90">Rate or give feedback to each colleague</p>
            </div>
            <div className="flex gap-4 items-center flex-wrap">
              <div className="text-center">
                <div className="text-xs opacity-90">Progress</div>
                <div className="text-xl font-bold">4/104</div>
              </div>
              <div className="text-center">
                <div className="text-xs opacity-90">Completion</div>
                <div className="text-xl font-bold">4%</div>
              </div>
              <div className="text-center">
                <div className="text-xs opacity-90">Receivers</div>
                <div className="text-xl font-bold">13</div>
              </div>
              <div className="text-center">
                <div className="text-xs opacity-90">Competencies</div>
                <div className="text-xl font-bold">8</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Info Banner */}
        {is360View && (
          <Card className="bg-accent/50 border-accent p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-accent-foreground">ℹ️</div>
              <div className="text-sm text-accent-foreground">
                <strong>How to Provide Feedback:</strong> Rate each competency for yourself and every colleague using the 1-5 star scale (click left half for .5 ratings). Start with your self-assessment, then provide feedback for your colleagues. Colleagues are grouped by relationship type: Self, Manager, Peers, Direct Reports, and Stakeholders.
              </div>
            </div>
          </Card>
        )}

        {/* Content */}
        {is360View ? (
          <Card className="overflow-hidden shadow-lg border-2">
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full">
                {/* Category Header Row */}
                <div className="flex border-b-2">
                  <div className="w-64 sticky left-0 bg-card z-30 border-r shadow-md"></div>
                  {(() => {
                    const categoryColors: Record<string, string> = {
                      'SELF': 'bg-[hsl(263,70%,50%)]',
                      'MANAGER': 'bg-[hsl(273,70%,55%)]',
                      'PEER': 'bg-[hsl(283,70%,60%)]',
                      'DIRECT REPORT': 'bg-[hsl(220,70%,50%)]',
                      'STAKEHOLDER': 'bg-[hsl(200,70%,50%)]',
                    };
                    const categories: { name: string; count: number }[] = [];
                    employees.forEach((emp, idx) => {
                      if (idx === 0 || emp.category !== employees[idx - 1].category) {
                        const count = employees.filter(e => e.category === emp.category).length;
                        categories.push({ name: emp.category, count });
                      }
                    });
                    return categories.map((cat) => (
                      <div
                        key={cat.name}
                        className={`p-3 border-l flex items-center justify-center font-semibold text-sm text-white ${categoryColors[cat.name] || 'bg-primary'}`}
                        style={{ width: `${cat.count * 192}px` }}
                      >
                        {cat.name}
                      </div>
                    ));
                  })()}
                </div>

                {/* Table Header */}
                <div className="flex border-b bg-gradient-to-r from-muted/40 to-muted/20">
                  <div className="w-64 p-4 font-semibold sticky left-0 bg-card z-30 border-r shadow-md">
                    Competency
                  </div>
                  {employees.map((employee, idx) => (
                    <EmployeeColumn
                      key={employee.id}
                      employee={employee}
                      isFirst={idx === 0}
                      previousCategory={idx > 0 ? employees[idx - 1].category : null}
                    />
                  ))}
                </div>

                {/* Competency Rows */}
                {competencies.map((competency) => (
                  <CompetencyRow
                    key={competency.id}
                    competency={competency}
                    employees={employees}
                  />
                ))}

                {/* General Feedback Row */}
                <div className="flex border-t-2 bg-gradient-to-r from-muted/20 to-muted/10">
                  <div className="w-64 p-4 sticky left-0 bg-card z-30 border-r shadow-md">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">💭</span>
                      <div>
                        <div className="font-semibold">General Feedback</div>
                        <div className="text-xs text-muted-foreground">
                          Optional open-ended feedback
                        </div>
                      </div>
                    </div>
                  </div>
                  {employees.map((employee) => (
                    <div
                      key={employee.id}
                      className="w-48 p-4 border-l flex items-center justify-center"
                    >
                      <Button
                        variant={feedbackData[employee.id] ? "default" : "outline"}
                        size="sm"
                        className="w-full transition-all"
                        onClick={() => handleFeedbackClick(employee.id)}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {feedbackData[employee.id] ? "Edit" : "Add"}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className="p-8">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Summary View</h2>
              <p className="text-muted-foreground">
                Toggle back to 360° view to provide ratings and feedback
              </p>
            </div>
          </Card>
        )}

        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-muted-foreground">
            4 of 104 ratings completed (4%) • Auto-saved
          </div>
          <Button size="lg" className="gap-2" onClick={handleSubmitFeedback}>
            Submit Feedback
          </Button>
        </div>

      </div>

      <FeedbackDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        employeeName={
          employees.find((e) => e.id === selectedEmployee)?.name || ""
        }
        onSave={handleSaveFeedback}
        initialFeedback={selectedEmployee ? feedbackData[selectedEmployee] : ""}
      />
    </div>
  );
};
