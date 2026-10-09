import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] bg-black text-white">
      <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center px-6 py-20">
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.25em] text-gray-500">
            Movie Booking
          </p>

          <h1 className="mt-5 text-5xl font-bold tracking-tight sm:text-6xl">
            Your next movie
            <br />
            starts here.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
            Browse movies, choose your showtime, select your seats,
            and book your tickets in just a few steps.
          </p>

          <div className="mt-8">
            <Link
              href="/movies"
              className="inline-flex rounded-lg bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200"
            >
              Browse Movies
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}