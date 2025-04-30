/**
 * Represents the details of a healthcare provider.
 */
export interface Provider {
  /**
   * The unique identifier for the provider.
   */
  id: string;
  /**
   * The name of the provider.
   */
  name: string;
  /**
   * The specialty of the provider.
   */
  specialty: string;
}

/**
 * Represents an available time slot for an appointment.
 */
export interface TimeSlot {
  /**
   * The start time of the time slot (e.g., '09:00').
   */
  start: string;
  /**
   * The end time of the time slot (e.g., '09:30').
   */
  end: string;
}

/**
 * Represents a scheduled appointment.
 */
export interface Appointment {
  /**
   * The unique identifier for the appointment.
   */
  id: string;
  /**
   * The ID of the provider for the appointment.
   */
  providerId: string;
  /**
   * The date of the appointment (YYYY-MM-DD format).
   */
  date: string; // Added date field
  /**
   * The start time of the appointment (e.g., '14:00').
   */
  start: string;
  /**
   * The end time of the appointment (e.g., '14:30').
   */
  end: string;
}

/**
 * Asynchronously retrieves a list of available healthcare providers.
 *
 * @returns A promise that resolves to an array of Provider objects.
 */
export async function getProviders(): Promise<Provider[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      name: 'Dr. Evelyn Reed',
      specialty: 'Cardiologist',
    },
    {
      id: '2',
      name: 'Dr. Ben Carter',
      specialty: 'Dermatologist',
    },
     {
      id: '3',
      name: 'Dr. Olivia Martinez',
      specialty: 'Pediatrician',
    },
     {
      id: '4',
      name: 'Dr. Samuel Chen',
      specialty: 'General Practitioner',
    },
  ];
}

/**
 * Asynchronously retrieves available time slots for a specific provider on a given date.
 *
 * @param providerId The ID of the provider.
 * @param date The date for which to retrieve time slots (YYYY-MM-DD format).
 * @returns A promise that resolves to an array of TimeSlot objects.
 */
export async function getAvailableTimeSlots(
  providerId: string,
  date: string
): Promise<TimeSlot[]> {
   // Simulate API delay
   await new Promise(resolve => setTimeout(resolve, 700));
  // TODO: Implement this by calling an API.
   // This mock logic provides different slots based on provider/date for demo purposes
   console.log(`Fetching slots for Provider ${providerId} on ${date}`);
   const dayOfMonth = parseInt(date.split('-')[2], 10);

   // Simple pseudo-random slot generation based on date and provider ID
   if (providerId === '1' && dayOfMonth % 3 === 0) return []; // No slots for Dr. Reed on days divisible by 3
   if (providerId === '2' && dayOfMonth % 2 !== 0) { // Dr. Carter only available on even days
       return [ { start: '13:00', end: '13:30' }, { start: '13:30', end: '14:00' }, { start: '15:00', end: '15:30' } ];
   }
   if (dayOfMonth < 10) { // Fewer slots earlier in the month
        return [ { start: '11:00', end: '11:30' }, { start: '11:30', end: '12:00' } ];
   }

  // Default slots
  return [
    { start: '09:00', end: '09:30' },
    { start: '09:30', end: '10:00' },
    { start: '10:00', end: '10:30' },
    { start: '10:30', end: '11:00' },
    { start: '14:00', end: '14:30' },
    { start: '14:30', end: '15:00' },
  ];
}

/**
 * Asynchronously schedules an appointment with a provider.
 *
 * @param providerId The ID of the provider.
 * @param start The start time of the appointment (e.g., '09:00').
 * @param end The end time of the appointment (e.g., '09:30').
 * @param date The date of the appointment (YYYY-MM-DD format). // Added date parameter
 * @returns A promise that resolves to the details of the scheduled appointment.
 */
export async function scheduleAppointment(
  providerId: string,
  start: string,
  end: string,
  date: string // Added date parameter
): Promise<Appointment> {
   // Simulate API delay
   await new Promise(resolve => setTimeout(resolve, 1000));
  // TODO: Implement this by calling an API.
  // In a real API, you would send providerId, start, end, date, and userId
  const newAppointmentId = `appt-${Date.now()}`;
  console.log(`Scheduled appointment ${newAppointmentId}: Provider ${providerId}, Date ${date}, Time ${start}-${end}`);
  return {
    id: newAppointmentId,
    providerId: providerId,
    date: date, // Include date in the response
    start: start,
    end: end,
  };
}
