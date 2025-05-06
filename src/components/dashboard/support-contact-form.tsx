"use client";

import type React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function SupportContactForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic, e.g., using Server Actions or an API call.
    // For now, this just prevents default and logs to console.
    // Consider using react-hook-form for more complex validation and state management.
    console.log("Support form submission prevented. Implement actual submission.");
    alert("Form submitted (placeholder - check console for details).");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <Label htmlFor="support-form-name">Full Name</Label>
          <Input id="support-form-name" placeholder="John Doe" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="support-form-email">Email Address</Label>
          <Input id="support-form-email" type="email" placeholder="you@example.com" />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="support-form-subject">Subject</Label>
        <Input id="support-form-subject" placeholder="e.g., Issue with appointment scheduling" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="support-form-message">Message</Label>
        <Textarea id="support-form-message" placeholder="Describe your issue or question in detail..." rows={5} />
      </div>
      <Button type="submit" className="w-full sm:w-auto">Send Message</Button>
    </form>
  );
}
