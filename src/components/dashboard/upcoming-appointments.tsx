'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { AlertTriangle, CalendarCheck2, Trash2, Video, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from '@/hooks/use-toast';

// Use the centrally defined UpcomingAppointment interface and service functions
import type { UpcomingAppointment } from '@/services/appointment-scheduling';
import { getUpcomingAppointments, cancelAppointment } from '@/services/appointment-scheduling';

const MOCK_USER_ID = 'user123';

export default function UpcomingAppointments() {
  const [appointments, setAppointments] = useState<UpcomingAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cancellingId, setCancellingId] = useState<string | null>(null);

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
   };

  useEffect(() => {
    fetchAppointments();
  }, []); // Re-fetch if key prop changes (passed from parent)

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
