"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();


  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    setErrorMessage("");

    try {
      setIsLoading(true);

      const { error } = await authClient.signIn.email({
        email: userData.email.trim(),
        password: userData.password,
        callbackURL: "/",
      });

      if (error) {
        throw new Error(error.message || "Login failed.");
      }

      router.push("/");
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error.message || "Unable to sign in. Please try again."
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
              Welcome back
            </p>

            <h1 className="text-3xl font-bold tracking-tight">
              Sign in to StudioSpace
            </h1>

            <p className="mt-2 text-sm text-muted">
              Continue discovering creative spaces.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
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
                autoComplete="current-password"
                required
                placeholder="Enter your password"
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
              {isLoading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-brand hover:underline"
            >
              Create account
            </Link>
          </p>
        </div>
      </main>

    </>
  );
}