import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const result = await prisma.$queryRaw<
      { now: Date }[]
    >`SELECT NOW() as now`;

    return NextResponse.json({
      ok: true,
      databaseTime: result[0]?.now,
    });
  } catch (error) {
    console.error("DB health error:", error);

    return NextResponse.json(
      {
        ok: false,
        message: "Database connection failed",
      },
      { status: 500 },
    );
  }
}