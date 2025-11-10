import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";


interface Employee {
  id: string;
  name: string;
  empId: string;
  grade: string;
  position: string;
  nominations: number;
  reportees?: Employee[];
}

const mockData: Employee[] = [
  {
    id: "1",
    name: "Regina Ramos",
    empId: "E00016",
    grade: "M4",
    position: "Vice President",
    nominations: 12,
    reportees: [
      {
        id: "2",
        name: "Dayanar Margait",
        empId: "E00019",
        grade: "M3",
        position: "Senior Director",
        nominations: 8,
        reportees: [
          {
            id: "2-1",
            name: "Priya Sharma",
            empId: "E00045",
            grade: "M2",
            position: "Director",
            nominations: 5,
            reportees: [
              {
                id: "2-1-1",
                name: "Amit Kumar",
                empId: "E00078",
                grade: "M1",
                position: "Manager",
                nominations: 3,
                reportees: [
                  {
                    id: "2-1-1-1",
                    name: "Sarah Johnson",
                    empId: "E00112",
                    grade: "E4",
                    position: "Senior Engineer",
                    nominations: 2,
                  },
                  {
                    id: "2-1-1-2",
                    name: "Michael Chen",
                    empId: "E00115",
                    grade: "E3",
                    position: "Engineer",
                    nominations: 1,
                  },
                  {
                    id: "2-1-1-3",
                    name: "Emily Davis",
                    empId: "E00118",
                    grade: "E3",
                    position: "Engineer",
                    nominations: 1,
                  },
                ],
              },
              {
                id: "2-1-2",
                name: "Raj Patel",
                empId: "E00081",
                grade: "M1",
                position: "Manager",
                nominations: 2,
              },
              {
                id: "2-1-3",
                name: "Lisa Anderson",
                empId: "E00084",
                grade: "M1",
                position: "Manager",
                nominations: 4,
              },
            ],
          },
          {
            id: "2-2",
            name: "Vikram Singh",
            empId: "E00048",
            grade: "M2",
            position: "Director",
            nominations: 6,
          },
          {
            id: "2-3",
            name: "Anita Desai",
            empId: "E00051",
            grade: "M2",
            position: "Director",
            nominations: 4,
          },
        ],
      },
      {
        id: "3",
        name: "Ugma Singh",
        empId: "E00030",
        grade: "M3",
        position: "Senior Director",
        nominations: 10,
      },
      {
        id: "4",
        name: "Tripti Mangat",
        empId: "E00021",
        grade: "M3",
        position: "Senior Director",
        nominations: 7,
      },
    ],
  },
  {
    id: "5",
    name: "Kelsey Reyes",
    empId: "E00059",
    grade: "M4",
    position: "Vice President",
    nominations: 15,
    reportees: [
      {
        id: "6",
        name: "Ekta Som",
        empId: "E00015",
        grade: "M3",
        position: "Senior Director",
        nominations: 9,
      },
      {
        id: "7",
        name: "Kashvi Bath",
        empId: "E00016",
        grade: "M3",
        position: "Senior Director",
        nominations: 11,
      },
    ],
  },
];

const HierarchyRow = ({ employee, depth = 0 }: { employee: Employee; depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReportees = employee.reportees && employee.reportees.length > 0;
  const depthIndicatorColor = `hsl(${263 - depth * 20} ${85 - depth * 10}% ${55 + depth * 5}%)`;

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
            {employee.nominations}
          </span>
        </td>
      </tr>
      {hasReportees && isExpanded && employee.reportees?.map((reportee) => (
        <HierarchyRow key={reportee.id} employee={reportee} depth={depth + 1} />
      ))}
    </>
  );
};

const OrgHierarchy = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 p-8">
      <div className="max-w-[1600px] mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between animate-fade-in">
          <div className="space-y-1.5">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Organization Hierarchy
            </h1>
            <p className="text-sm text-muted-foreground">
              Visualize your organizational structure and reporting relationships
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
                    <div className="flex items-center gap-2">
                      Grade
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:bg-primary/10 transition-colors"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </th>
                  <th className="py-4 px-3 text-left text-sm font-semibold text-foreground min-w-[200px]">
                    <div className="flex items-center gap-2">
                      Position
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:bg-primary/10 transition-colors"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </th>
                  <th className="py-4 px-3 text-center text-sm font-semibold text-foreground min-w-[160px]">
                    <div className="flex items-center justify-center gap-2">
                      Nominations
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 hover:bg-primary/10 transition-colors"
                      >
                        <ChevronDown className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {mockData.map((employee) => (
                  <HierarchyRow key={employee.id} employee={employee} />
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OrgHierarchy;
