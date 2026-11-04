
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);

    const {name, email, password, image} = Object.fromEntries(formData.entries());

    // Password validation
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setErrorMessage(
        "Password must contain at least one uppercase letter."
      );
      return;
    }

    if (!/[a-z]/.test(password)) {
      setErrorMessage(
        "Password must contain at least one lowercase letter."
      );
      return;
    }

    // Validate photo URL if provided
    if (image && image.trim()) {
      try {
        new URL(image);
      } catch {
        setErrorMessage("Please enter a valid photo URL.");
        return;
      }
    }

    try {
      setIsLoading(true);

      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
        image: image.trim() || undefined,
      });

      if (error) {
        throw new Error(error.message || "Registration failed.");
      }

      router.push("/login");
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
    <main className="min-h-[75vh] px-4 py-16">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">

        {/* Header */}
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

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
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
              minLength={3}
              maxLength={100}
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
            />
          </div>

          {/* Email */}
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

          {/* Photo URL */}
          <div>
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium"
            >
              Profile Photo URL
              <span className="ml-1 text-muted">(Optional)</span>
            </label>

            <input
              id="image"
              name="image"
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
            />

            <p className="mt-1 text-xs text-muted">
              Add a link to your profile image.
            </p>
          </div>

          {/* Password */}
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
              minLength={6}
              placeholder="Create a password"
              className="w-full rounded-lg border border-border bg-canvas px-4 py-3 text-sm outline-none transition focus:border-brand"
            />

            <p className="mt-1 text-xs text-muted">
              Minimum 6 characters, including uppercase and lowercase letters.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p
              role="alert"
              className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Login Link */}
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
  );
}
