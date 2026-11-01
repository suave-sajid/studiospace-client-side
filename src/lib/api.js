import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(path, options = {}) {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error(
      error?.message || "Please sign in to continue."
    );
  }

  const headers = {
    ...options.headers,
    Authorization: `Bearer ${data.token}`,
  };

  return fetch(`${API_URL}${path}`, {
    ...options,
    headers,
  });
}