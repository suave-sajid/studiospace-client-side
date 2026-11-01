"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { apiFetch } from "@/lib/api";
import { authClient } from "@/lib/auth-client";


const initialForm = {
    title: "",
    category: "Photo Studio",
    hourlyRate: "",
    securityDeposit: "0",
    maxCapacity: "1",
    address: "",
    city: "Chattogram",
    image: "",
    overview: "",
    amenities: "",
};

const categories = [
    "Photo Studio",
    "Film Stage",
    "Podcast Lounge",
    "Music Suite",
    "Workshop",
];

export default function AddStudioPage() {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const [form, setForm] = useState(initialForm);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

      useEffect(() => {
        if (!isPending && !session?.user) {
            router.replace("/login");
        }
    }, [isPending, session, router]);

    if (isPending || !session?.user) {
        return (
            <main className="flex min-h-screen items-center justify-center">
                <p className="text-sm text-muted">Checking your session...</p>
            </main>
        );
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

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
            gallery: [],
            amenities: form.amenities
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            overview: form.overview.trim(),
        };

        if (
            !studioData.title ||
            !studioData.location.address ||
            !studioData.location.city
        ) {
            setErrorMessage("Please complete all required fields.");
            return;
        }

        if (
            !Number.isFinite(studioData.hourlyRate) ||
            studioData.hourlyRate <= 0
        ) {
            setErrorMessage("Enter a valid hourly rate.");
            return;
        }

        if (
            !Number.isFinite(studioData.securityDeposit) ||
            studioData.securityDeposit < 0
        ) {
            setErrorMessage("Enter a valid security deposit.");
            return;
        }

        if (
            !Number.isInteger(studioData.maxCapacity) ||
            studioData.maxCapacity < 1
        ) {
            setErrorMessage("Maximum capacity must be at least 1.");
            return;
        }

        try {
            setIsSubmitting(true);

            const response = await apiFetch("/api/studios", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(studioData),
            });

            const result = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(result.message || "Unable to create studio.");
            }

            router.push("/dashboard");
            router.refresh();
        } catch (error) {
            setErrorMessage(
                error.message || "Something went wrong. Please try again."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        

            <main className="min-h-screen px-4 py-12">
                <div className="mx-auto max-w-3xl">
                    <Link
                        href="/dashboard"
                        className="text-sm font-medium text-muted hover:text-brand"
                    >
                        ← Back to dashboard
                    </Link>

                    <div className="mb-8 mt-5">
                        <p className="text-sm font-medium uppercase tracking-wider text-brand">
                            Become a host
                        </p>

                        <h1 className="mt-2 text-3xl font-bold">
                            List your creative space
                        </h1>

                        <p className="mt-2 text-sm text-muted">
                            Share your studio with creators looking for their next space.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 rounded-2xl border border-border bg-surface p-6 sm:p-8"
                    >
                        <FormField label="Studio title">
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                minLength={5}
                                maxLength={100}
                                placeholder="e.g. Modern Photography Studio"
                                className="form-input"
                            />
                        </FormField>

                        <FormField label="Studio category">
                            <select
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                                className="form-input"
                            >
                                {categories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </FormField>

                        <div className="grid gap-5 sm:grid-cols-3">
                            <FormField label="Hourly rate">
                                <input
                                    name="hourlyRate"
                                    type="number"
                                    min="1"
                                    step="0.01"
                                    value={form.hourlyRate}
                                    onChange={handleChange}
                                    required
                                    placeholder="35"
                                    className="form-input"
                                />
                            </FormField>

                            <FormField label="Security deposit">
                                <input
                                    name="securityDeposit"
                                    type="number"
                                    min="0"
                                    step="0.01"
                                    value={form.securityDeposit}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </FormField>

                            <FormField label="Max capacity">
                                <input
                                    name="maxCapacity"
                                    type="number"
                                    min="1"
                                    step="1"
                                    value={form.maxCapacity}
                                    onChange={handleChange}
                                    required
                                    className="form-input"
                                />
                            </FormField>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2">
                            <FormField label="Address / Area">
                                <input
                                    name="address"
                                    value={form.address}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Khulshi"
                                    className="form-input"
                                />
                            </FormField>

                            <FormField label="City">
                                <input
                                    name="city"
                                    value={form.city}
                                    onChange={handleChange}
                                    required
                                    placeholder="Chattogram"
                                    className="form-input"
                                />
                            </FormField>
                        </div>

                        <FormField label="Cover image URL">
                            <input
                                name="image"
                                type="url"
                                value={form.image}
                                onChange={handleChange}
                                required
                                placeholder="https://example.com/studio-image.jpg"
                                className="form-input"
                            />
                        </FormField>

                        <FormField label="Amenities">
                            <input
                                name="amenities"
                                value={form.amenities}
                                onChange={handleChange}
                                placeholder="WiFi, Lighting, Air Conditioning"
                                className="form-input"
                            />
                            <p className="mt-2 text-xs text-muted">
                                Separate each amenity with a comma.
                            </p>
                        </FormField>

                        <FormField label="Studio description">
                            <textarea
                                name="overview"
                                value={form.overview}
                                onChange={handleChange}
                                required
                                minLength={20}
                                maxLength={3000}
                                rows={6}
                                placeholder="Describe your space, equipment, atmosphere and what makes it special..."
                                className="form-input resize-y"
                            />
                        </FormField>

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
                            disabled={isSubmitting}
                            className="w-full rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSubmitting ? "Publishing..." : "Publish Studio"}
                        </button>
                    </form>
                </div>
            </main>

       
        </>
    );
}

function FormField({ label, children }) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium">
                {label}
            </label>

            {children}
        </div>
    );
}