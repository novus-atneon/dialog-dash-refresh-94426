import { ClipboardList, Settings, LogOut, Trophy, FileBarChart, Network } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const items = [
  { title: "Nominations", url: "/", icon: Trophy },
  { title: "Feedback Matrix", url: "/feedback", icon: ClipboardList },
  { title: "Compilations", url: "/compilations", icon: FileBarChart },
  { title: "Org Hierarchy", url: "/org-hierarchy", icon: Network },
  { title: "Admin Panel", url: "/admin", icon: Settings },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Mock sign out - clear any session data and redirect to auth
    localStorage.removeItem("360-feedback");
    navigate("/auth");
  };

  return (
    <Sidebar collapsible="icon" className="border-r shadow-lg">
      {/* Header with Logo */}
      <div className="h-16 flex items-center justify-center border-b bg-gradient-to-br from-primary/10 via-primary/5 to-transparent backdrop-blur-sm px-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-primary/70 shadow-md">
            <ClipboardList className="h-5 w-5 text-primary-foreground" />
          </div>
          {open && (
            <h3 className="font-semibold text-sm bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">360° Feedback</h3>
          )}
        </div>
      </div>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild variant="outline" tooltip={item.title}>
                    <NavLink
                      to={item.url}
                      end
                      className={({ isActive }) =>
                        isActive
                          ? "bg-accent text-accent-foreground font-medium"
                          : ""
                      }
                    >
                      <item.icon className="h-4 w-4" />
                      {open && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-0">
        <Separator />
        
        {/* User Profile */}
        <div className="p-3">
          <div className={`flex items-center gap-3 ${open ? '' : 'justify-center'}`}>
            <Avatar className="h-9 w-9 flex-shrink-0">
              <AvatarImage 
                src="https://api.dicebear.com/9.x/notionists/svg?seed=user&backgroundColor=b6e3f4" 
                alt="User"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            {open && (
              <div className="flex-1 min-w-0 overflow-hidden">
                <p className="text-sm font-medium truncate">John Doe</p>
                <p className="text-xs text-muted-foreground truncate">john.doe@company.com</p>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Sign Out Button */}
        <div className="p-2">
          <Button
            variant="ghost"
            onClick={handleSignOut}
            className={`w-full hover:bg-destructive/10 hover:text-destructive ${open ? 'justify-start' : 'justify-center px-2'}`}
          >
            <LogOut className="h-4 w-4" />
            {open && <span className="ml-2">Sign Out</span>}
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
