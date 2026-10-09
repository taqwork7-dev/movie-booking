import Link from "next/link";
import Image from "next/image";
import { connection } from "next/server";
import { prisma } from "@/lib/prisma";

export default async function MoviesPage() {
    await connection();

    const movies = await prisma.movie.findMany({
        orderBy: {
            releaseDate: "desc",
        },
        include: {
            genres: {
                include: {
                    genre: true,
                },
            },
        },
    });

    return (
        <main className="min-h-screen bg-black px-6 py-10 text-white">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <p className="text-sm font-medium uppercase tracking-widest text-gray-500">
                        Now showing
                    </p>

                    <h1 className="mt-2 text-4xl font-bold tracking-tight">
                        Movies
                    </h1>

                    <p className="mt-3 max-w-xl text-gray-400">
                        Discover movies and choose a showtime that works for you.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {movies.map((movie) => (
                        <Link
                            key={movie.id}
                            href={`/movies/${movie.id}`}
                            className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-zinc-600"
                        >
                            <div className="relative aspect-2/3 overflow-hidden bg-zinc-800">
                                <Image
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    fill
                                    unoptimized
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                    className="object-cover"
                                />
                            </div>

                            <div className="p-4">
                                <h2 className="line-clamp-1 text-base font-semibold">
                                    {movie.title}
                                </h2>

                                <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
                                    <span>{movie.duration} min</span>

                                    {movie.rating && (
                                        <>
                                            <span>•</span>
                                            <span>⭐ {movie.rating}</span>
                                        </>
                                    )}
                                </div>

                                <div className="mt-3 flex flex-wrap gap-1">
                                    {movie.genres.map(({ genre }) => (
                                        <span
                                            key={genre.id}
                                            className="rounded bg-zinc-800 px-2 py-1 text-xs text-gray-300"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
