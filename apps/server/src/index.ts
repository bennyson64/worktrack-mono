import { Hono } from "hono";
import { cors } from "hono/cors";
import { handle } from "hono/vercel";
import { db } from "./db";
import { works } from "./db/schema";
import { eq } from "drizzle-orm";
import { Work } from "@repo/shared";

const app = new Hono();

/* ✅ CORS */
app.use(
  "*",
  cors({
    origin: [
      "http://localhost:5173",
      "https://worktrack-mono-workdash.vercel.app",
    ],
    allowMethods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type"],
  })
);

/* ✅ Preflight — MUST be before routes */
app.options("*", (c) => c.body(null, 204));

/* Routes */
app.get("/", async (c) => {
  const result = await db.select().from(works);
  return c.json(result);
});

app.post("/add", async (c) => {
  const { title, status } = (await c.req.json()) as Partial<Work>;
  if (!title || !status) {
    return c.json({ message: "Invalid data" }, 400);
  }

  const [work] = await db.insert(works).values({ title, status }).returning();
  return c.json(work, 201);
});

app.patch("/update/:id", async (c) => {
  const id = c.req.param("id");
  const updates = await c.req.json();

  const [updated] = await db
    .update(works)
    .set(updates)
    .where(eq(works.id, id))
    .returning();

  if (!updated) return c.json({ message: "Not found" }, 404);
  return c.json(updated);
});

app.delete("/delete/:id", async (c) => {
  const id = c.req.param("id");
  await db.delete(works).where(eq(works.id, id));
  return c.body(null, 204);
});

/* ✅ SINGLE export for Vercel */
export default handle(app);
