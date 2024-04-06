import { create } from "zustand";
import type { z } from "zod";
import type {
  advancedFormSchema,
  basicFormSchema,
} from "@/libWeb/zodSchemas.ts";
import { createSelectors } from "@/store/createSelectors.ts";

interface FormSteps {
  step: "basics" | "advanced";
}

type BASIC = z.infer<typeof basicFormSchema>;
type ADVANCED = z.infer<typeof advancedFormSchema>;

type STATE = FormSteps & BASIC & ADVANCED;

interface ACTIONS {
  updateStep: (values: FormSteps) => void;
  setBasicForm: (values: BASIC) => void;
  setAdvancedForm: (values: ADVANCED) => void;
  resetForm: () => void;
}

const initState: STATE = {
  step: "basics",
  name: "",
  description: "",
  price: 0,
  image: "",
  split: { isSplit: false },
  quantity: 0,
};

export const useCreateProductBase = create<STATE & ACTIONS>((set) => ({
  ...initState,
  updateStep: (values) => {
    set({ step: values.step });
  },
  setBasicForm: (values) => {
    set(values);
  },
  setAdvancedForm: (values) => {
    set(values);
  },
  resetForm: () => {
    set(initState);
  },
}));

export const useCreateProductStore = createSelectors(useCreateProductBase);
