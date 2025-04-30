'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FileText, Pill, Stethoscope, AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

// Assuming services return data in the specified format
import type { LabResult, Prescription, DoctorVisit } from '@/services/health-records';
import { getLabResults, getPrescriptions, getDoctorVisits } from '@/services/health-records';

// Mock user ID - replace with actual user context/ID later
const MOCK_USER_ID = 'user123';

export default function HealthOverview() {
  const [labResults, setLabResults] = useState<LabResult[]>([]);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [doctorVisits, setDoctorVisits] = useState<DoctorVisit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        // Fetch all data concurrently
        const [labs, meds, visits] = await Promise.all([
          getLabResults(MOCK_USER_ID),
          getPrescriptions(MOCK_USER_ID),
          getDoctorVisits(MOCK_USER_ID),
        ]);
        setLabResults(labs);
        setPrescriptions(meds);
        setDoctorVisits(visits);
      } catch (err) {
        console.error("Failed to fetch health data:", err);
        setError("Could not load health records. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

   const renderSkeleton = (rows = 3) => (
    <div className="space-y-2 mt-4">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );

  const formatDate = (dateString: string) => {
    try {
      // Assuming date format is YYYY-MM-DD, adjust if needed
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch {
      return dateString; // Fallback if date is invalid
    }
  };


  if (error) {
    return (
      <Card className="shadow-sm border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-5 w-5" /> Error Loading Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle>Health Records Overview</CardTitle>
        <CardDescription>Summary of your recent lab results, prescriptions, and visits.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="visits">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="visits"><Stethoscope className="h-4 w-4 mr-1 inline-block"/>Visits</TabsTrigger>
            <TabsTrigger value="prescriptions"><Pill className="h-4 w-4 mr-1 inline-block"/>Prescriptions</TabsTrigger>
            <TabsTrigger value="lab_results"><FileText className="h-4 w-4 mr-1 inline-block"/>Lab Results</TabsTrigger>
          </TabsList>

           <TabsContent value="visits">
            {loading ? renderSkeleton() : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Doctor</TableHead>
                    <TableHead>Notes Summary</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {doctorVisits.length > 0 ? doctorVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell className="font-medium">{formatDate(visit.date)}</TableCell>
                      <TableCell>{visit.doctorName}</TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-xs">{visit.notes}</TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No recent visits found.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </TabsContent>

          <TabsContent value="prescriptions">
             {loading ? renderSkeleton() : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.length > 0 ? prescriptions.map((med) => (
                    <TableRow key={med.id}>
                       <TableCell className="font-medium">{formatDate(med.date)}</TableCell>
                      <TableCell>{med.medicationName}</TableCell>
                      <TableCell><Badge variant="secondary">{med.dosage}</Badge></TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No active prescriptions found.</TableCell></TableRow>}
                </TableBody>
              </Table>
             )}
          </TabsContent>

          <TabsContent value="lab_results">
            {loading ? renderSkeleton() : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Result</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                 {labResults.length > 0 ? labResults.map((lab) => (
                    <TableRow key={lab.id}>
                       <TableCell className="font-medium">{formatDate(lab.date)}</TableCell>
                      <TableCell>{lab.testName}</TableCell>
                      <TableCell>
                         {/* Example: Basic indicator - enhance later if needed */}
                        <Badge variant={lab.result.includes('Normal') || parseFloat(lab.result) < 150 ? 'default' : 'destructive'}>
                         {lab.result}
                       </Badge>
                      </TableCell>
                    </TableRow>
                  )) : <TableRow><TableCell colSpan={3} className="text-center text-muted-foreground">No recent lab results found.</TableCell></TableRow>}
                </TableBody>
              </Table>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
