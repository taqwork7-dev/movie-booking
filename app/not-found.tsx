import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-medium text-gray-500">
          404
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Page not found
        </h1>

        <p className="mt-4 text-gray-400">
          The page you are looking for does not exist.
        </p>

        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
          >
            Go Home
          </Link>

          <Link
            href="/movies"
            className="rounded-lg border border-zinc-700 px-5 py-3 font-semibold text-white transition hover:bg-zinc-900"
          >
            Browse Movies
          </Link>
        </div>
      </div>
    </main>
  );
}