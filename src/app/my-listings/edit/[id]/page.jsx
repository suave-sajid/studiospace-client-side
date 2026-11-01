"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { apiFetch } from "@/lib/api";

const categories = [
  "Photo Studio",
  "Film Stage",
  "Podcast Lounge",
  "Music Suite",
  "Workshop",
];

const initialForm = {
  title: "",
  category: "Photo Studio",
  hourlyRate: "",
  securityDeposit: "",
  maxCapacity: "",
  address: "",
  city: "",
  image: "",
  amenities: "",
  overview: "",
};

export default function EditStudioPage() {
  const router = useRouter();
  const params = useParams();
  const studioId = params.id;

  const { data: session, isPending } = authClient.useSession();

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Redirect unauthenticated users
  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/login");
    }
  }, [isPending, session, router]);

  // Fetch existing studio data
  useEffect(() => {
    if (isPending || !session || !studioId) return;

    let cancelled = false;

    const fetchStudio = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await apiFetch(
          `/api/studios/${studioId}`
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result.message || "Failed to load studio."
          );
        }

        const studio = result.data;

        // Client-side ownership check for the editing UI.
        if (studio.ownerId !== session.user.id) {
          throw new Error(
            "You are not authorized to edit this studio."
          );
        }

        if (!cancelled) {
          setForm({
            title: studio.title || "",
            category: studio.category || "Photo Studio",
            hourlyRate: String(studio.hourlyRate ?? ""),
            securityDeposit: String(studio.securityDeposit ?? ""),
            maxCapacity: String(studio.maxCapacity ?? ""),
            address: studio.location?.address || "",
            city: studio.location?.city || "",
            image: studio.image || "",
            amenities: (studio.amenities || []).join(", "),
            overview: studio.overview || "",
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchStudio();

    return () => {
      cancelled = true;
    };
  }, [isPending, session, studioId]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");

    try {
      const studioData = {
        title: form.title.trim(),
        category: form.category,
        hourlyRate: Number(form.hourlyRate),
        securityDeposit: Number(form.securityDeposit),
        maxCapacity: Number(form.maxCapacity),
        location: {
          address: form.address.trim(),
          city: form.city.trim(),
        },
        image: form.image.trim(),
        amenities: form.amenities
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        overview: form.overview.trim(),
      };

      const response = await apiFetch(
        `/api/studios/${studioId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(studioData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        const validationMessage = result.errors
          ?.map((item) => `${item.field}: ${item.message}`)
          .join(", ");

        throw new Error(
          validationMessage || result.message || "Update failed."
        );
      }

      router.push("/my-listings");
      router.refresh();
    } catch (err) {
      setError(err.message || "Failed to update studio.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending || !session || loading) {
    return (
      <main className="min-h-screen bg-canvas px-5 py-20">
        <div className="mx-auto max-w-3xl animate-pulse space-y-5">
          <div className="h-8 w-48 rounded bg-border" />
          <div className="h-12 rounded bg-border" />
          <div className="h-12 rounded bg-border" />
          <div className="h-40 rounded bg-border" />
        </div>
      </main>
    );
  }

  if (error && !form.title) {
    return (
      <main className="min-h-screen bg-canvas px-5 py-20">
        <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-8">
          <h1 className="text-xl font-semibold">
            Unable to load studio
          </h1>

          <p className="mt-3 text-sm text-red-600">{error}</p>

          <Link
            href="/my-listings"
            className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand"
          >
            <ArrowLeft size={16} />
            Back to My Listings
          </Link>
        </div>
      </main>
    );
  }

  const inputClass =
    "form-input w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-ink outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-ink";

  return (
    <main className="min-h-screen bg-canvas px-5 py-12">
      <div className="mx-auto max-w-3xl">

        <Link
          href="/my-listings"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition hover:text-brand"
        >
          <ArrowLeft size={16} />
          Back to My Listings
        </Link>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand">
            Studio Management
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Edit your studio
          </h1>

          <p className="mt-2 text-sm text-muted">
            Update your studio information and keep your listing accurate.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
        >

          {/* Basic Information */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold">
              Basic Information
            </h2>

            <div>
              <label className={labelClass}>Studio Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                minLength={5}
                maxLength={100}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputClass}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Description</label>
              <textarea
                name="overview"
                value={form.overview}
                onChange={handleChange}
                required
                minLength={20}
                maxLength={3000}
                rows={5}
                className={inputClass}
              />
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Pricing */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold">
              Pricing & Capacity
            </h2>

            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Hourly Rate ($)</label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={form.hourlyRate}
                  onChange={handleChange}
                  min="1"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Security Deposit ($)</label>
                <input
                  type="number"
                  name="securityDeposit"
                  value={form.securityDeposit}
                  onChange={handleChange}
                  min="0"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Max Capacity</label>
                <input
                  type="number"
                  name="maxCapacity"
                  value={form.maxCapacity}
                  onChange={handleChange}
                  min="1"
                  required
                  className={inputClass}
                />
              </div>
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Location */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold">Location</h2>

            <div>
              <label className={labelClass}>Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>
          </section>

          <div className="border-t border-border" />

          {/* Media and Amenities */}
          <section className="space-y-5">
            <h2 className="text-lg font-semibold">
              Media & Amenities
            </h2>

            <div>
              <label className={labelClass}>Cover Image URL</label>
              <input
                type="url"
                name="image"
                value={form.image}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Amenities
              </label>
              <input
                name="amenities"
                value={form.amenities}
                onChange={handleChange}
                placeholder="WiFi, Lighting, Microphone"
                className={inputClass}
              />
              <p className="mt-2 text-xs text-muted">
                Separate each amenity with a comma.
              </p>
            </div>
          </section>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/my-listings"
              className="rounded-xl border border-border px-6 py-3 text-center text-sm font-semibold transition hover:bg-canvas"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 size={17} className="animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={17} />
                  Save Changes
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}