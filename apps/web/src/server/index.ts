import type { inferReactQueryProcedureOptions } from "@trpc/react-query";
import type { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { router } from "@/server/trpc";
import productRouter from "@/server/routers/product.ts";
import txRouter from "@/server/routers/tx.ts";

export const appRouter = router({
  product: productRouter,
  tx: txRouter,
});

export type AppRouter = typeof appRouter;

// infer the types for router
export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;
