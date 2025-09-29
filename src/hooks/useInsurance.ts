// src/hooks/useInsurance.ts
import { useContext } from "react";
import { InsuranceContext } from "../context/InsuranceContext";

export function useInsurance() {
  const context = useContext(InsuranceContext);

  if (context === undefined) {
    throw new Error("useInsurance must be used within InsuranceProvider");
  }

  return context;
}
