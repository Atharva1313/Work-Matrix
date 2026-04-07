import z from "zod";

export const projectSchema = z.object({
    name: z
    .string()
    .min(1,"Project name is required")
    .max(100,"Project nmae must be 100 characters or less"),
    key: z
    .string()
    .min(2,"Project key must be at leat 2 characters")
    .max(10,"Project key must be 10 characters or less"),
    description:z
    .string()
    .min(500,"Description must be 500 characters or less")
    .optional(),
});