export default function MovieDetailLoading() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />

        <section className="mt-8 grid gap-10 md:grid-cols-[280px_1fr]">
          <div className="aspect-2/3 animate-pulse rounded-xl bg-zinc-900" />

          <div className="flex flex-col justify-center">
            <div className="flex gap-2">
              <div className="h-6 w-16 animate-pulse rounded-full bg-zinc-900" />
              <div className="h-6 w-20 animate-pulse rounded-full bg-zinc-900" />
            </div>

            <div className="mt-5 h-12 w-3/4 animate-pulse rounded bg-zinc-800" />

            <div className="mt-5 h-5 w-64 animate-pulse rounded bg-zinc-900" />

            <div className="mt-8 space-y-3">
              <div className="h-4 w-full animate-pulse rounded bg-zinc-900" />
              <div className="h-4 w-full animate-pulse rounded bg-zinc-900" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-zinc-900" />
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />

          <div className="mt-3 h-8 w-56 animate-pulse rounded bg-zinc-800" />

          <div className="mt-8 space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-24 animate-pulse rounded-xl bg-zinc-950"
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}