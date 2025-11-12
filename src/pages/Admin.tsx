import { Card } from "@/components/ui/card";
import { Users, Network, AlertTriangle, Upload, RefreshCw, BookOpen, CheckCircle, AlertCircle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-lg">
            Manage employees, org hierarchy, and data validation
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center">
                <Users className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Employees</p>
                <p className="text-3xl font-bold">1006</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center">
                <Upload className="h-7 w-7 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Last Sync</p>
                <p className="text-xl font-bold">Success</p>
                <p className="text-xs text-muted-foreground">11/5/2025</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-yellow-500/10 flex items-center justify-center">
                <AlertTriangle className="h-7 w-7 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Critical Errors</p>
                <p className="text-3xl font-bold">2</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-500/10 flex items-center justify-center">
                <AlertCircle className="h-7 w-7 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Warnings</p>
                <p className="text-3xl font-bold">2</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Members Management
                </h3>
                <p className="text-sm text-muted-foreground">
                  View and manage employee profiles, roles, and relationships
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Users className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate('/org-hierarchy')}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Org Hierarchy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Visualize and navigate the organizational structure
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Network className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>

          <Card 
            className="p-6 hover:shadow-lg transition-all cursor-pointer group"
            onClick={() => navigate('/compilations')}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Feedback Compilations
                </h3>
                <p className="text-sm text-muted-foreground">
                  Review feedback and ratings for all downlines
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <MessageSquare className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Data Validation
                </h3>
                <p className="text-sm text-muted-foreground">
                  Review and resolve data quality issues
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <AlertTriangle className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  HRMS Data Upload
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload employee data via CSV or manage sync settings
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <Upload className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Cycle Management
                </h3>
                <p className="text-sm text-muted-foreground">
                  Create and manage 360° feedback cycles
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <RefreshCw className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all cursor-pointer group">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                  Competency Library
                </h3>
                <p className="text-sm text-muted-foreground">
                  Manage competencies and grade-specific descriptors
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                <BookOpen className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
