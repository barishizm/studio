'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Stethoscope, LayoutDashboard, FileText, CalendarPlus, HeartPulse, Settings, LogOut, LifeBuoy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


const menuItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/records', label: 'Health Records', icon: FileText },
  { href: '/dashboard/appointments', label: 'Appointments', icon: CalendarPlus },
  { href: '/dashboard/emergency', label: 'Emergency Data', icon: HeartPulse, badge: 'Urgent' },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/dashboard/support', label: 'Support', icon: LifeBuoy },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const { state, setOpenMobile } = useSidebar();
   const router = useRouter();

   const handleLogout = () => {
    // Add actual logout logic here (e.g., clear session, tokens)
    console.log("Logging out from sidebar...");
    setOpenMobile(false); // Close mobile sidebar if open
    router.push('/'); // Redirect to login page after logout
  };


  return (
    <>
      <SidebarHeader className="flex items-center gap-2 border-b">
         <Stethoscope className="h-7 w-7 text-primary" />
        <span className={cn("text-xl font-semibold", state === 'collapsed' && "hidden")}>HealthHub</span>
      </SidebarHeader>

      <SidebarContent className="flex-1 overflow-y-auto">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} passHref legacyBehavior>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={item.label}
                  onClick={() => setOpenMobile(false)} // Close mobile sidebar on click
                >
                  <a>
                    <item.icon />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant={item.label === 'Emergency Data' ? 'destructive' : 'secondary'} className="ml-auto">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter className="p-2">
         {state === 'expanded' ? (
           <div className="flex items-center gap-3 p-2 rounded-md hover:bg-sidebar-accent transition-colors">
            <Avatar>
              <AvatarImage src="https://picsum.photos/32/32" alt="User Avatar" data-ai-hint="user avatar"/>
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm">
                <span className="font-medium text-sidebar-foreground">John Doe</span>
                <span className="text-xs text-muted-foreground">john.doe@healthhub.com</span>
            </div>
             <Button variant="ghost" size="icon" className="ml-auto h-7 w-7 text-muted-foreground hover:text-sidebar-foreground" onClick={handleLogout} aria-label="Logout">
                <LogOut size={16} />
             </Button>
          </div>
         ) : (
            <Button variant="ghost" size="icon" className="w-full" onClick={handleLogout} aria-label="Logout">
               <LogOut size={18} />
            </Button>
         )}


      </SidebarFooter>
    </>
  );
}