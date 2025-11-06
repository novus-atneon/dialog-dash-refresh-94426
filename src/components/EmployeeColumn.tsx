import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Employee {
  id: string;
  name: string;
  role: string;
  category: string;
  avatar: string;
}

interface EmployeeColumnProps {
  employee: Employee;
  isFirst: boolean;
  previousCategory: string | null;
}

export const EmployeeColumn = ({ employee }: EmployeeColumnProps) => {
  return (
    <div className="w-48 border-l flex flex-col">
      <div className="p-4 flex flex-col items-center gap-2 bg-card">
        <Avatar className="w-12 h-12 ring-2 ring-primary/20">
          <AvatarImage src={employee.avatar} alt={employee.name} />
          <AvatarFallback>{employee.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-center">
          <div className="font-semibold text-sm">{employee.name}</div>
          <div className="text-xs text-muted-foreground">{employee.role}</div>
        </div>
      </div>
    </div>
  );
};
