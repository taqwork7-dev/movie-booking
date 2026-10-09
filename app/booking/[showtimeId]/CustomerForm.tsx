"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Seat = {
  id: string;
  row: string;
  number: number;
};

type CustomerFormProps = {
  showtimeId: string;
  selectedSeats: Seat[];
  totalAmount: number;
  onBack: () => void;
};

export default function CustomerForm({
  showtimeId,
  selectedSeats,
  totalAmount,
  onBack,
}: CustomerFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          showtimeId,
          customerName: name,
          customerEmail: email,
          seatIds: selectedSeats.map((seat) => seat.id),
        }),
      });

      const data = await response.json();

      if (response.status === 409) {
        setError(
          "Some selected seats have just been booked. Please choose different seats.",
        );

        return;
      }

      if (!response.ok) {
        setError(
          data.message || "Failed to create booking.",
        );

        return;
      }

      router.push(`/booking-success/${data.id}`);
    } catch {
      setError(
        "Unable to connect to the server. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      {/* Header */}
      <div className="mb-8">
        <button
          type="button"
          onClick={onBack}
          disabled={isSubmitting}
          className="text-sm text-gray-500 transition hover:text-white disabled:opacity-50"
        >
          ← Back to seats
        </button>

        <p className="mt-8 text-sm font-medium uppercase tracking-widest text-gray-500">
          Almost there
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight">
          Your Information
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Enter your contact information to complete the
          booking.
        </p>
      </div>

      {/* Booking summary */}
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
            Selected seats
          </p>

          <p className="mt-2 font-medium">
            {selectedSeats
              .map((seat) => `${seat.row}${seat.number}`)
              .join(", ")}
          </p>
        </div>

        <div className="mt-5 flex items-end justify-between border-t border-zinc-800 pt-5">
          <span className="text-sm text-gray-500">
            Total
          </span>

          <span className="text-2xl font-bold">
            {totalAmount.toLocaleString("vi-VN")}đ
          </span>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mt-6 rounded-2xl border border-zinc-800 bg-zinc-950 p-6"
      >
        <div className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium"
            >
              Full name
            </label>

            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Nguyen Van A"
              minLength={2}
              maxLength={100}
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="you@example.com"
              required
              disabled={isSubmitting}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition placeholder:text-gray-600 focus:border-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm leading-6 text-red-300"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-gray-500"
          >
            {isSubmitting
              ? "Creating booking..."
              : "Confirm Booking"}
          </button>
        </div>
      </form>
    </div>
  );
}