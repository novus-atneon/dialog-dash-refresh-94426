import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronRight, Search, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";

interface Employee {
  id: string;
  name: string;
  empId: string;
  avatar: string;
  grade: string;
  level: string;
  doj: string;
  incrementMin: number;
  incrementMax: number;
  currentIncrement: number;
  finalPromotion: boolean;
  currentBase: string;
  hasAlert?: boolean;
  reportees?: Employee[];
}

const mockData: Employee[] = [
  {
    id: "1",
    name: "Regina Ramos",
    empId: "E00016",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Regina",
    grade: "M4",
    level: "Vice President",
    doj: "Mar 11, 2013",
    incrementMin: 0,
    incrementMax: 20,
    currentIncrement: 15,
    finalPromotion: true,
    currentBase: "INR 1,120,469",
    reportees: [
      {
        id: "2",
        name: "Dayanar Margait",
        empId: "E00019",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dayanar",
        grade: "M4",
        level: "Vice President",
        doj: "Mar 11, 2013",
        incrementMin: 0,
        incrementMax: 20,
        currentIncrement: 12,
        finalPromotion: true,
        currentBase: "INR 1,120,469",
        hasAlert: true,
      },
      {
        id: "3",
        name: "Ugma Singh",
        empId: "E00030",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ugma",
        grade: "M4",
        level: "Vice President",
        doj: "Jun 2, 2014",
        incrementMin: 0,
        incrementMax: 20,
        currentIncrement: 10,
        finalPromotion: false,
        currentBase: "INR 6,255,696",
      },
      {
        id: "4",
        name: "Tripti Mangat",
        empId: "E00021",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tripti",
        grade: "M4",
        level: "Vice President",
        doj: "Jan 2, 2017",
        incrementMin: 0,
        incrementMax: 20,
        currentIncrement: 14,
        finalPromotion: false,
        currentBase: "INR 9,504,727",
      },
    ],
  },
  {
    id: "5",
    name: "Kelsey Reyes",
    empId: "E00059",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kelsey",
    grade: "M3",
    level: "Senior Executive",
    doj: "Jun 21, 2021",
    incrementMin: 0,
    incrementMax: 20,
    currentIncrement: 8,
    finalPromotion: true,
    currentBase: "INR 5,513,641",
    reportees: [
      {
        id: "6",
        name: "Ekta Som",
        empId: "E00015",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ekta",
        grade: "M12",
        level: "Senior Executive",
        doj: "Jun 21, 2021",
        incrementMin: 0,
        incrementMax: 20,
        currentIncrement: 16,
        finalPromotion: true,
        currentBase: "INR 5,513,641",
        hasAlert: true,
      },
      {
        id: "7",
        name: "Kashvi Bath",
        empId: "E00016",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kashvi",
        grade: "M1",
        level: "Senior Vice President",
        doj: "Dec 6, 2021",
        incrementMin: 0,
        incrementMax: 20,
        currentIncrement: 11,
        finalPromotion: false,
        currentBase: "INR 2,350,461",
        hasAlert: true,
      },
    ],
  },
];

const HierarchyRow = ({ employee, depth = 0 }: { employee: Employee; depth?: number }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasReportees = employee.reportees && employee.reportees.length > 0;

  return (
    <>
      <tr className="border-b hover:bg-muted/30 transition-colors">
        <td className="p-3 sticky left-0 bg-background z-10" style={{ paddingLeft: `${depth * 24 + 12}px` }}>
          <div className="flex items-center gap-3">
            {hasReportees && (
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </Button>
            )}
            {!hasReportees && <div className="w-6" />}
            <Avatar className="h-8 w-8">
              <AvatarImage src={employee.avatar} />
              <AvatarFallback>{employee.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm flex items-center gap-2">
                {employee.name}
                {hasReportees && (
                  <Badge variant="secondary" className="text-xs">
                    {employee.reportees?.length} Employees
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{employee.empId}</div>
            </div>
          </div>
        </td>
        <td className="p-3">
          <div className="flex items-center gap-2">
            {employee.hasAlert && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
            <span className="text-sm font-medium">{employee.grade}</span>
          </div>
        </td>
        <td className="p-3 text-sm">{employee.level}</td>
        <td className="p-3 text-sm text-muted-foreground">{employee.doj}</td>
        <td className="p-3">
          <div className="flex items-center gap-3 min-w-[200px]">
            <span className="text-xs text-muted-foreground">Min 0%</span>
            <Slider
              value={[employee.currentIncrement]}
              max={employee.incrementMax}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground">Max {employee.incrementMax}%</span>
          </div>
        </td>
        <td className="p-3">
          <Badge variant={employee.finalPromotion ? "default" : "secondary"}>
            {employee.finalPromotion ? "Yes" : "No"}
          </Badge>
        </td>
        <td className="p-3 text-sm font-medium">{employee.currentBase}</td>
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
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Comp Planner Hierarchy</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Displaying 20 rows and 30 columns
            </p>
          </div>
          <div className="flex gap-3">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-600 border-blue-500/20">
              Existing Grade
            </Badge>
            <Badge variant="outline" className="bg-orange-500/10 text-orange-600 border-orange-500/20">
              Increment
            </Badge>
            <Badge variant="outline" className="bg-teal-500/10 text-teal-600 border-teal-500/20">
              Annual Rewards Decision
            </Badge>
          </div>
        </div>

        {/* Search */}
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employee"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="p-3 text-left text-sm font-semibold sticky left-0 bg-muted/50 z-20">
                    Employee
                  </th>
                  <th className="p-3 text-left text-sm font-semibold min-w-[120px]">
                    <div className="flex items-center gap-2">
                      Existing Grade
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold min-w-[160px]">
                    <div className="flex items-center gap-2">
                      Existing Level
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold min-w-[120px]">
                    <div className="flex items-center gap-2">
                      DOJ
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold min-w-[280px]">
                    Guideline
                  </th>
                  <th className="p-3 text-left text-sm font-semibold min-w-[140px]">
                    <div className="flex items-center gap-2">
                      Final Promotion
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold min-w-[140px]">
                    <div className="flex items-center gap-2">
                      Current Base
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
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
