'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, CalendarCheck2, Trash2, Video } from 'lucide-react';
import { format } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

// Assume a service function exists to get upcoming appointments
// We'll use the existing scheduleAppointment response type and add doctor details
// Ideally, you'd have a dedicated type and service function
interface UpcomingAppointment extends Appointment {
  doctorName: string;
  specialty: string;
  isVirtual?: boolean; // Optional flag for virtual appointments
}

// Mock service function - replace with actual API call
async function getUpcomingAppointments(userId: string): Promise<UpcomingAppointment[]> {
  console.log(`Fetching upcoming appointments for user ${userId}...`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  // Return mock data - in a real app, this comes from your backend
  return [
    { id: 'appt-1', providerId: '1', start: '14:00', end: '14:30', doctorName: 'Dr. Smith', specialty: 'Cardiologist', date: '2024-08-15', isVirtual: true },
    { id: 'appt-2', providerId: '2', start: '10:30', end: '11:00', doctorName: 'Dr. Johnson', specialty: 'Dermatologist', date: '2024-08-20' },
    { id: 'appt-3', providerId: '1', start: '09:00', end: '09:30', doctorName: 'Dr. Smith', specialty: 'Cardiologist', date: '2024-09-05' },
  ].map(appt => ({ // Combine date and time for sorting/display
      ...appt,
      startDateTime: new Date(`${appt.date}T${appt.start}:00`).toISOString(), // Create sortable date
      endDateTime: new Date(`${appt.date}T${appt.end}:00`).toISOString(),
    }))
    // Filter appointments that are in the future
    .filter(appt => new Date(appt.startDateTime) > new Date())
    // Sort by date ascending
    .sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());

}

// Mock service function for cancellation
async function cancelAppointment(appointmentId: string): Promise<boolean> {
   console.log(`Cancelling appointment ${appointmentId}...`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Simulate success/failure (e.g., based on ID or randomly)
  return !appointmentId.includes('fail'); // Example: fail if ID contains 'fail'
}


const MOCK_USER_ID = 'user123';

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<UpcomingAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
   const [cancellingId, setCancellingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAppointments();
  }, []);

   const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUpcomingAppointments(MOCK_USER_ID);
        setAppointments(data);
      } catch (err) {
        console.error("Failed to fetch upcoming appointments:", err);
        setError("Could not load upcoming appointments. Please try again.");
      } finally {
        setLoading(false);
      }
   }

   const handleCancel = async (appointmentId: string) => {
      setCancellingId(appointmentId);
      try {
         const success = await cancelAppointment(appointmentId);
         if (success) {
            toast({
               title: "Appointment Cancelled",
               description: "Your appointment has been successfully cancelled.",
               variant: "default",
            });
            // Refresh the list after cancellation
            fetchAppointments();
         } else {
             toast({
               title: "Cancellation Failed",
               description: "Could not cancel the appointment. Please contact support.",
               variant: "destructive",
            });
         }
      } catch (err) {
          console.error("Error cancelling appointment:", err);
          toast({
               title: "Error",
               description: "An unexpected error occurred during cancellation.",
               variant: "destructive",
            });
      } finally {
         setCancellingId(null);
      }
   }

  const renderSkeleton = (rows = 3) => (
    <div className="space-y-2 mt-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4 border-b">
           <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
           <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );

   const formatAppointmentDate = (isoDate: string) => {
     try {
       return format(new Date(isoDate), 'EEE, MMM dd, yyyy');
     } catch { return 'Invalid Date'; }
   };
   const formatAppointmentTime = (isoDate: string) => {
      try {
       return format(new Date(isoDate), 'p'); // Format like '2:00 PM'
     } catch { return 'Invalid Time'; }
   }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CalendarCheck2 className="mr-2 h-5 w-5 text-primary"/> Upcoming Appointments
          </CardTitle>
        <CardDescription>View and manage your scheduled appointments.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? renderSkeleton() : error ? (
          <div className="text-destructive text-sm flex items-center justify-center py-10">
            <AlertTriangle className="h-4 w-4 mr-2" /> {error}
          </div>
        ) : appointments.length === 0 ? (
            <p className="text-center text-muted-foreground py-10">No upcoming appointments found.</p>
        ): (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Provider</TableHead>
                 <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appt) => (
                <TableRow key={appt.id}>
                  <TableCell className="font-medium">{formatAppointmentDate(appt.startDateTime)}</TableCell>
                   <TableCell>{formatAppointmentTime(appt.startDateTime)}</TableCell>
                  <TableCell>
                     <div>{appt.doctorName}</div>
                     <div className="text-xs text-muted-foreground">{appt.specialty}</div>
                  </TableCell>
                   <TableCell>
                    {appt.isVirtual ? (
                      <span className="flex items-center text-primary text-sm"><Video className="h-4 w-4 mr-1" /> Virtual</span>
                    ) : (
                       <span className="text-sm text-muted-foreground">In-Person</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8 w-8"
                             disabled={cancellingId === appt.id}
                             aria-label="Cancel Appointment"
                          >
                             {cancellingId === appt.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently cancel your appointment with {appt.doctorName} on {formatAppointmentDate(appt.startDateTime)} at {formatAppointmentTime(appt.startDateTime)}.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel disabled={cancellingId === appt.id}>Keep Appointment</AlertDialogCancel>
                            <AlertDialogAction
                               onClick={() => handleCancel(appt.id)}
                               disabled={cancellingId === appt.id}
                               className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                             >
                               {cancellingId === appt.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                               Cancel Appointment
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
