import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Users, Star, BarChart3, TrendingUp, Download, Filter, Eye, Target, MessageCircle, Crown, Puzzle, Handshake, Zap, Lightbulb, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { LucideIcon } from "lucide-react";

interface CompetencyRating {
  competencyId: string;
  competencyName: string;
  rating: number;
  icon: LucideIcon;
}

interface FeedbackDetail {
  giverId: string;
  giverName: string;
  giverRole: string;
  competencyRatings: CompetencyRating[];
  textFeedback: string;
}

interface FeedbackEmployee {
  id: string;
  name: string;
  empId: string;
  grade: string;
  position: string;
  feedbackCount: number;
  avgRating: number;
  status: "pending" | "completed" | "in-progress";
  feedbackDetails: FeedbackDetail[];
  reportees?: FeedbackEmployee[];
}

const mockData: FeedbackEmployee[] = [
  {
    id: "1",
    name: "Regina Ramos",
    empId: "E00016",
    grade: "M4",
    position: "Vice President",
    feedbackCount: 12,
    avgRating: 4.5,
    status: "completed",
    feedbackDetails: [
      {
        giverId: "G001",
        giverName: "John Smith",
        giverRole: "Senior Director",
        competencyRatings: [
          { competencyId: "1", competencyName: "Strategic Thinking", rating: 5, icon: Target },
          { competencyId: "2", competencyName: "Communication", rating: 4.5, icon: MessageCircle },
          { competencyId: "3", competencyName: "Leadership", rating: 5, icon: Crown },
        ],
        textFeedback: "Regina demonstrates exceptional strategic thinking and leadership. Her ability to communicate complex ideas clearly is outstanding.",
      },
      {
        giverId: "G002",
        giverName: "Sarah Williams",
        giverRole: "Director",
        competencyRatings: [
          { competencyId: "1", competencyName: "Strategic Thinking", rating: 4, icon: Target },
          { competencyId: "2", competencyName: "Communication", rating: 4.5, icon: MessageCircle },
          { competencyId: "5", competencyName: "Collaboration", rating: 5, icon: Handshake },
        ],
        textFeedback: "Great collaborative leader who always considers team input in strategic decisions.",
      },
    ],
    reportees: [
      {
        id: "2",
        name: "Dayanar Margait",
        empId: "E00019",
        grade: "M3",
        position: "Senior Director",
        feedbackCount: 8,
        avgRating: 4.2,
        status: "completed",
        feedbackDetails: [
          {
            giverId: "G003",
            giverName: "Michael Chen",
            giverRole: "Manager",
            competencyRatings: [
              { competencyId: "2", competencyName: "Communication", rating: 4, icon: MessageCircle },
              { competencyId: "3", competencyName: "Leadership", rating: 4.5, icon: Crown },
              { competencyId: "4", competencyName: "Problem Solving", rating: 4, icon: Puzzle },
            ],
            textFeedback: "Excellent problem solver with strong leadership skills.",
          },
        ],
        reportees: [
          {
            id: "2-1",
            name: "Priya Sharma",
            empId: "E00045",
            grade: "M2",
            position: "Director",
            feedbackCount: 5,
            avgRating: 4.0,
            status: "in-progress",
            feedbackDetails: [],
            reportees: [
              {
                id: "2-1-1",
                name: "Amit Kumar",
                empId: "E00078",
                grade: "M1",
                position: "Manager",
                feedbackCount: 3,
                avgRating: 3.8,
                status: "completed",
                feedbackDetails: [],
                reportees: [
                  {
                    id: "2-1-1-1",
                    name: "Sarah Johnson",
                    empId: "E00112",
                    grade: "E4",
                    position: "Senior Engineer",
                    feedbackCount: 2,
                    avgRating: 4.5,
                    status: "pending",
                    feedbackDetails: [],
                  },
                  {
                    id: "2-1-1-2",
                    name: "Michael Chen",
                    empId: "E00115",
                    grade: "E3",
                    position: "Engineer",
                    feedbackCount: 1,
                    avgRating: 4.0,
                    status: "completed",
                    feedbackDetails: [],
                  },
                ],
              },
              {
                id: "2-1-2",
                name: "Raj Patel",
                empId: "E00081",
                grade: "M1",
                position: "Manager",
                feedbackCount: 2,
                avgRating: 3.5,
                status: "in-progress",
                feedbackDetails: [],
              },
            ],
          },
          {
            id: "2-2",
            name: "Vikram Singh",
            empId: "E00048",
            grade: "M2",
            position: "Director",
            feedbackCount: 6,
            avgRating: 4.3,
            status: "completed",
            feedbackDetails: [],
          },
        ],
      },
      {
        id: "3",
        name: "Ugma Singh",
        empId: "E00030",
        grade: "M3",
        position: "Senior Director",
        feedbackCount: 10,
        avgRating: 4.7,
        status: "completed",
        feedbackDetails: [],
      },
    ],
  },
  {
    id: "5",
    name: "Kelsey Reyes",
    empId: "E00059",
    grade: "M4",
    position: "Vice President",
    feedbackCount: 15,
    avgRating: 4.6,
    status: "completed",
    feedbackDetails: [],
    reportees: [
      {
        id: "6",
        name: "Ekta Som",
        empId: "E00015",
        grade: "M3",
        position: "Senior Director",
        feedbackCount: 9,
        avgRating: 4.4,
        status: "completed",
        feedbackDetails: [],
      },
    ],
  },
];

const FeedbackRow = ({ employee, depth = 0 }: { employee: FeedbackEmployee; depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const hasReportees = employee.reportees && employee.reportees.length > 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-success/10 text-success border-success/20";
      case "in-progress":
        return "bg-warning/10 text-warning border-warning/20";
      case "pending":
        return "bg-destructive/10 text-destructive border-destructive/20";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in-progress":
        return "In Progress";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <>
      <tr className="group border-b border-border/50 hover:bg-accent/30 transition-all duration-200 animate-fade-in">
        <td 
          className="py-4 px-4 sticky left-0 bg-background group-hover:bg-accent/30 z-10 transition-all duration-200" 
          style={{ paddingLeft: `${depth * 32 + 16}px` }}
        >
          <div className="flex items-center gap-3 relative">
            {depth > 0 && (
              <>
                {/* Vertical line */}
                <div 
                  className="absolute w-px bg-border h-full top-0"
                  style={{ 
                    left: `${-16}px`
                  }}
                />
                {/* Horizontal connecting line */}
                <div 
                  className="absolute w-4 h-px bg-border"
                  style={{ 
                    left: `${-16}px`,
                    top: '50%'
                  }}
                />
              </>
            )}
            {hasReportees ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 rounded-md hover:bg-primary/10 transition-all duration-200 relative z-10"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-primary transition-transform" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-primary transition-transform" />
                )}
              </Button>
            ) : (
              <div className="w-7" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5">
                <span className="font-semibold text-sm text-foreground truncate">
                  {employee.name}
                </span>
                {hasReportees && (
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-medium px-2 py-0.5 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                  >
                    {employee.reportees?.length}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-0.5">{employee.empId}</div>
            </div>
          </div>
        </td>
        <td className="py-4 px-4 text-center">
          <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-full bg-muted text-sm font-medium">
            {employee.feedbackCount}
          </span>
        </td>
        <td className="py-4 px-4 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm font-semibold text-foreground">
              {employee.avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">/5.0</span>
          </div>
        </td>
        <td className="py-4 px-4 text-center">
          <Badge 
            variant="outline" 
            className={`font-medium text-xs ${getStatusColor(employee.status)}`}
          >
            {getStatusText(employee.status)}
          </Badge>
        </td>
        <td className="py-4 px-4 text-center">
          <Button
            variant="outline"
            size="sm"
            className="gap-2"
            onClick={() => setDialogOpen(true)}
            disabled={employee.feedbackDetails.length === 0}
          >
            <Eye className="h-4 w-4" />
            View Feedback
          </Button>
        </td>
      </tr>

      {/* Feedback Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Feedback for {employee.name}</DialogTitle>
            <DialogDescription>
              {employee.empId} • {employee.position} • {employee.feedbackCount} responses
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {employee.feedbackDetails.map((feedback, idx) => (
              <Card key={idx} className="p-5 border-border/50">
                <div className="space-y-4">
                  {/* Giver Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-foreground">{feedback.giverName}</p>
                      <p className="text-sm text-muted-foreground">{feedback.giverRole}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Feedback #{idx + 1}
                    </Badge>
                  </div>

                  <Separator />

                  {/* Competency Ratings */}
                  <div>
                    <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                      <Star className="h-4 w-4 text-primary" />
                      Competency Ratings
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {feedback.competencyRatings.map((rating) => {
                        const IconComponent = rating.icon;
                        return (
                          <div
                            key={rating.competencyId}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                          >
                            <div className="flex items-center gap-2">
                              <IconComponent className="h-4 w-4 text-primary" />
                              <span className="text-sm font-medium">{rating.competencyName}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-primary text-primary" />
                              <span className="font-bold text-sm">{rating.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Text Feedback */}
                  {feedback.textFeedback && (
                    <div>
                      <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                        <MessageCircle className="h-4 w-4 text-primary" />
                        Written Feedback
                      </h4>
                      <div className="p-4 rounded-lg bg-accent/30 border border-border/50">
                        <p className="text-sm text-foreground/90 leading-relaxed">
                          {feedback.textFeedback}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}

            {employee.feedbackDetails.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No feedback available yet</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {hasReportees && isExpanded && employee.reportees?.map((reportee) => (
        <FeedbackRow key={reportee.id} employee={reportee} depth={depth + 1} />
      ))}
    </>
  );
};

const Compilations = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold" style={{ background: 'var(--gradient-header)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Feedback Compilation
            </h1>
            <p className="text-sm text-muted-foreground">
              Manager & HRBP Dashboard - Team Performance Insights
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Select defaultValue="q4-2024">
              <SelectTrigger className="w-40 bg-background">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="q4-2024">Q4 2024</SelectItem>
                <SelectItem value="q3-2024">Q3 2024</SelectItem>
                <SelectItem value="q2-2024">Q2 2024</SelectItem>
                <SelectItem value="q1-2024">Q1 2024</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>

            <Button className="gap-2 bg-primary hover:bg-primary/90">
              <Download className="h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <Card className="p-6 border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Team Members</p>
                <p className="text-4xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Active reviewees</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Users className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Avg Rating</p>
                <p className="text-4xl font-bold">4.2</p>
                <p className="text-xs text-success flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.3 from last period
                </p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <Star className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Total Feedback</p>
                <p className="text-4xl font-bold">91</p>
                <p className="text-xs text-muted-foreground">Responses received</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-6 border-border/50 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground font-medium">Completion</p>
                <p className="text-4xl font-bold">91%</p>
                <p className="text-xs text-muted-foreground">Average completion</p>
              </div>
              <div className="p-3 rounded-xl bg-primary/10">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="animate-fade-in">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="overview">Team Overview</TabsTrigger>
            <TabsTrigger value="competencies">Competencies</TabsTrigger>
            <TabsTrigger value="reports">Individual Reports</TabsTrigger>
            <TabsTrigger value="analytics">Trends & Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            {/* Team Performance Summary */}
            <Card className="overflow-hidden shadow-lg border-border/50">
              <div className="p-6 border-b border-border/50 bg-muted/30">
                <h3 className="text-lg font-semibold">Team Performance Summary</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Overview of all team members and their feedback metrics
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50 border-b border-border/50">
                    <tr>
                      <th className="py-4 px-4 text-left text-sm font-semibold text-foreground sticky left-0 bg-muted/50 z-20 min-w-[280px]">
                        Employee
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-foreground min-w-[140px]">
                        Feedback Count
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-foreground min-w-[120px]">
                        Avg Rating
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-foreground min-w-[140px]">
                        Status
                      </th>
                      <th className="py-4 px-4 text-center text-sm font-semibold text-foreground min-w-[160px]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {mockData.map((employee) => (
                      <FeedbackRow key={employee.id} employee={employee} />
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="competencies">
            <Card className="p-8 text-center text-muted-foreground">
              Competencies view coming soon...
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="p-8 text-center text-muted-foreground">
              Individual reports coming soon...
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className="p-8 text-center text-muted-foreground">
              Trends & Analytics coming soon...
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Compilations;
