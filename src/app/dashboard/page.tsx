import HealthOverview from '@/components/dashboard/health-overview';
import AppointmentScheduling from '@/components/dashboard/appointment-scheduling';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardOverviewPage() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div className="lg:col-span-2">
         <HealthOverview />
      </div>
       <div className="lg:col-span-1 space-y-6">
        <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Schedule Appointment</CardTitle>
                <CardDescription>Find and book your next appointment.</CardDescription>
            </CardHeader>
            <CardContent>
                 {/* Render Appointment Scheduling component directly */}
                <AppointmentScheduling />
            </CardContent>
        </Card>
         <Alert variant="default" className="bg-accent/10 border-accent/50 text-accent-foreground dark:bg-accent/20">
          <AlertCircle className="h-4 w-4 !text-accent" />
          <AlertTitle className="font-semibold">Health Tip</AlertTitle>
          <AlertDescription>
            Remember to drink plenty of water throughout the day! Staying hydrated is crucial for overall health.
          </AlertDescription>
        </Alert>
       </div>
    </div>
  );
}
