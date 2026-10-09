import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import SeatSelector from "./SeatSelector";

type BookingPageProps = {
    params: Promise<{
        showtimeId: string;
    }>;
};

export default async function BookingPage({
    params,
}: BookingPageProps) {
    const { showtimeId } = await params;

    const showtime = await prisma.showtime.findUnique({
        where: {
            id: showtimeId,
        },
        include: {
            movie: true,
            screen: {
                include: {
                    cinema: true,
                    seats: {
                        orderBy: [
                            {
                                row: "asc",
                            },
                            {
                                number: "asc",
                            },
                        ],
                    },
                },
            },
            bookings: {
                include: {
                    seats: true,
                },
            },
        },
    });

    if (!showtime) {
        notFound();
    }

    const bookedSeatIds = showtime.bookings.flatMap((booking) =>
        booking.seats.map((bookingSeat) => bookingSeat.seatId),
    );

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <div className="mx-auto max-w-5xl">
                <Link
                    href={`/movies/${showtime.movie.id}`}
                    className="text-sm text-gray-400 hover:text-white"
                >
                    ← Back to Movie
                </Link>

                {/* Showtime information */}
                <div className="mt-8">
                    <h1 className="text-3xl font-bold">
                        {showtime.movie.title}
                    </h1>

                    <div className="mt-2 text-sm text-gray-400">
                        {showtime.screen.cinema.name} • {showtime.screen.name}
                    </div>

                    <div className="mt-1 text-sm text-gray-400">
                        {showtime.startTime.toLocaleDateString("vi-VN")} •{" "}
                        {showtime.startTime.toLocaleTimeString("vi-VN", {
                            hour: "2-digit",
                            minute: "2-digit",
                        })}
                    </div>
                </div>

                {/* Seat selector */}
                <section className="mt-12">
                    <SeatSelector
                        showtimeId={showtimeId}
                        seats={showtime.screen.seats}
                        bookedSeatIds={bookedSeatIds}
                        price={showtime.price}
                    />
                </section>
            </div>
        </main>
    );
}