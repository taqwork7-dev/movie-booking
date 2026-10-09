import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // ============================================================
  // CLEAN DATABASE
  // ============================================================

  console.log("🧹 Cleaning existing data...");

  await prisma.bookingSeat.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.showtime.deleteMany();
  await prisma.seat.deleteMany();
  await prisma.screen.deleteMany();
  await prisma.cinema.deleteMany();
  await prisma.movieGenre.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.movie.deleteMany();

  // ============================================================
  // GENRES
  // ============================================================

  console.log("🎬 Creating genres...");

  const action = await prisma.genre.create({
    data: { name: "Action" },
  });

  const adventure = await prisma.genre.create({
    data: { name: "Adventure" },
  });

  const sciFi = await prisma.genre.create({
    data: { name: "Sci-Fi" },
  });

  const drama = await prisma.genre.create({
    data: { name: "Drama" },
  });

  const thriller = await prisma.genre.create({
    data: { name: "Thriller" },
  });

  // ============================================================
  // MOVIES
  // ============================================================

  console.log("🎥 Creating movies...");

  const interstellar = await prisma.movie.create({
    data: {
      title: "Interstellar",
      slug: "interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      posterUrl:
        "https://placehold.co/600x900?text=Interstellar",
      duration: 169,
      rating: 8.7,
      releaseDate: new Date("2014-11-07"),
      genres: {
        create: [
          { genreId: sciFi.id },
          { genreId: drama.id },
          { genreId: adventure.id },
        ],
      },
    },
  });

  const inception = await prisma.movie.create({
    data: {
      title: "Inception",
      slug: "inception",
      description:
        "A skilled thief who steals corporate secrets through dream-sharing technology is given a chance to erase his past.",
      posterUrl:
        "https://placehold.co/600x900?text=Inception",
      duration: 148,
      rating: 8.8,
      releaseDate: new Date("2010-07-16"),
      genres: {
        create: [
          { genreId: action.id },
          { genreId: sciFi.id },
          { genreId: thriller.id },
        ],
      },
    },
  });

  const darkKnight = await prisma.movie.create({
    data: {
      title: "The Dark Knight",
      slug: "the-dark-knight",
      description:
        "Batman faces a criminal mastermind who plunges Gotham City into chaos.",
      posterUrl:
        "https://placehold.co/600x900?text=The+Dark+Knight",
      duration: 152,
      rating: 9.0,
      releaseDate: new Date("2008-07-18"),
      genres: {
        create: [
          { genreId: action.id },
          { genreId: drama.id },
          { genreId: thriller.id },
        ],
      },
    },
  });

  const dune = await prisma.movie.create({
    data: {
      title: "Dune: Part Two",
      slug: "dune-part-two",
      description:
        "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
      posterUrl:
        "https://placehold.co/600x900?text=Dune+Part+Two",
      duration: 166,
      rating: 8.5,
      releaseDate: new Date("2024-03-01"),
      genres: {
        create: [
          { genreId: sciFi.id },
          { genreId: adventure.id },
          { genreId: action.id },
        ],
      },
    },
  });

  const oppenheimer = await prisma.movie.create({
    data: {
      title: "Oppenheimer",
      slug: "oppenheimer",
      description:
        "The story of J. Robert Oppenheimer and his role in developing the atomic bomb.",
      posterUrl:
        "https://placehold.co/600x900?text=Oppenheimer",
      duration: 180,
      rating: 8.6,
      releaseDate: new Date("2023-07-21"),
      genres: {
        create: [
          { genreId: drama.id },
          { genreId: thriller.id },
        ],
      },
    },
  });

  const spiderVerse = await prisma.movie.create({
    data: {
      title: "Spider-Man: Across the Spider-Verse",
      slug: "spider-man-across-the-spider-verse",
      description:
        "Miles Morales embarks on a journey across the multiverse.",
      posterUrl:
        "https://placehold.co/600x900?text=Spider-Man",
      duration: 140,
      rating: 8.6,
      releaseDate: new Date("2023-06-02"),
      genres: {
        create: [
          { genreId: action.id },
          { genreId: adventure.id },
        ],
      },
    },
  });

  // ============================================================
  // CINEMA
  // ============================================================

  console.log("🏢 Creating cinema...");

  const cinema = await prisma.cinema.create({
    data: {
      name: "CineMax Downtown",
      address: "123 Nguyen Van Linh, Da Nang",
    },
  });

  // ============================================================
  // SCREENS
  // ============================================================

  console.log("🚪 Creating screens...");

  const screen1 = await prisma.screen.create({
    data: {
      name: "Screen 1",
      cinemaId: cinema.id,
    },
  });

  const screen2 = await prisma.screen.create({
    data: {
      name: "Screen 2",
      cinemaId: cinema.id,
    },
  });

  const screen3 = await prisma.screen.create({
    data: {
      name: "Screen 3",
      cinemaId: cinema.id,
    },
  });

  // ============================================================
  // SEATS
  // ============================================================

  console.log("💺 Creating seats...");

  for (const screen of [screen1, screen2, screen3]) {
    for (const row of ["A", "B", "C", "D", "E", "F", "G", "H"]) {
      for (let number = 1; number <= 8; number++) {
        await prisma.seat.create({
          data: {
            row,
            number,
            screenId: screen.id,
          },
        });
      }
    }
  }

  // ============================================================
  // SHOWTIMES
  // ============================================================

  console.log("🕐 Creating showtimes...");

  const showtimes = [
    {
      movieId: interstellar.id,
      screenId: screen1.id,
      startTime: new Date("2030-01-15T10:00:00+07:00"),
      price: 120000,
    },
    {
      movieId: inception.id,
      screenId: screen1.id,
      startTime: new Date("2030-01-15T14:00:00+07:00"),
      price: 130000,
    },
    {
      movieId: darkKnight.id,
      screenId: screen2.id,
      startTime: new Date("2030-01-16T10:00:00+07:00"),
      price: 140000,
    },
    {
      movieId: dune.id,
      screenId: screen2.id,
      startTime: new Date("2030-01-16T14:00:00+07:00"),
      price: 160000,
    },
    {
      movieId: oppenheimer.id,
      screenId: screen3.id,
      startTime: new Date("2030-01-17T18:00:00+07:00"),
      price: 150000,
    },
    {
      movieId: spiderVerse.id,
      screenId: screen3.id,
      startTime: new Date("2030-01-17T20:00:00+07:00"),
      price: 130000,
    },
  ];

  for (const showtime of showtimes) {
    await prisma.showtime.create({
      data: showtime,
    });
  }

  // ============================================================
  // SUMMARY
  // ============================================================

  console.log("✅ Seed completed successfully!");

  console.log({
    genres: 5,
    movies: 6,
    cinemas: 1,
    screens: 3,
    seatsPerScreen: 64,
    totalSeats: 192,
    showtimes: 6,
  });
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

