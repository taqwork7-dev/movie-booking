import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white"
        >
          CineMax
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-gray-400 transition hover:text-white"
          >
            Home
          </Link>

          <Link
            href="/movies"
            className="text-gray-400 transition hover:text-white"
          >
            Movies
          </Link>
        </nav>
      </div>
    </header>
  );
}