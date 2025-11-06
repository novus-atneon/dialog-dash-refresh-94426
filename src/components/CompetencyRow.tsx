import { RatingCell } from "./RatingCell";

interface Competency {
  id: string;
  name: string;
  description: string;
  icon: string;
}

interface Employee {
  id: string;
  name: string;
  role: string;
  category: string;
  avatar: string;
}

interface CompetencyRowProps {
  competency: Competency;
  employees: Employee[];
}

export const CompetencyRow = ({ competency, employees }: CompetencyRowProps) => {
  return (
    <div className="flex border-t hover:bg-muted/30 transition-all duration-200">
      <div className="w-64 p-4 sticky left-0 bg-card z-30 border-r shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{competency.icon}</span>
          <div>
            <div className="font-semibold">{competency.name}</div>
            <div className="text-xs text-muted-foreground">
              {competency.description}
            </div>
          </div>
        </div>
      </div>
      {employees.map((employee) => (
        <RatingCell
          key={`${competency.id}-${employee.id}`}
          competencyId={competency.id}
          employeeId={employee.id}
        />
      ))}
    </div>
  );
};
