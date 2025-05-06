
'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LifeBuoy, LogOut, Settings, User } from 'lucide-react';
import { Stethoscope } from "lucide-react";
import { useRouter } from 'next/navigation';


export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    // Add actual logout logic here (e.g., clear session, tokens)
    console.log("Logging out...");
    router.push('/'); // Redirect to login page after logout
  };

  const handleProfileClick = () => {
    router.push('/dashboard/profile');
  }

  const handleSettingsClick = () => {
    router.push('/dashboard/settings');
  }

  const handleSupportClick = () => {
    router.push('/dashboard/support');
  }

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 lg:px-8 py-4">
      <SidebarTrigger className="sm:hidden" />
      <div className="flex items-center gap-2 md:hidden">
        <Stethoscope className="h-6 w-6 text-primary" />
        <span className="font-semibold">HealthHub</span>
      </div>
      <div className="relative ml-auto flex-1 md:grow-0">
        {/* Optional: Search Bar Placeholder
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search..."
          className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
        /> */}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
          >
            <Avatar>
              <AvatarImage src="https://picsum.photos/32/32" alt="User Avatar" data-ai-hint="user avatar" />
              <AvatarFallback>U</AvatarFallback> {/* Display initials if image fails */}
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleProfileClick}>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSettingsClick}>
             <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSupportClick}>
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Support</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
