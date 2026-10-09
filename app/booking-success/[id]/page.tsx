import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
export const instant = false;

type BookingSuccessPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookingSuccessPage({
  params,
}: BookingSuccessPageProps) {
  const { id } = await params;

  const booking = await prisma.booking.findUnique({
    where: {
      id,
    },
    include: {
      showtime: {
        include: {
          movie: true,
          screen: {
            include: {
              cinema: true,
            },
          },
        },
      },
      seats: {
        include: {
          seat: true,
        },
      },
    },
  });

  if (!booking) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-xl">
        {/* Success */}
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-black">
            ✓
          </div>

          <p className="mt-6 text-sm font-medium uppercase tracking-widest text-gray-500">
            Booking confirmed
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            Your ticket is ready
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            Your movie booking has been successfully created.
          </p>
        </div>

        {/* Ticket */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
          <div className="p-6">
            <div className="flex gap-5">
              <div className="relative h-28 w-20 shrink-0 overflow-hidden rounded-lg">
                <Image src={booking.showtime.movie.posterUrl} alt={booking.showtime.movie.title} fill sizes="80px" unoptimized className="object-cover" />
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  {booking.showtime.movie.title}
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  {booking.showtime.movie.duration} min
                </p>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 border-t border-zinc-800 pt-6">
              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Date
                </p>

                <p className="mt-2 font-medium">
                  {booking.showtime.startTime.toLocaleDateString(
                    "vi-VN",
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Time
                </p>

                <p className="mt-2 font-medium">
                  {booking.showtime.startTime.toLocaleTimeString(
                    "vi-VN",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    },
                  )}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Cinema
                </p>

                <p className="mt-2 font-medium">
                  {booking.showtime.screen.cinema.name}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-gray-600">
                  Screen
                </p>

                <p className="mt-2 font-medium">
                  {booking.showtime.screen.name}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-dashed border-zinc-700" />

          <div className="p-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-600">
                Seats
              </p>

              <p className="mt-2 text-lg font-semibold">
                {booking.seats
                  .map(
                    ({ seat }) =>
                      `${seat.row}${seat.number}`,
                  )
                  .join(", ")}
              </p>
            </div>

            <div className="mt-6">
              <p className="text-xs uppercase tracking-wider text-gray-600">
                Customer
              </p>

              <p className="mt-2 font-medium">
                {booking.customerName}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {booking.customerEmail}
              </p>
            </div>

            <div className="mt-6 flex items-end justify-between border-t border-zinc-800 pt-6">
              <span className="text-sm text-gray-500">
                Total
              </span>

              <span className="text-2xl font-bold">
                {booking.totalAmount.toLocaleString("vi-VN")}đ
              </span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6">
          <Link
            href="/movies"
            className="block w-full rounded-xl bg-white px-5 py-3.5 text-center font-semibold text-black transition hover:bg-gray-200"
          >
            Browse More Movies
          </Link>
        </div>
      </div>
    </main>
  );
}