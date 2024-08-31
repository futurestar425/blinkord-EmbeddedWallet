import { z } from "zod";

export const serverFormSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Blink title is required"),
  iconUrl: z
    .string()
    .min(3, "Image URL is required")
    .refine(
      (url) => {
        try {
          new URL(url);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: "Invalid URL. Please enter a valid URL.",
      }
    ),
  description: z.string().min(1, "Description is required"),
  roles: z
    .array(
      z.object({
        id: z.string().min(1, "Role ID is required"),
        name: z.string().min(1, "Role name is required"),
        amount: z
          .string()
          .refine((val) => /^\d*\.?\d+$/.test(val) && parseFloat(val) >= 0, {
            message:
              "Amount must be a valid number or decimal greater than or equal to 0",
          })
          .transform((val) => parseFloat(val).toString()),
      })
    )
    .min(1, "At least one role is required"),
});

// Type inference based on the schema
export type ServerFormData = z.infer<typeof serverFormSchema>;
