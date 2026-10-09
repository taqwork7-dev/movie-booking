import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
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

    return NextResponse.json(movies);
  } catch (error) {
    console.error("GET /api/movies error:", error);

    return NextResponse.json(
      {
        message: "Failed to fetch movies",
      },
      {
        status: 500,
      },
    );
  }
}