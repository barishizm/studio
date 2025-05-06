import type { Provider } from './appointment-scheduling'; // Keep Provider interface if needed elsewhere or define locally

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
 * Represents a scheduled appointment with full details for display.
 * This extends the basic Appointment structure with doctor details and precise date/times.
 */
export interface UpcomingAppointment {
  id: string;
  providerId: string;
  date: string; // YYYY-MM-DD
  start: string; // HH:mm
  end: string; // HH:mm
  doctorName: string;
  specialty: string;
  isVirtual?: boolean;
  startDateTime: string; // ISO string for precise sorting and display
  endDateTime: string;   // ISO string
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
  date: string;
  /**
   * The start time of the appointment (e.g., '14:00').
   */
  start: string;
  /**
   * The end time of the appointment (e.g., '14:30').
   */
  end: string;
}

// In-memory store for mock appointments
let mockAppointments: UpcomingAppointment[] = [
    { id: 'appt-1', providerId: '1', date: '2024-08-15', start: '14:00', end: '14:30', doctorName: 'Dr. Smith', specialty: 'Cardiologist', isVirtual: true, startDateTime: new Date('2024-08-15T14:00:00').toISOString(), endDateTime: new Date('2024-08-15T14:30:00').toISOString() },
    { id: 'appt-2', providerId: '2', date: '2024-08-20', start: '10:30', end: '11:00', doctorName: 'Dr. Johnson', specialty: 'Dermatologist', startDateTime: new Date('2024-08-20T10:30:00').toISOString(), endDateTime: new Date('2024-08-20T11:00:00').toISOString() },
    { id: 'appt-3', providerId: '1', date: '2024-09-05', start: '09:00', end: '09:30', doctorName: 'Dr. Smith', specialty: 'Cardiologist', startDateTime: new Date('2024-09-05T09:00:00').toISOString(), endDateTime: new Date('2024-09-05T09:30:00').toISOString() },
].filter(appt => new Date(appt.startDateTime) > new Date());


/**
 * Asynchronously retrieves a list of available healthcare providers.
 *
 * @returns A promise that resolves to an array of Provider objects.
 */
export async function getProviders(): Promise<Provider[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: '1', name: 'Dr. Evelyn Reed', specialty: 'Cardiologist' },
    { id: '2', name: 'Dr. Ben Carter', specialty: 'Dermatologist' },
    { id: '3', name: 'Dr. Olivia Martinez', specialty: 'Pediatrician' },
    { id: '4', name: 'Dr. Samuel Chen', specialty: 'General Practitioner' },
  ];
}

/**
 * Asynchronously retrieves available time slots for a specific provider on a given date.
 */
export async function getAvailableTimeSlots(
  providerId: string,
  date: string // YYYY-MM-DD format
): Promise<TimeSlot[]> {
  await new Promise(resolve => setTimeout(resolve, 700));
  console.log(`Fetching slots for Provider ${providerId} on ${date}`);
  const dayOfMonth = parseInt(date.split('-')[2], 10);

  if (providerId === '1' && dayOfMonth % 3 === 0) return [];
  if (providerId === '2' && dayOfMonth % 2 !== 0) {
    return [ { start: '13:00', end: '13:30' }, { start: '13:30', end: '14:00' }, { start: '15:00', end: '15:30' } ];
  }
  if (dayOfMonth < 10) {
    return [ { start: '11:00', end: '11:30' }, { start: '11:30', end: '12:00' } ];
  }

  return [
    { start: '09:00', end: '09:30' }, { start: '09:30', end: '10:00' },
    { start: '10:00', end: '10:30' }, { start: '10:30', end: '11:00' },
    { start: '14:00', end: '14:30' }, { start: '14:30', end: '15:00' },
  ];
}

/**
 * Asynchronously schedules an appointment.
 */
export async function scheduleAppointment(
  providerId: string,
  date: string, // YYYY-MM-DD
  start: string, // HH:mm
  end: string // HH:mm
): Promise<Appointment> {
  await new Promise(resolve => setTimeout(resolve, 1000));
  const providers = await getProviders(); // Fetch providers to get name/specialty
  const provider = providers.find(p => p.id === providerId);

  if (!provider) {
    throw new Error('Provider not found');
  }

  const newAppointmentId = `appt-${Date.now()}`;
  const startDateTime = new Date(`${date}T${start}:00`).toISOString();
  const endDateTime = new Date(`${date}T${end}:00`).toISOString();

  const newAppointment: UpcomingAppointment = {
    id: newAppointmentId,
    providerId,
    date,
    start,
    end,
    doctorName: provider.name,
    specialty: provider.specialty,
    // isVirtual: Math.random() > 0.5, // Randomly assign virtual for demo
    startDateTime,
    endDateTime,
  };

  mockAppointments.push(newAppointment);
  mockAppointments.sort((a, b) => new Date(a.startDateTime).getTime() - new Date(b.startDateTime).getTime());

  console.log(`Scheduled appointment ${newAppointmentId}: Provider ${providerId}, Date ${date}, Time ${start}-${end}`);
  // Return the basic Appointment structure as per the original interface
  return {
    id: newAppointment.id,
    providerId: newAppointment.providerId,
    date: newAppointment.date,
    start: newAppointment.start,
    end: newAppointment.end,
  };
}

/**
 * Asynchronously retrieves upcoming appointments for a user.
 */
export async function getUpcomingAppointments(userId: string): Promise<UpcomingAppointment[]> {
  console.log(`Fetching upcoming appointments for user ${userId}... (from mock store)`);
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockAppointments.filter(appt => new Date(appt.startDateTime) > new Date());
}

/**
 * Asynchronously cancels an appointment.
 */
export async function cancelAppointment(appointmentId: string): Promise<boolean> {
  console.log(`Cancelling appointment ${appointmentId}... (from mock store)`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  const initialLength = mockAppointments.length;
  mockAppointments = mockAppointments.filter(appt => appt.id !== appointmentId);
  return mockAppointments.length < initialLength;
}
