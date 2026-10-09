export default function BookingLoading() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <div className="h-4 w-32 animate-pulse rounded bg-zinc-800" />

        <div className="mt-8">
          <div className="h-9 w-64 animate-pulse rounded bg-zinc-800" />

          <div className="mt-3 h-4 w-80 animate-pulse rounded bg-zinc-900" />

          <div className="mt-2 h-4 w-48 animate-pulse rounded bg-zinc-900" />
        </div>

        <div className="mt-12">
          <div className="mx-auto h-2 max-w-2xl animate-pulse rounded-full bg-zinc-800" />

          <div className="mt-12 space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex justify-center gap-3"
              >
                <div className="h-9 w-5 animate-pulse rounded bg-zinc-900" />

                {Array.from({ length: 8 }).map(
                  (_, seatIndex) => (
                    <div
                      key={seatIndex}
                      className="h-9 w-9 animate-pulse rounded-t-md bg-zinc-900"
                    />
                  ),
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 h-32 animate-pulse rounded-2xl bg-zinc-950" />
      </div>
    </main>
  );
}