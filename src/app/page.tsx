import LoginForm from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-24 bg-gradient-to-br from-primary/30 via-background to-background">
       <div className="w-full max-w-md">
         <LoginForm />
       </div>
    </main>
  );
}
