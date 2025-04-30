import AppointmentScheduling from '@/components/dashboard/appointment-scheduling';
import UpcomingAppointments from '@/components/dashboard/upcoming-appointments';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto py-8 grid gap-8 md:grid-cols-3">
       <div className="md:col-span-1">
         <Card className="shadow-sm">
            <CardHeader>
                <CardTitle>Schedule New Appointment</CardTitle>
                <CardDescription>Find available slots and book your next visit.</CardDescription>
            </CardHeader>
            <CardContent>
                <AppointmentScheduling />
            </CardContent>
         </Card>
       </div>
      <div className="md:col-span-2">
         <UpcomingAppointments />
      </div>
    </div>
  );
}
