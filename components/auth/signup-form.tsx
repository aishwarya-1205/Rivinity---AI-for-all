"use client"

import * as React from "react"
import { useState } from "react"
import { LogIn, Lock, Mail, User, ArrowRight } from "lucide-react"
import confetti from "canvas-confetti"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const SignUpForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Simulate validation/API call
    if (!email || !password || !fullName) {
      setError("Please fill in all fields.")
      setIsLoading(false)
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      setIsLoading(false)
      return
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.")
      setIsLoading(false)
      return
    }

    // Success simulation
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      
      // Trigger Confetti
      const duration = 5 * 1000
      const animationEnd = Date.now() + duration
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

      const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now()

        if (timeLeft <= 0) {
          return clearInterval(interval)
        }

        const particleCount = 50 * (timeLeft / duration)
        // since particles fall down, start a bit higher than random
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } })
      }, 250)
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-4 animate-in fade-in zoom-in duration-500 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome, {fullName}!</h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs">
          Your account has been created successfully. Redirecting you to the dashboard...
        </p>
        <Button 
          className="mt-4"
          onClick={() => window.location.href = "/"}
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full max-w-sm bg-gradient-to-b from-sky-50/50 to-white dark:from-gray-900 dark:to-black rounded-3xl shadow-2xl shadow-blue-500/10 p-8 flex flex-col items-center border border-blue-100 dark:border-gray-800 transition-all duration-300">
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-white dark:bg-gray-800 mb-6 shadow-lg shadow-black/5 dark:shadow-none">
        <LogIn className="w-7 h-7 text-black dark:text-white" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-2 text-center text-gray-900 dark:text-white">
        Create your account
      </h2>
      <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 text-center">
        Join the global intelligence infrastructure and start building today.
      </p>

      <form onSubmit={handleSignUp} className="w-full flex flex-col gap-4">
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">
            Full Name
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <User className="w-4 h-4" />
            </span>
            <Input
              id="fullName"
              placeholder="John Doe"
              type="text"
              value={fullName}
              className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all"
              onChange={(e) => setFullName(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">
            Email address
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Mail className="w-4 h-4" />
            </span>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              value={email}
              className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" disabled={isLoading} className="text-xs font-medium text-gray-700 dark:text-gray-300 ml-1">
            Password
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Lock className="w-4 h-4" />
            </span>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              className="pl-10 h-11 rounded-xl border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-medium ml-1 animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        <Button
          type="submit"
          className="w-full bg-black dark:bg-white text-white dark:text-black font-semibold h-11 rounded-xl hover:opacity-90 transition-all mt-2 active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Get Started"}
        </Button>

        <div className="flex items-center w-full my-4">
          <div className="flex-grow border-t border-dashed border-gray-200 dark:border-gray-800"></div>
          <span className="mx-3 text-[10px] uppercase tracking-wider font-bold text-gray-400">
            Or continue with
          </span>
          <div className="flex-grow border-t border-dashed border-gray-200 dark:border-gray-800"></div>
        </div>

        <div className="flex gap-3 w-full">
          <button type="button" className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-1 shadow-sm">
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          </button>
          <button type="button" className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-1 shadow-sm">
            <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5" />
          </button>
          <button type="button" className="flex items-center justify-center h-12 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex-1 shadow-sm">
            <img src="https://www.svgrepo.com/show/511330/apple-173.svg" alt="Apple" className="w-5 h-5 dark:invert" />
          </button>
        </div>

        <p className="text-center text-xs text-gray-500 mt-6 font-medium">
          Already have an account?{" "}
          <button type="button" className="text-black dark:text-white hover:underline font-bold">
            Sign in
          </button>
        </p>
      </form>
    </div>
  )
}

export { SignUpForm }
