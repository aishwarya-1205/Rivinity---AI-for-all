import { SignUpForm } from "@/components/auth/signup-form"

export default function SignUpPage() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-white dark:bg-black overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="z-10 w-full flex items-center justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
        <SignUpForm />
      </div>
      
      {/* Footer-like text */}
      <p className="mt-8 text-sm text-gray-400 dark:text-gray-600 z-10 font-medium">
        © {new Date().getFullYear()} Rivinity AI. All rights reserved.
      </p>
    </main>
  )
}
