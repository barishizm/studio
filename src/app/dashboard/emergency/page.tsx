import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, HeartPulse, Phone, User, MapPin, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

// Mock Emergency Data - Replace with data fetched for the logged-in user
const emergencyData = {
  fullName: 'John Doe',
  dateOfBirth: '1985-05-15',
  bloodType: 'O+',
  allergies: ['Penicillin', 'Peanuts'],
  chronicConditions: ['Asthma', 'Hypertension'],
  medications: [
    { name: 'Albuterol Inhaler', dosage: 'As needed' },
    { name: 'Lisinopril', dosage: '10mg daily' },
  ],
  emergencyContacts: [
    { name: 'Jane Doe', relationship: 'Spouse', phone: '555-123-4567' },
    { name: 'Dr. Smith', relationship: 'Primary Care Physician', phone: '555-987-6543' },
  ],
  address: '123 Health St, Wellness City, HC 12345',
  lastCheckup: '2024-03-10',
};


export default function EmergencyDataPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-destructive">
        <AlertTriangle className="mr-2 h-7 w-7" /> Emergency Health Data
      </h1>
      <p className="mb-6 text-muted-foreground">
        This information is crucial in case of an emergency. Review and ensure it is up-to-date.
        This page might be accessible by emergency personnel under specific conditions.
      </p>

      <Card className="shadow-lg border-destructive/50">
        <CardHeader className="bg-destructive/10">
          <CardTitle className="flex items-center">
            <HeartPulse className="mr-2 h-6 w-6" /> Critical Information
          </CardTitle>
           <CardDescription>Vital details for emergency responders.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">

          {/* Personal Details */}
           <section>
             <h3 className="text-lg font-semibold mb-3 flex items-center"><User className="mr-2 h-5 w-5 text-primary"/> Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <p><strong className="text-muted-foreground block">Full Name:</strong> {emergencyData.fullName}</p>
                <p><strong className="text-muted-foreground block">Date of Birth:</strong> {emergencyData.dateOfBirth}</p>
                <p><strong className="text-muted-foreground block">Blood Type:</strong> <Badge variant="secondary" className="text-base">{emergencyData.bloodType}</Badge></p>
            </div>
          </section>

          <Separator />

          {/* Medical Information */}
           <section>
            <h3 className="text-lg font-semibold mb-3 flex items-center"><Activity className="mr-2 h-5 w-5 text-primary"/> Medical Conditions & Allergies</h3>
             <div className="space-y-3 text-sm">
                 <div>
                    <strong className="text-muted-foreground block mb-1">Allergies:</strong>
                     {emergencyData.allergies.length > 0 ? (
                         <div className="flex flex-wrap gap-2">
                            {emergencyData.allergies.map((allergy, index) => (
                                <Badge key={index} variant="destructive">{allergy}</Badge>
                            ))}
                         </div>
                     ) : <span className="text-muted-foreground">None reported</span>}
                 </div>
                 <div>
                    <strong className="text-muted-foreground block mb-1">Chronic Conditions:</strong>
                     {emergencyData.chronicConditions.length > 0 ? (
                         <div className="flex flex-wrap gap-2">
                            {emergencyData.chronicConditions.map((condition, index) => (
                                <Badge key={index} variant="outline">{condition}</Badge>
                            ))}
                         </div>
                     ) : <span className="text-muted-foreground">None reported</span>}
                 </div>
                  <div>
                    <strong className="text-muted-foreground block mb-1">Current Medications:</strong>
                     {emergencyData.medications.length > 0 ? (
                        <ul className="list-disc list-inside space-y-1">
                            {emergencyData.medications.map((med, index) => (
                                <li key={index}>{med.name} ({med.dosage})</li>
                            ))}
                         </ul>
                     ) : <span className="text-muted-foreground">None reported</span>}
                 </div>
                 <p><strong className="text-muted-foreground">Last Checkup:</strong> {emergencyData.lastCheckup}</p>
             </div>
          </section>

           <Separator />

          {/* Emergency Contacts */}
           <section>
             <h3 className="text-lg font-semibold mb-3 flex items-center"><Phone className="mr-2 h-5 w-5 text-primary"/> Emergency Contacts</h3>
            <div className="space-y-3 text-sm">
                {emergencyData.emergencyContacts.map((contact, index) => (
                    <div key={index} className="p-3 border rounded-md bg-background">
                        <p className="font-medium">{contact.name} <span className="text-xs text-muted-foreground">({contact.relationship})</span></p>
                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline">{contact.phone}</a>
                    </div>
                 ))}
             </div>
          </section>

           <Separator />

           {/* Address */}
           <section>
             <h3 className="text-lg font-semibold mb-3 flex items-center"><MapPin className="mr-2 h-5 w-5 text-primary"/> Address</h3>
             <p className="text-sm">{emergencyData.address}</p>
           </section>


          <div className="pt-4 text-center">
            <Button variant="outline">Update Emergency Information</Button>
             <p className="mt-4 text-xs text-muted-foreground">Ensure this information is always accurate. Inaccurate data can be dangerous in an emergency.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
