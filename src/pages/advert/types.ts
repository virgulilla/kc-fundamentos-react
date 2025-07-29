import z from "zod";

export type Tag = "lifestyle" | "mobile" | "motor" | "work";

export const AdvertSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "El titulo debe tener al menos 3 caracteres"),
  sale: z.boolean(),
  price: z.number().min(0, "El precio debe ser positivo"),
  tags: z.array(z.enum(["lifestyle", "mobile", "motor", "work"])),
  photo: z.union([z.string(), z.null()]).optional(),
});

export type Advert = z.infer<typeof AdvertSchema>;

export const AdvertsSchema = z.array(AdvertSchema);

export interface CreateAdvertPayload {
  name: string;
  sale: boolean;
  price: number;
  tags: string[];
  photo?: File;
}
