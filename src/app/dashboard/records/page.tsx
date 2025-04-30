import HealthOverview from '@/components/dashboard/health-overview'; // Re-use the component for detailed view

export default function HealthRecordsPage() {
  return (
    <div className="container mx-auto py-8">
       <h1 className="text-3xl font-bold mb-6">My Health Records</h1>
       {/* We reuse the HealthOverview component which already has tabs for details */}
      <HealthOverview />
    </div>
  );
}
