"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Stethoscope } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

// Dummy authentication function (replace with actual logic)
async function authenticateUser(data: LoginFormValues): Promise<boolean> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  // Basic check - replace with real authentication
  return data.email === "user@healthhub.com" && data.password === "password123";
}

export default function LoginForm() {
  const router = useRouter();
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange", // Validate on change for better UX
  });

  async function onSubmit(data: LoginFormValues) {
    form.clearErrors(); // Clear previous errors
    form.control._disableForm(true); // Disable form during submission

    try {
      const isAuthenticated = await authenticateUser(data);

      if (isAuthenticated) {
        toast({
          title: "Login Successful",
          description: "Redirecting to your dashboard...",
          variant: "default", // Use 'default' which maps to the green accent in our theme
        });
        // Redirect to the dashboard page after successful login
        router.push('/dashboard');
      } else {
        form.setError("root", { message: "Invalid email or password." }); // Set a general error
         toast({
          title: "Login Failed",
          description: "Invalid email or password.",
          variant: "destructive",
        });
      }
    } catch (error) {
       form.setError("root", { message: "An unexpected error occurred. Please try again." });
       toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      form.control._disableForm(false); // Re-enable form
    }
  }

  return (
     <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="items-center text-center">
         <div className="p-3 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Stethoscope className="h-8 w-8 text-primary" />
         </div>
        <CardTitle className="text-2xl font-bold">HealthHub Login</CardTitle>
        <CardDescription>Access your personal health dashboard</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} type="email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             {form.formState.errors.root && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.root.message}</p>
            )}
             <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="text-center text-sm text-muted-foreground">
        <p>Don't have an account? Contact support.</p>
      </CardFooter>
    </Card>
  );
}
