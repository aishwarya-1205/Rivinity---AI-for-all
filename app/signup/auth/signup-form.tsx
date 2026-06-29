"use client";

import * as React from "react";
import { useState } from "react";
import { Lock, Mail, User, ArrowRight, Eye, EyeOff } from "lucide-react";
import confetti from "canvas-confetti";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Confetti side cannons for successful login or registration
const fireSideCannons = () => {
  const end = Date.now() + 2 * 1000;
  const colors = ["#ff7a18", "#6c63ff", "#ffae19", "#a786ff"];

  const frame = () => {
    if (Date.now() > end) return;
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      startVelocity: 55,
      origin: { x: 0, y: 0.6 },
      colors,
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      startVelocity: 55,
      origin: { x: 1, y: 0.6 },
      colors,
    });
    requestAnimationFrame(frame);
  };
  frame();
};

interface AuthFormProps {
  isSignUp: boolean;
  onToggle: () => void;
}

export function SignUpForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <AuthForm isSignUp={isSignUp} onToggle={() => setIsSignUp((v) => !v)} />
  );
}

function AuthForm({ isSignUp, onToggle }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (emailStr: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (isSignUp && !fullName.trim()) {
      setError("Please enter your full name.");
      setIsLoading(false);
      return;
    }
    if (!email || !password) {
      setError("Please fill in all fields.");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      fireSideCannons(); // fires on both login and sign-up
    }, 1200);
  };

  if (isSuccess) {
    return (
      <div className="w-full flex flex-col items-center justify-center space-y-6 text-center py-8 animate-in fade-in zoom-in-95 duration-500">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-2 shadow-inner"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,122,24,0.12) 0%, rgba(108,99,255,0.12) 100%)",
            border: "1px solid rgba(255,122,24,0.2)",
          }}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="url(#successGrad)"
            viewBox="0 0 24 24"
          >
            <defs>
              <linearGradient
                id="successGrad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff7a18" />
                <stop offset="100%" stopColor="#6c63ff" />
              </linearGradient>
            </defs>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {isSignUp ? "Welcome aboard!" : "Welcome back!"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
            {isSignUp
              ? `Account created for ${fullName}. Redirecting to your workspace...`
              : "Authentication successful. Entering your Rivinity console..."}
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className="flex items-center justify-center gap-2 h-12 px-8 rounded-full font-semibold text-white text-sm shadow-lg transition-all hover:opacity-90 active:scale-95"
          style={{
            background: "linear-gradient(135deg, #ff7a18 0%, #6c63ff 100%)",
          }}
        >
          Go to Console
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Title */}
      <h2 className="text-[28px] font-bold tracking-tight text-gray-900 dark:text-white mb-7">
        {isSignUp ? "Create your account" : "Log in to your account"}
      </h2>

      {/* Social Login Buttons Stack */}
      <div className="flex flex-col gap-2.5 w-full mb-6">
        {/* Google */}
        <button type="button" className="auth-social-btn group">
          <svg className="w-5 h-5 mr-3 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.327 0-6.023-2.697-6.023-6.023 0-3.327 2.696-6.023 6.023-6.023 1.488 0 2.842.542 3.896 1.435l3.11-3.11C18.966 2.628 15.827 1.5 12.24 1.5 6.42 1.5 1.7 6.22 1.7 12s4.72 10.5 10.54 10.5c5.96 0 10.38-4.18 10.38-10.5 0-.71-.06-1.285-.18-1.715H12.24z"
            />
          </svg>
          {isSignUp ? "Sign up with Google" : "Sign in with Google"}
        </button>

        {/* Facebook */}
        <button type="button" className="auth-social-btn group">
          <svg
            className="w-5 h-5 mr-3 shrink-0"
            fill="#1877F2"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          {isSignUp ? "Sign up with Facebook" : "Sign in with Facebook"}
        </button>

        {/* GitHub */}
        <button type="button" className="auth-social-btn group">
          <svg
            className="w-5 h-5 mr-3 shrink-0"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
          {isSignUp ? "Sign up with GitHub" : "Sign in with GitHub"}
        </button>

        {/* SSO */}
        <button type="button" className="auth-social-btn group">
          <svg
            className="w-5 h-5 mr-3 shrink-0 text-[#6c63ff]"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          {isSignUp ? "Sign up with SSO" : "Sign in with SSO"}
        </button>
      </div>

      {/* Divider */}
      <div className="flex items-center w-full my-5">
        <div className="flex-grow border-t border-gray-200 dark:border-neutral-800" />
        <span className="mx-4 text-xs font-medium text-neutral-400 dark:text-neutral-500">
          Or continue with email
        </span>
        <div className="flex-grow border-t border-gray-200 dark:border-neutral-800" />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        {isSignUp && (
          <div className="space-y-1.5">
            <Label
              htmlFor="fullName"
              className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
            >
              Full Name
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
                <User className="w-4 h-4" />
              </span>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                type="text"
                value={fullName}
                className="pl-9 h-11 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border-gray-200 dark:border-neutral-800 focus-visible:ring-0 focus-visible:border-[#ff7a18] transition"
                onChange={(e) => setFullName(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
          >
            Email
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <Mail className="w-4 h-4" />
            </span>
            <Input
              id="email"
              placeholder="Enter your email address"
              type="email"
              value={email}
              className="pl-9 h-11 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border-gray-200 dark:border-neutral-800 focus-visible:ring-0 focus-visible:border-[#ff7a18] transition"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              className="text-xs font-semibold text-neutral-700 dark:text-neutral-300"
            >
              Password
            </Label>
            {!isSignUp && (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-xs text-neutral-500 dark:text-neutral-400 hover:text-[#ff7a18] dark:hover:text-[#ff7a18] font-medium transition"
              >
                Forgot password
              </a>
            )}
          </div>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none">
              <Lock className="w-4 h-4" />
            </span>
            <Input
              id="password"
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              value={password}
              className="pl-9 pr-10 h-11 rounded-lg bg-neutral-50 dark:bg-neutral-900/60 border-gray-200 dark:border-neutral-800 focus-visible:ring-0 focus-visible:border-[#ff7a18] transition"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 transition"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="text-xs text-red-500 font-semibold animate-in fade-in slide-in-from-top-1">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-11 mt-2 rounded-full font-semibold text-white text-sm shadow-md hover:shadow-lg transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #ff7a18 0%, #6c63ff 100%)",
          }}
        >
          {isLoading ? (
            <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : isSignUp ? (
            "Create account"
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-center text-sm text-neutral-500 dark:text-neutral-400 mt-4 font-medium">
          {isSignUp ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={onToggle}
                className="text-neutral-900 dark:text-white hover:underline font-bold"
              >
                Sign in
              </button>
            </>
          ) : (
            <>
              Don&apos;t have an account?{" "}
              <button
                type="button"
                onClick={onToggle}
                className="text-neutral-900 dark:text-white hover:underline font-bold"
              >
                Sign up
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  );
}
