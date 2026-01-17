"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    console.log({ email, password });
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100">
      <Image
        src="/images/smartbremen-bg.png"
        alt="Background of Bremen"
        fill
        priority
        sizes="100vw"
        className="object-cover relative z-10"
      />

      <div className="flex flex-row-reverse items-center gap-5 bg-white rounded-2xl shadow-2xl px-6 py-10 relative z-20">
        <div className="w-[350px]">
          <Image
            src="/images/windmill1.gif"
            alt=""
            width={300}
            height={160}
            className="rounded-full w-full h-auto"
            priority
          />
        </div>
        <div className="w-px rounded-xl bg-gray-300 h-80 ml-4" />
        <form onSubmit={handleSubmit} className="w-xs">
          <h1 className="text-2xl font-semibold mb-6 text-center">REGISTER</h1>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90"
          >
            Sign up
          </button>

          <p className="mt-4 text-sm text-center">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
