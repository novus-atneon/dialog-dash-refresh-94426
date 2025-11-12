import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface FeedbackEmployee {
  id: string;
  name: string;
  empId: string;
  grade: string;
  position: string;
  feedbackCount: number;
  avgRating: number;
  status: "pending" | "completed" | "in-progress";
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
      },
    ],
  },
];

const FeedbackRow = ({ employee, depth = 0 }: { employee: FeedbackEmployee; depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReportees = employee.reportees && employee.reportees.length > 0;
  const depthIndicatorColor = `hsl(${263 - depth * 20} ${85 - depth * 10}% ${55 + depth * 5}%)`;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "in-progress":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "pending":
        return "bg-red-500/10 text-red-600 border-red-500/20";
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
          className="py-4 px-3 sticky left-0 bg-background group-hover:bg-accent/30 z-10 transition-all duration-200" 
          style={{ paddingLeft: `${depth * 28 + 16}px` }}
        >
          <div className="flex items-center gap-3">
            {depth > 0 && (
              <div 
                className="w-0.5 h-full absolute left-0 top-0"
                style={{ 
                  background: depthIndicatorColor,
                  opacity: 0.2,
                  left: `${depth * 28}px`
                }}
              />
            )}
            {hasReportees ? (
              <Button
                variant="ghost"
                size="sm"
                className="h-7 w-7 p-0 rounded-md hover:bg-primary/10 transition-all duration-200"
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
        <td className="py-4 px-3">
          <Badge variant="outline" className="font-medium text-xs">
            {employee.grade}
          </Badge>
        </td>
        <td className="py-4 px-3">
          <span className="text-sm text-foreground/90">{employee.position}</span>
        </td>
        <td className="py-4 px-3 text-center">
          <span className="inline-flex items-center justify-center min-w-[32px] h-7 px-2.5 rounded-full bg-muted text-sm font-medium">
            {employee.feedbackCount}
          </span>
        </td>
        <td className="py-4 px-3 text-center">
          <div className="flex items-center justify-center gap-1.5">
            <span className="text-sm font-semibold text-foreground">
              {employee.avgRating.toFixed(1)}
            </span>
            <span className="text-xs text-muted-foreground">/5.0</span>
          </div>
        </td>
        <td className="py-4 px-3 text-center">
          <Badge 
            variant="outline" 
            className={`font-medium text-xs ${getStatusColor(employee.status)}`}
          >
            {getStatusText(employee.status)}
          </Badge>
        </td>
      </tr>
      {hasReportees && isExpanded && employee.reportees?.map((reportee) => (
        <FeedbackRow key={reportee.id} employee={reportee} depth={depth + 1} />
      ))}
    </>
  );
};

const Compilations = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="space-y-1.5">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Feedback Compilations
            </h1>
            <p className="text-sm text-muted-foreground">
              View and manage feedback for your downlines
            </p>
          </div>
        </div>

        {/* Search */}
        <Card className="p-5 shadow-md border-border/50 animate-fade-in">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search by name, employee ID, or position..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-11 border-border/50 focus:border-primary/50 transition-all"
            />
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden shadow-lg border-border/50 animate-fade-in">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/70 border-b border-border/50">
                <tr>
                  <th className="py-4 px-3 text-left text-sm font-semibold text-foreground sticky left-0 bg-muted/70 z-20 min-w-[280px]">
                    Employee
                  </th>
                  <th className="py-4 px-3 text-left text-sm font-semibold text-foreground min-w-[100px]">
                    Grade
                  </th>
                  <th className="py-4 px-3 text-left text-sm font-semibold text-foreground min-w-[200px]">
                    Position
                  </th>
                  <th className="py-4 px-3 text-center text-sm font-semibold text-foreground min-w-[140px]">
                    Feedback Count
                  </th>
                  <th className="py-4 px-3 text-center text-sm font-semibold text-foreground min-w-[120px]">
                    Avg Rating
                  </th>
                  <th className="py-4 px-3 text-center text-sm font-semibold text-foreground min-w-[140px]">
                    Status
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
      </div>
    </div>
  );
};

export default Compilations;
