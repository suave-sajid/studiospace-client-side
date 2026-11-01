"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";


export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const { name, email, password, confirmPassword } = formData;

    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Registration failed.");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>

      <main className="min-h-[75vh] px-4 py-16">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand">
              Join StudioSpace
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Create your account
            </h1>

            <p className="mt-2 text-sm text-muted">
              Find your creative space or share one with others.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium"
              >
                Full name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
              />
            </div>

            {errorMessage && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {errorMessage}
              </p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>

    </>
  );
}