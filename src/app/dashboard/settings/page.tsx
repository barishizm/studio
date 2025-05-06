
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings as SettingsIcon, Bell, ShieldCheck, Palette } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <SettingsIcon className="mr-2 h-7 w-7 text-primary" /> Settings
      </h1>
      <p className="mb-8 text-muted-foreground">
        Manage your account preferences and application settings.
      </p>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {/* Account Settings Card */}
        <Card className="shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Update your profile information and preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <p className="text-sm text-muted-foreground" id="username">john.doe</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <p className="text-sm text-muted-foreground" id="email">user@healthhub.com</p>
              <Button variant="outline" size="sm">Change Email</Button>
            </div>
             <Separator />
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Button variant="outline" size="sm">Change Password</Button>
            </div>
             <Separator />
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
               <Select defaultValue="en">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center"><Bell className="mr-2 h-5 w-5 text-primary"/> Notifications</CardTitle>
            <CardDescription>Manage how you receive notifications.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
                <span>Email Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Receive updates and alerts via email.
                </span>
              </Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="push-notifications" className="flex flex-col space-y-1">
                <span>Push Notifications</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Get real-time alerts on your device.
                </span>
              </Label>
              <Switch id="push-notifications" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="appointment-reminders" className="flex flex-col space-y-1">
                <span>Appointment Reminders</span>
                 <span className="font-normal leading-snug text-muted-foreground">
                  Reminders for upcoming appointments.
                </span>
              </Label>
              <Switch id="appointment-reminders" defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Card */}
         <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-primary"/> Security</CardTitle>
            <CardDescription>Manage your account security settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <Label htmlFor="two-factor-auth" className="flex flex-col space-y-1">
                <span>Two-Factor Authentication</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Add an extra layer of security.
                </span>
              </Label>
              <Switch id="two-factor-auth" />
            </div>
            <Button variant="outline">View Login History</Button>
          </CardContent>
        </Card>

        {/* Appearance Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-primary"/> Appearance</CardTitle>
            <CardDescription>Customize the look and feel of the application.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="theme">Theme</Label>
              <Select defaultValue="dark">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System Default</SelectItem>
                </SelectContent>
              </Select>
            </div>
             <div className="space-y-2">
                <Label htmlFor="fontSize">Font Size</Label>
                 <Select defaultValue="medium">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select font size" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                 </Select>
            </div>
          </CardContent>
        </Card>

         <div className="lg:col-span-3 mt-6 flex justify-end">
            <Button size="lg">Save Changes</Button>
        </div>
      </div>
    </div>
  );
}
