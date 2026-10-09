import { NextResponse } from "next/server";
import { Prisma } from "@/app/generated/prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const bookingSchema = z.object({
  showtimeId: z.string().min(1),
  customerName: z.string().trim().min(2).max(100),
  customerEmail: z.string().trim().email(),
  seatIds: z.array(z.string().min(1)).min(1),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = bookingSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Invalid booking data" },
        { status: 400 },
      );
    }

    const {
      showtimeId,
      customerName,
      customerEmail,
      seatIds,
    } = result.data;

    const uniqueSeatIds = [...new Set(seatIds)];

    const showtime = await prisma.showtime.findUnique({
      where: {
        id: showtimeId,
      },
      include: {
        screen: {
          include: {
            seats: {
              where: {
                id: {
                  in: uniqueSeatIds,
                },
              },
            },
          },
        },
      },
    });

    if (!showtime) {
      return NextResponse.json(
        { message: "Showtime not found" },
        { status: 404 },
      );
    }

    if (showtime.startTime <= new Date()) {
      return NextResponse.json(
        { message: "Showtime has already started" },
        { status: 400 },
      );
    }

    if (
      showtime.screen.seats.length !==
      uniqueSeatIds.length
    ) {
      return NextResponse.json(
        { message: "Invalid seats selected" },
        { status: 400 },
      );
    }

    const totalAmount =
      uniqueSeatIds.length * showtime.price;

    const booking = await prisma.$transaction(
      async (tx) => {
        return tx.booking.create({
          data: {
            customerName,
            customerEmail,
            totalAmount,
            showtimeId,
            seats: {
              create: uniqueSeatIds.map((seatId) => ({
                seatId,
                showtimeId,
              })),
            },
          },
        });
      },
      {
        maxWait: 10000,
        timeout: 10000,
      },
    );

    return NextResponse.json(
      { id: booking.id },
      { status: 201 },
    );
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return NextResponse.json(
        {
          message:
            "One or more seats have just been booked by another customer.",
        },
        { status: 409 },
      );
    }

    console.error("POST /api/bookings error:", error);

    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 },
    );
  }
}