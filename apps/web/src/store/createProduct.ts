import { create } from "zustand";
import type { z } from "zod";
import type {
  advancedFormSchema,
  basicFormSchema,
} from "@/libWeb/zodSchemas.ts";

interface FormSteps {
  step: "basic" | "advanced";
}

type BASIC = z.infer<typeof basicFormSchema>;
type ADVANCED = z.infer<typeof advancedFormSchema>;

type STATE = FormSteps & BASIC & ADVANCED;

interface ACTIONS {
  setBasicForm: (values: BASIC) => void;
  setAdvancedForm: (values: ADVANCED) => void;
  resetForm: () => void;
}

const initState: STATE = {
  step: "basic",
  name: "",
  description: "",
  price: 0,
  image: "",
  category: "",
  tags: [],
};

const useCreateProductStore = create<STATE & ACTIONS>((set) => ({
  ...initState,
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
