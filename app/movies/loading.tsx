export default function MoviesLoading() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <div className="h-4 w-24 animate-pulse rounded bg-zinc-800" />

          <div className="mt-3 h-10 w-32 animate-pulse rounded bg-zinc-800" />

          <div className="mt-3 h-5 w-80 max-w-full animate-pulse rounded bg-zinc-900" />
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl border border-zinc-900 bg-zinc-950"
            >
              <div className="aspect-2/3 animate-pulse bg-zinc-900" />

              <div className="space-y-3 p-4">
                <div className="h-5 w-3/4 animate-pulse rounded bg-zinc-800" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-zinc-900" />

                <div className="h-5 w-2/3 animate-pulse rounded bg-zinc-900" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}