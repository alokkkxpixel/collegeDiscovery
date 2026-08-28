import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma.client";
import { querySchema } from "@/lib/zod/college.validation";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
  const parsed = querySchema.safeParse({
    q: searchParams.get("q"),
    city: searchParams.get("city"),
    minFees: searchParams.get("minFees"),
    maxFees: searchParams.get("maxFees"),
    page: searchParams.get("page") || undefined,
    limit: searchParams.get("limit") || undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0].message },
      { status: 400 }
    );
  }

  const { q, city, minFees, maxFees, page, limit } = parsed.data;

  const where: any = {};
  if (q) where.name = { contains: q, mode: "insensitive" };
  if (city) where.city = city;
  if (minFees !== undefined || maxFees !== undefined) {
    where.fees = {};
    if (minFees !== undefined) where.fees.gte = minFees;
    if (maxFees !== undefined) where.fees.lte = maxFees;
  }

  const [colleges, total] = await Promise.all([
    prisma.college.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { rating: "desc" },
    }),
    prisma.college.count({ where }),
  ]);

  return NextResponse.json({
    data: colleges,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
  } catch (error) {
    return NextResponse.json({error: "Something went wrong"}, {status: 500})
  }
}