"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-6 text-white">
      <div className="text-center">
        <p className="text-sm font-medium text-red-400">
          Something went wrong
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          Unexpected error
        </h1>

        <p className="mt-4 text-gray-400">
          We could not complete your request.
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-lg bg-white px-5 py-3 font-semibold text-black transition hover:bg-gray-200"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}