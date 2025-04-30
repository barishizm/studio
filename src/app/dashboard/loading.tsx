import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 p-4 md:p-6 lg:p-8">
      {/* Skeleton for Health Overview */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent className="space-y-4">
             <Skeleton className="h-10 w-full" /> {/* Tabs Skeleton */}
             <div className="space-y-2 mt-4">
                {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 p-2 border-b">
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Skeleton for Appointment Scheduling & Side Card */}
       <div className="lg:col-span-1 space-y-6">
        <Card>
            <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" /> {/* Provider Select */}
                <Skeleton className="h-10 w-full" /> {/* Date Picker */}
                <Skeleton className="h-24 w-full" /> {/* Time Slots */}
                <Skeleton className="h-10 w-full" /> {/* Button */}
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                 <Skeleton className="h-5 w-1/3" />
            </CardHeader>
            <CardContent>
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-5/6 mt-2" />
            </CardContent>
         </Card>
       </div>
    </div>
  );
}
