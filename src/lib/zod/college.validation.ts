import z from "zod";
import { Exam } from "../../generated/prisma/enums";



export const compareQuerySchema = z.object({
  ids: z
    .string()
    .min(1, "ids query param is required")
    .transform((val) => val.split(",").map((id) => id.trim()))
    .refine((arr) => arr.length >= 2, "Provide at least 2 college ids")
    .refine((arr) => arr.length <= 4, "You can compare at most 4 colleges")
    .refine((arr) => new Set(arr).size === arr.length, "Duplicate ids not allowed"),
});

 export const querySchema = z.object({
  q: z.string().optional().nullable(),
  city: z
    .string()
    .optional()
    .nullable()
    .transform((val) => {
      if (!val || val.trim() === "") return undefined;
      return val
        .trim()
        .split(/\s+/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ");
    }),
  minFees: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^\d+$/.test(val), "minFees must be a positive integer")
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  maxFees: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^\d+$/.test(val), "maxFees must be a positive integer")
    .transform((val) => (val ? parseInt(val, 10) : undefined)),
  page: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^\d+$/.test(val), "page must be a positive integer")
    .transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z
    .string()
    .optional()
    .nullable()
    .refine((val) => !val || /^\d+$/.test(val), "limit must be a positive integer")
    .transform((val) => (val ? parseInt(val, 10) : 10)),
});

export const recommendationQuerySchema = z.object({
  exam: z.nativeEnum(Exam, {
    message: "Exam must be one of: JEE, NEET, CET, CUET",
  }),
  rank: z
    .string()
    .min(1, "rank query param is required")
    .refine((val) => /^\d+$/.test(val), "rank must be a positive integer")
    .transform((val) => parseInt(val, 10)),
});

export const createReviewSchema = z.object({
  collegeId: z.string().min(1, "collegeId is required"),
  rating: z
    .number({ message: "rating is required" })
    .int("rating must be an integer")
    .min(1, "rating must be at least 1")
    .max(5, "rating must be at most 5"),
  comment: z
    .string()
    .min(3, "comment must be at least 3 characters")
    .max(1000, "comment cannot exceed 1000 characters"),
});
