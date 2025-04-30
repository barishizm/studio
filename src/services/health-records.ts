/**
 * Represents a lab result.
 */
export interface LabResult {
  /**
   * The unique identifier for the lab result.
   */
  id: string;
  /**
   * The name of the test.
   */
  testName: string;
  /**
   * The result of the test.
   */
  result: string;
  /**
   * The date the test was performed (ISO format).
   */
  date: string;
}

/**
 * Represents a prescription.
 */
export interface Prescription {
  /**
   * The unique identifier for the prescription.
   */
  id: string;
  /**
   * The name of the medication.
   */
  medicationName: string;
  /**
   * The dosage of the medication.
   */
  dosage: string;
  /**
   * The date the prescription was issued (ISO format).
   */
  date: string;
}

/**
 * Represents a doctor visit.
 */
export interface DoctorVisit {
  /**
   * The unique identifier for the doctor visit.
   */
  id: string;
  /**
   * The name of the doctor.
   */
  doctorName: string;
  /**
   * The date of the visit (ISO format).
   */
  date: string;
  /**
   * The notes from the visit.
   */
  notes: string;
}

/**
 * Asynchronously retrieves a list of lab results for a user.
 *
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of LabResult objects.
 */
export async function getLabResults(userId: string): Promise<LabResult[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      testName: 'Cholesterol',
      result: '200',
      date: '2024-01-01',
    },
    {
      id: '2',
      testName: 'Blood Sugar',
      result: '100',
      date: '2024-01-01',
    },
  ];
}

/**
 * Asynchronously retrieves a list of prescriptions for a user.
 *
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of Prescription objects.
 */
export async function getPrescriptions(userId: string): Promise<Prescription[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      medicationName: 'Lipitor',
      dosage: '10mg',
      date: '2024-01-01',
    },
    {
      id: '2',
      medicationName: 'Metformin',
      dosage: '500mg',
      date: '2024-01-01',
    },
  ];
}

/**
 * Asynchronously retrieves a list of doctor visits for a user.
 *
 * @param userId The ID of the user.
 * @returns A promise that resolves to an array of DoctorVisit objects.
 */
export async function getDoctorVisits(userId: string): Promise<DoctorVisit[]> {
  // TODO: Implement this by calling an API.
  return [
    {
      id: '1',
      doctorName: 'Dr. Smith',
      date: '2024-01-01',
      notes: 'Regular checkup.',
    },
    {
      id: '2',
      doctorName: 'Dr. Jones',
      date: '2024-01-01',
      notes: 'Follow up appointment.',
    },
  ];
}
