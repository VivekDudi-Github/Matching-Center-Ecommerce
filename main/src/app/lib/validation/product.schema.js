import { z } from "zod";

export const newProductFormSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters"),

  category: z.enum(["Cotton", "Silk", "Linen", "Rayon", "Polyester"], "Invalid category"),

  slug: z
    .string()
    .trim()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug"),

  tags: z.array(z.string().trim().min(1)).min(1, "At least one tag is required"),


  price: z.coerce.number().positive("Price must be greater than 0"),

  originalPrice: z.coerce
    .number()
    .positive("Original price must be greater than 0"),

  featured: z.boolean(),

  isPublished: z.boolean(),


  colors: z
    .array(
      z.object({
        name: z.string().trim().min(1, "Color name is missing"),

        hex: z
          .string()
          .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Invalid hex color, rechoose the color"),

        hexText: z
          .string()
          .regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Invalid hex text color"),

        availableMeters: z.coerce.number().nonnegative(),

        lowStockAlert: z.coerce.number().nonnegative(),
      })
    )
    .min(1, "At least one color is required"),

  pattern: z.string().trim().min(1, "Pattern is required"),

  images: z.array(
    z.object({
      file: z.file().mime("image/jpeg", "image/png", "image/webp"),
      displayOrder: z.number().positive(),
    })
  ).min(1, "At least one image is required"),

  width: z.coerce.number('Width is required').positive("Width must be greater than 0"),

  washCare: z.string().min(1, "Wash care is required"),

  description: z.string().trim().min(5, "Description must be at least 5 characters"),

  seoTitle: z.string().trim().optional(),

  seoDescription: z.string().trim().optional(),
}).refine(
    (data) => ( Number(data.originalPrice) >= Number(data.price)
    ),
    {
      message: "Original price must be greater than or equal to price",
      path: ["originalPrice"],
    }
  ).refine(
    (data) => ( 
      data.colors.every((color) => color.availableMeters >= color.lowStockAlert)
    ), 
    {
      message: "All colors must have a low stock alert lower than or equal to the available meters",
      path: ["colors"],
    }
  );

export { newProductFormSchema };