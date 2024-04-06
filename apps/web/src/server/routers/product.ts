import { authedProcedure, router } from "@/server/trpc";

const productRouter = router({
  getAll: authedProcedure.query(() => true),
  // getFormByIdWithPages: authedProcedure
  //   .input(doByFormIdInput)
  //   .query(async ({ input }) =>
  //     getFormByIdWithPages({
  //       formId: input.formId,
  //     }),
  //   ),
});

export default productRouter;
