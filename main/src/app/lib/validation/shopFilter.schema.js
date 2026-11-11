import z from "zod";

const shopFilterSchema = z.object({
  categoryId : z.array( z.uuidv7( "Invalid category")).optional(),
  outOfStock: z.coerce.boolean("Invalid out of stock value").optional(),
  minPrice : z.coerce.number("Invalid min price provided").min(0).optional(),
  maxPrice : z.coerce.number("Invalid max price").optional(),
  searchText: z.string("Invalid search text").max(15, "Search query is too long").optional(),
  cursor: z.uuidv7("Invalid cursor id").optional(),
  sort: z.enum(["featured", "price-asc", "price-desc","newest"], "Invalid Sort type").optional()
})

export { 
  shopFilterSchema
}