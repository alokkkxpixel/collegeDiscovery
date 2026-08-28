import z from "zod";



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
