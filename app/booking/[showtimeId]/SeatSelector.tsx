"use client";

import { useState } from "react";
import CustomerForm from "./CustomerForm";

type Seat = {
  id: string;
  row: string;
  number: number;
};

type SeatSelectorProps = {
  showtimeId: string;
  seats: Seat[];
  bookedSeatIds: string[];
  price: number;
};

export default function SeatSelector({
  showtimeId,
  seats,
  bookedSeatIds,
  price,
}: SeatSelectorProps) {
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>(
    [],
  );

  const [showCustomerForm, setShowCustomerForm] =
    useState(false);

  const bookedSet = new Set(bookedSeatIds);

  const seatsByRow = seats.reduce(
    (groups, seat) => {
      if (!groups[seat.row]) {
        groups[seat.row] = [];
      }

      groups[seat.row].push(seat);

      return groups;
    },
    {} as Record<string, Seat[]>,
  );

  function toggleSeat(seatId: string) {
    if (bookedSet.has(seatId)) {
      return;
    }

    setSelectedSeatIds((current) => {
      if (current.includes(seatId)) {
        return current.filter((id) => id !== seatId);
      }

      return [...current, seatId];
    });
  }

  const selectedSeats = seats.filter((seat) =>
    selectedSeatIds.includes(seat.id),
  );

  const totalAmount = selectedSeatIds.length * price;

  if (showCustomerForm) {
    return (
      <CustomerForm
        showtimeId={showtimeId}
        selectedSeats={selectedSeats}
        totalAmount={totalAmount}
        onBack={() => setShowCustomerForm(false)}
      />
    );
  }

  return (
    <div>
      {/* Screen */}
      <div className="mx-auto max-w-2xl">
        <div className="relative">
          <div className="h-2 rounded-full bg-white shadow-[0_0_30px_rgba(255,255,255,0.2)]" />

          <p className="mt-4 text-center text-xs font-medium uppercase tracking-[0.3em] text-gray-600">
            Screen
          </p>
        </div>
      </div>

      {/* Seat map */}
      <div className="mt-12 overflow-x-auto pb-4">
        <div className="mx-auto min-w-155 space-y-3">
          {Object.entries(seatsByRow).map(
            ([row, rowSeats]) => (
              <div
                key={row}
                className="flex items-center justify-center gap-3"
              >
                <span className="w-5 text-center text-xs font-medium text-gray-600">
                  {row}
                </span>

                <div className="flex gap-2">
                  {rowSeats.map((seat) => {
                    const isBooked = bookedSet.has(seat.id);
                    const isSelected =
                      selectedSeatIds.includes(seat.id);

                    return (
                      <button
                        key={seat.id}
                        type="button"
                        disabled={isBooked}
                        onClick={() => toggleSeat(seat.id)}
                        aria-label={`Seat ${seat.row}${seat.number}`}
                        className={[
                          "h-9 w-9 rounded-t-md text-xs font-medium transition-all",
                          "border",
                          isBooked
                            ? "cursor-not-allowed border-red-950 bg-red-950/70 text-red-400"
                            : isSelected
                              ? "border-white bg-white text-black shadow-[0_0_12px_rgba(255,255,255,0.2)]"
                              : "border-zinc-800 bg-zinc-900 text-gray-400 hover:border-zinc-500 hover:bg-zinc-800 hover:text-white",
                        ].join(" ")}
                      >
                        {seat.number}
                      </button>
                    );
                  })}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-gray-500">
        <Legend
          className="bg-zinc-900"
          label="Available"
        />

        <Legend
          className="bg-white"
          label="Selected"
        />

        <Legend
          className="bg-red-950"
          label="Booked"
        />
      </div>

      {/* Summary */}
      <div className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
              Selected seats
            </p>

            <p className="mt-2 font-medium">
              {selectedSeats.length === 0
                ? "No seats selected"
                : selectedSeats
                    .map(
                      (seat) => `${seat.row}${seat.number}`,
                    )
                    .join(", ")}
            </p>
          </div>

          <div className="sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
              Total
            </p>

            <p className="mt-2 text-2xl font-bold">
              {totalAmount.toLocaleString("vi-VN")}đ
            </p>
          </div>
        </div>

        <button
          type="button"
          disabled={selectedSeatIds.length === 0}
          onClick={() => setShowCustomerForm(true)}
          className="mt-6 w-full rounded-xl bg-white px-5 py-3.5 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:bg-zinc-900 disabled:text-gray-600"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function Legend({
  className,
  label,
}: {
  className: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3.5 w-3.5 rounded-sm ${className}`}
      />
      <span>{label}</span>
    </div>
  );
}