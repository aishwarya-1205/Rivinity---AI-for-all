"use client";

import { useState } from "react";
import { SignUpForm } from "@/app/signup/auth/signup-form";
import Image from "next/image";
import Link from "next/link";

/* ─── Page ─────────────────────────────────────────────────────── */
export default function SignUpPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-[#f8f7f5] dark:bg-[#0d0d14] p-4 sm:p-6 md:p-8 transition-colors duration-300">
      {/* Outer glass card */}
      <div className="w-full max-w-[980px] min-h-[600px] rounded-[28px] overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30 flex flex-col md:flex-row bg-white dark:bg-[#111127] border border-neutral-200/70 dark:border-white/[0.06]">
        {/* ── LEFT PANEL ──────────────────────────────────────────────── */}
        <div className="flex-1 flex flex-col p-8 md:p-10 lg:p-12 overflow-y-auto">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 mb-10 shrink-0 group w-fit"
          >
            <div className="relative h-9 w-9 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="Rivinity"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
              Rivinity
            </span>
          </Link>

          {/* Form */}
          <div className="flex-1 flex items-center justify-center md:justify-start">
            <div className="w-full max-w-[400px]">
              <SignUpForm />
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL ─────────────────────────────────────────────── */}
        <div
          className="hidden md:block w-[420px] lg:w-[460px] shrink-0"
          style={{
            background:
              "linear-gradient(145deg, #ff7a18 0%, #d45a10 25%, #9c55d0 60%, #6c63ff 100%)",
            opacity: 0.85,
          }}
        />
      </div>

      {/* Social button styles */}
      <style>{`
        .auth-social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          height: 44px;
          padding: 0 16px;
          font-size: 13px;
          font-weight: 600;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          background: #fff;
          color: #374151;
          transition: background 0.15s, box-shadow 0.15s;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
        }
        .auth-social-btn:hover {
          background: #f9fafb;
          box-shadow: 0 2px 8px rgba(0,0,0,0.07);
        }
        .dark .auth-social-btn {
          background: #18181b;
          border-color: #27272a;
          color: #e4e4e7;
        }
        .dark .auth-social-btn:hover {
          background: #1f1f23;
        }
      `}</style>
    </main>
  );
}
