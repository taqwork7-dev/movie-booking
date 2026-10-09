
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { connection } from "next/server";
import Image from "next/image";
type MovieDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function MovieDetailPage({
  params,
}: MovieDetailPageProps) {
  await connection();
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: {
      id,
    },
    include: {
      genres: {
        include: {
          genre: true,
        },
      },
      showtimes: {
        orderBy: {
          startTime: "asc",
        },
        include: {
          screen: {
            include: {
              cinema: true,
            },
          },
        },
      },
    },
  });

  if (!movie) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/movies"
          className="text-sm text-gray-500 transition hover:text-white"
        >
          ← Back to Movies
        </Link>

        {/* Movie information */}
        <section className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">
          <div className="overflow-hidden rounded-xl bg-zinc-900">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={600}
              height={900}
              unoptimized
              className="aspect-2/3 h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className="flex flex-wrap gap-2">
              {movie.genres.map(({ genre }) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-zinc-900 px-3 py-1 text-xs text-gray-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {movie.title}
            </h1>

            <div className="mt-5 flex flex-wrap gap-5 text-sm text-gray-400">
              <span>{movie.duration} min</span>

              {movie.rating && (
                <span>⭐ {movie.rating}</span>
              )}

              <span>
                {movie.releaseDate.toLocaleDateString("vi-VN")}
              </span>
            </div>

            <p className="mt-8 max-w-3xl leading-7 text-gray-400">
              {movie.description}
            </p>
          </div>
        </section>

        {/* Showtimes */}
        <section className="mt-16">
          <div className="mb-8">
            <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
              Available screenings
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              Choose a Showtime
            </h2>
          </div>

          {movie.showtimes.length === 0 ? (
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-8 text-center">
              <p className="text-gray-400">
                No showtimes available.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {movie.showtimes.map((showtime) => {
                const isExpired =
                  showtime.startTime <= new Date();

                const content = (
                  <div
                    className={`flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between ${isExpired ? "opacity-50" : ""
                      }`}
                  >
                    <div>
                      <p className="text-lg font-semibold">
                        {showtime.startTime.toLocaleDateString(
                          "vi-VN",
                          {
                            weekday: "long",
                            day: "2-digit",
                            month: "2-digit",
                          },
                        )}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {showtime.screen.cinema.name} •{" "}
                        {showtime.screen.name}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {showtime.screen.cinema.address}
                      </p>
                    </div>

                    <div className="flex items-center gap-5">
                      <div className="text-right">
                        <p className="text-lg font-semibold">
                          {showtime.startTime.toLocaleTimeString(
                            "vi-VN",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          {showtime.price.toLocaleString("vi-VN")}đ
                        </p>
                      </div>

                      {isExpired ? (
                        <span className="rounded-full border border-zinc-700 px-3 py-1 text-xs text-gray-500">
                          Expired
                        </span>
                      ) : (
                        <span className="text-gray-600 transition group-hover:translate-x-1 group-hover:text-white">
                          →
                        </span>
                      )}
                    </div>
                  </div>
                );

                if (isExpired) {
                  return (
                    <div
                      key={showtime.id}
                      className="rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                    >
                      {content}
                    </div>
                  );
                }

                return (
                  <Link
                    key={showtime.id}
                    href={`/booking/${showtime.id}`}
                    className="group block rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-zinc-600 hover:bg-zinc-900"
                  >
                    {content}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
