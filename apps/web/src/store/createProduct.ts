import { create } from "zustand";
import type { z } from "zod";
import type {
  advancedFormSchema,
  basicFormSchema,
} from "@/libWeb/zodSchemas.ts";

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
  category: "",
  tags: [],
};

export const useCreateProductStore = create<STATE & ACTIONS>((set) => ({
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
