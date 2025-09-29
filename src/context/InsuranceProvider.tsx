import { useState } from "react";
import type { ReactNode } from "react";
import type { User, FormData, SelectedPlanData } from "../types";
import { InsuranceContext } from "./InsuranceContext";

export function InsuranceProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlanData | null>(
    null
  );

  const resetData = () => {
    setUser(null);
    setFormData(null);
    setSelectedPlan(null);
  };

  return (
    <InsuranceContext.Provider
      value={{
        user,
        setUser,
        formData,
        setFormData,
        selectedPlan,
        setSelectedPlan,
        resetData,
      }}
    >
      {children}
    </InsuranceContext.Provider>
  );
}
