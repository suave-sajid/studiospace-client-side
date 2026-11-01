"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function AuthTestPage() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const testAuthentication = async () => {
    try {
      setLoading(true);
      setResult(null);

      // Step 1: Get JWT from Better Auth
      const { data, error } = await authClient.token();

      if (error || !data?.token) {
        throw new Error(error?.message || "Unable to get JWT.");
      }

      // Step 2: Send JWT to Express backend
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth-test/me`,
        {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Backend verification failed.");
      }

      setResult(responseData);
    } catch (error) {
      setResult({
        success: false,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-xl px-5 py-20">
      <h1 className="mb-3 text-2xl font-bold">
        JWT Authentication Test
      </h1>

      <p className="mb-6 text-sm text-muted">
        Verify that Express can authenticate your Better Auth user.
      </p>

      <button
        onClick={testAuthentication}
        disabled={loading}
        className="rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
      >
        {loading ? "Verifying..." : "Test Backend Authentication"}
      </button>

      {result && (
        <pre className="mt-6 overflow-x-auto rounded-xl border border-border bg-surface p-4 text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </main>
  );
}