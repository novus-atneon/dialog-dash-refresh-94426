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
            <div>
              <div className="font-medium text-sm flex items-center gap-2">
                {employee.name}
                {hasReportees && (
                  <Badge variant="secondary" className="text-xs">
                    {employee.reportees?.length}
                  </Badge>
                )}
              </div>
              <div className="text-xs text-muted-foreground">{employee.empId}</div>
            </div>
          </div>
        </td>
        <td className="p-3 text-sm">{employee.grade}</td>
        <td className="p-3 text-sm">{employee.position}</td>
        <td className="p-3 text-sm text-center">{employee.nominations}</td>
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
            <h1 className="text-3xl font-bold">Organization Hierarchy</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Visualize your organizational structure and reporting relationships
            </p>
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
                  <th className="p-3 text-left text-sm font-semibold min-w-[100px]">
                    <div className="flex items-center gap-2">
                      Grade
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                  <th className="p-3 text-left text-sm font-semibold min-w-[180px]">
                    <div className="flex items-center gap-2">
                      Position
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </div>
                  </th>
                  <th className="p-3 text-center text-sm font-semibold min-w-[140px]">
                    <div className="flex items-center justify-center gap-2">
                      No. of Nominations
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
