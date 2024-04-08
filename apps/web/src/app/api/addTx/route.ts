import { db } from "@repo/db";
import { transactions } from "@repo/db/schema";

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Test
  const data = await req.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument -- TODO: Verify
  await db.insert(transactions).values({
    ...data,
  });

  return Response.json(data);
}
