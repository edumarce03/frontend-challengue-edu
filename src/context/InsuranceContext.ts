import { createContext } from "react";
import type { User, FormData, SelectedPlanData } from "../types";

// Definimos la forma de nuestro contexto
export interface InsuranceContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  formData: FormData | null;
  setFormData: (data: FormData | null) => void;
  selectedPlan: SelectedPlanData | null;
  setSelectedPlan: (plan: SelectedPlanData | null) => void;
  resetData: () => void;
}

// Exportamos el contexto
export const InsuranceContext = createContext<InsuranceContextType | undefined>(
  undefined
);
