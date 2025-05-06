
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Mail, Phone, Edit3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

// Mock User Data - Replace with actual data fetching for the logged-in user
const userProfile = {
  name: 'John Doe',
  email: 'user@healthhub.com',
  phone: '555-0101',
  memberSince: '2023-01-15',
  profilePictureUrl: 'https://picsum.photos/128/128', 
  bio: 'Passionate about proactive health management and leveraging technology for wellness. Regular runner and avid reader of medical journals.',
  address: {
    street: '123 Wellness Ave',
    city: 'Healthville',
    state: 'HS',
    zip: '90210',
  },
};

export default function ProfilePage() {
  return (
    <div className="container mx-auto py-8">
      <Card className="shadow-lg max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-32 h-32 mx-auto mb-4 border-4 border-primary shadow-md">
            <AvatarImage src={userProfile.profilePictureUrl} alt={userProfile.name} data-ai-hint="profile picture" />
            <AvatarFallback className="text-4xl">
              {userProfile.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-bold">{userProfile.name}</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">{userProfile.email}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
          <div className="flex justify-end">
            <Button variant="outline">
              <Edit3 className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          </div>
          
          <Separator />

          <section className="space-y-3">
            <h3 className="text-xl font-semibold text-primary">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <User className="mr-3 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Full Name</p>
                  <p className="text-muted-foreground">{userProfile.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Mail className="mr-3 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email Address</p>
                  <p className="text-muted-foreground">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="mr-3 h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Phone Number</p>
                  <p className="text-muted-foreground">{userProfile.phone}</p>
                </div>
              </div>
               <div>
                  <p className="font-medium flex items-center"><User className="mr-3 h-5 w-5 text-muted-foreground"/>Member Since</p>
                  <p className="text-muted-foreground pl-8">{new Date(userProfile.memberSince).toLocaleDateString()}</p>
                </div>
            </div>
          </section>

          <Separator />

          <section className="space-y-3">
            <h3 className="text-xl font-semibold text-primary">Address</h3>
            <p className="text-sm text-muted-foreground">
              {userProfile.address.street}, {userProfile.address.city}, {userProfile.address.state} {userProfile.address.zip}
            </p>
          </section>
          
          <Separator />

          <section className="space-y-3">
            <h3 className="text-xl font-semibold text-primary">Bio</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {userProfile.bio || 'No bio provided.'}
            </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
