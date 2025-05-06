import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { LifeBuoy, MessageSquare, FileQuestion, Phone } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqItems = [
  {
    question: "How do I reset my password?",
    answer: "You can reset your password by going to the login page and clicking on the 'Forgot Password' link. Follow the instructions sent to your email."
  },
  {
    question: "How can I update my profile information?",
    answer: "Navigate to the 'Profile' page from the dashboard sidebar. You'll find an 'Edit Profile' button to update your details."
  },
  {
    question: "Where can I see my past appointments?",
    answer: "Your past and upcoming appointments are listed on the 'Appointments' page. You can also find summaries in your 'Health Records'."
  },
  {
    question: "Is my health data secure?",
    answer: "Yes, we prioritize your data security. We use industry-standard encryption and security protocols to protect your information. For more details, please review our Privacy Policy."
  }
];

export default function SupportPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-8">
        <LifeBuoy className="h-8 w-8 mr-3 text-primary" />
        <h1 className="text-3xl font-bold">Support Center</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center"><MessageSquare className="mr-2 h-6 w-6" /> Contact Support</CardTitle>
              <CardDescription>
                Have a question or need assistance? Fill out the form below, and our team will get back to you shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input id="subject" placeholder="e.g., Issue with appointment scheduling" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" placeholder="Describe your issue or question in detail..." rows={5} />
                </div>
                <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Quick Help & FAQ */}
        <div className="md:col-span-1 space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center"><FileQuestion className="mr-2 h-5 w-5" /> FAQs</CardTitle>
              <CardDescription>Find answers to common questions.</CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem value={`item-${index}`} key={index}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>

          <Card className="shadow-sm bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center text-primary"><Phone className="mr-2 h-5 w-5" /> Direct Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>
                For urgent matters, you can reach us at:
              </p>
              <p className="font-semibold">
                Phone: <a href="tel:+18005551234" className="hover:underline">+1 (800) 555-1234</a>
              </p>
              <p className="text-xs text-muted-foreground">
                Available Mon-Fri, 9 AM - 5 PM (EST)
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}