"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Clock, CheckCircle, AlertTriangle, Loader2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

import type { Provider, TimeSlot, Appointment } from '@/services/appointment-scheduling';
import { getProviders, getAvailableTimeSlots, scheduleAppointment } from '@/services/appointment-scheduling';

interface AppointmentSchedulingProps {
  onAppointmentScheduled?: () => void; // Callback to notify parent
}

export default function AppointmentScheduling({ onAppointmentScheduled }: AppointmentSchedulingProps) {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProviderId, setSelectedProviderId] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [loadingProviders, setLoadingProviders] = useState(true);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [scheduling, setScheduling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch providers on component mount
  useEffect(() => {
    async function fetchProviders() {
      setLoadingProviders(true);
      setError(null);
      try {
        const fetchedProviders = await getProviders();
        setProviders(fetchedProviders);
        if (fetchedProviders.length > 0) {
           // setSelectedProviderId(fetchedProviders[0].id); // Auto-select first provider
        }
      } catch (err) {
        console.error("Failed to fetch providers:", err);
        setError("Could not load providers. Please try again.");
      } finally {
        setLoadingProviders(false);
      }
    }
    fetchProviders();
  }, []);

  // Fetch time slots when provider or date changes
  useEffect(() => {
    async function fetchTimeSlots() {
      if (!selectedProviderId || !selectedDate) {
        setTimeSlots([]);
        return;
      }
      setLoadingTimeSlots(true);
      setSelectedTimeSlot(null); // Reset selected time slot
      setError(null);
      try {
        const formattedDate = format(selectedDate, 'yyyy-MM-dd');
        const fetchedTimeSlots = await getAvailableTimeSlots(selectedProviderId, formattedDate);
        setTimeSlots(fetchedTimeSlots);
      } catch (err) {
        console.error("Failed to fetch time slots:", err);
        setError("Could not load available times. Please try again.");
        setTimeSlots([]);
      } finally {
        setLoadingTimeSlots(false);
      }
    }
    fetchTimeSlots();
  }, [selectedProviderId, selectedDate]);

  const handleSchedule = async () => {
    if (!selectedProviderId || !selectedDate || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please select a provider, date, and time slot.",
        variant: "destructive",
      });
      return;
    }

    setScheduling(true);
    setError(null);

    try {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const appointment = await scheduleAppointment(
        selectedProviderId,
        formattedDate, // Pass the formatted date
        selectedTimeSlot.start,
        selectedTimeSlot.end
      );

      toast({
        title: "Appointment Scheduled!",
        description: `Your appointment (ID: ${appointment.id}) is confirmed for ${format(selectedDate, 'PPP')} at ${selectedTimeSlot.start}.`,
        variant: 'default', 
        action: <CheckCircle className="text-white"/>,
      });

      setSelectedTimeSlot(null);
      // Refetch time slots for the selected date
      const updatedTimeSlots = await getAvailableTimeSlots(selectedProviderId, formattedDate);
      setTimeSlots(updatedTimeSlots);

      onAppointmentScheduled?.(); // Notify parent component

    } catch (err) {
      console.error("Failed to schedule appointment:", err);
      setError("Failed to schedule appointment. Please try again.");
      toast({
        title: "Scheduling Failed",
        description: "Could not book the appointment. Please try again.",
        variant: "destructive",
         action: <AlertTriangle className="text-white"/>,
      });
    } finally {
      setScheduling(false);
    }
  };


  return (
    <div className="space-y-6">
       {error && (
          <div className="text-destructive text-sm flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" /> {error}
          </div>
        )}

       {/* Provider Selection */}
      <div className="space-y-2">
        <Label htmlFor="provider">Select Provider</Label>
        {loadingProviders ? <Skeleton className="h-10 w-full" /> : (
        <Select
            value={selectedProviderId}
            onValueChange={(value) => {
                setSelectedProviderId(value);
                setError(null); // Clear error on change
            }}
            disabled={loadingProviders}
         >
          <SelectTrigger id="provider" aria-label="Select healthcare provider">
            <SelectValue placeholder="Select a provider..." />
          </SelectTrigger>
          <SelectContent>
            {providers.map((provider) => (
              <SelectItem key={provider.id} value={provider.id}>
                {provider.name} - <span className="text-muted-foreground text-xs">{provider.specialty}</span>
              </SelectItem>
            ))}
             {providers.length === 0 && !loadingProviders && <p className="p-2 text-sm text-muted-foreground">No providers available.</p>}
          </SelectContent>
        </Select>
         )}
      </div>

       {/* Date Selection */}
      <div className="space-y-2">
         <Label>Select Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !selectedDate && "text-muted-foreground"
              )}
              disabled={!selectedProviderId || loadingProviders}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => {
                setSelectedDate(date);
                setError(null); // Clear error on change
              }}
              initialFocus
              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))} // Disable past dates
            />
          </PopoverContent>
        </Popover>
      </div>

       {/* Time Slot Selection */}
      {selectedProviderId && selectedDate && (
        <div className="space-y-2">
          <Label>Available Times for {format(selectedDate, "PPP")}</Label>
           {loadingTimeSlots ? <Skeleton className="h-24 w-full" /> : (
             <RadioGroup
                value={selectedTimeSlot ? `${selectedTimeSlot.start}-${selectedTimeSlot.end}` : ""}
                onValueChange={(value) => {
                  const [start, end] = value.split('-');
                  setSelectedTimeSlot({ start, end });
                  setError(null); // Clear error on change
                }}
                className="grid grid-cols-2 gap-2 sm:grid-cols-3"
                disabled={loadingTimeSlots}
            >
              {timeSlots.length > 0 ? timeSlots.map((slot) => (
                <Label
                    key={`${slot.start}-${slot.end}`}
                    htmlFor={`time-${slot.start}`}
                    className={cn(
                        "flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors",
                        selectedTimeSlot?.start === slot.start && "border-primary"
                    )}
                >
                    <RadioGroupItem value={`${slot.start}-${slot.end}`} id={`time-${slot.start}`} className="sr-only" />
                     <Clock className="mb-1 h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">{format(new Date(`1970-01-01T${slot.start}:00`), 'p')}</span>
                </Label>
              )) : <p className="col-span-full text-center text-sm text-muted-foreground py-4">No available times for this date.</p>}
            </RadioGroup>
           )}
        </div>
      )}

      {/* Schedule Button */}
      <Button
        onClick={handleSchedule}
        disabled={!selectedProviderId || !selectedDate || !selectedTimeSlot || scheduling || loadingTimeSlots}
        className="w-full"
      >
        {scheduling ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...</> : 'Schedule Appointment'}
      </Button>
    </div>
  );
}
