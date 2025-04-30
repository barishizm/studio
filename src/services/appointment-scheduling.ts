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
   * The start time of the time slot (ISO format).
   */
  start: string;
  /**
   * The end time of the time slot (ISO format).
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
   * The start time of the appointment (ISO format).
   */
  start: string;
  /**
   * The end time of the appointment (ISO format).
   */
  end: string;
}

/**
 * Asynchronously retrieves a list of available healthcare providers.
 *
 * @returns A promise that resolves to an array of Provider objects.
 */
export async function getProviders(): Promise<Provider[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      name: 'Dr. Smith',
      specialty: 'Cardiologist',
    },
    {
      id: '2',
      name: 'Dr. Johnson',
      specialty: 'Dermatologist',
    },
  ];
}

/**
 * Asynchronously retrieves available time slots for a specific provider on a given date.
 *
 * @param providerId The ID of the provider.
 * @param date The date for which to retrieve time slots (ISO format).
 * @returns A promise that resolves to an array of TimeSlot objects.
 */
export async function getAvailableTimeSlots(
  providerId: string,
  date: string
): Promise<TimeSlot[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      start: '09:00',
      end: '09:30',
    },
    {
      start: '10:00',
      end: '10:30',
    },
  ];
}

/**
 * Asynchronously schedules an appointment with a provider.
 *
 * @param providerId The ID of the provider.
 * @param start The start time of the appointment (ISO format).
 * @param end The end time of the appointment (ISO format).
 * @returns A promise that resolves to the details of the scheduled appointment.
 */
export async function scheduleAppointment(
  providerId: string,
  start: string,
  end: string
): Promise<Appointment> {
  // TODO: Implement this by calling an API.
  return {
    id: '123',
    providerId: providerId,
    start: start,
    end: end,
  };
}
