"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
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
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gray-100 lg:min-h-[calc(100vh-80px)]">
      <Image
        src="/images/smartbremen-bg.png"
        alt="Background of Bremen"
        fill
        priority
        sizes="100vw"
        className="object-cover relative z-10"
      />

      <div className="flex flex-col items-center gap-5 bg-white rounded-2xl shadow-2xl px-6 py-10 relative z-20 my-5 lg:flex-row-reverse">
        <div className="w-[250px] lg:w-[350px]">
          <Image
            src="/images/windmill.gif"
            alt=""
            width={300}
            height={160}
            className="rounded-full w-full h-auto"
            priority
          />
        </div>
        <div className="w-[80%] rounded-xl bg-gray-300 h-px mr-3 lg:w-px lg:h-80" />
        <form onSubmit={handleSubmit} className="w-xs">
          <h1 className="text-lg font-semibold mb-6 uppercase text-center lg:text-2xl">
            REGISTER
          </h1>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1 lg:text-sm">
              Full Name
            </label>
            <input
              type="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1 lg:text-sm">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium mb-1 lg:text-sm">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-xs font-medium mb-1 lg:text-sm">
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
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-90 text-sm lg:text-base"
          >
            Sign up
          </button>

          <p className="mt-4 text-xs text-center lg:text-sm">
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
