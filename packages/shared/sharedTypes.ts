import { z } from "zod";

export const WorkStatusSchema = z.enum([
  "todo",
  "in-progress",
  "done"
]);

export const WorkSchema = z.object({
  id: z.string(),
  title: z.string().min(1,"title is required"),
  status: WorkStatusSchema,
  createdAt: z.string()
});

export type Work = z.infer<typeof WorkSchema>;
export type WorkStatus = z.infer<typeof WorkStatusSchema>;

