import { useState } from "react";
import type { FormData } from "../types";

export function useHomeForm() {
  const [formData, setFormData] = useState<FormData>({
    documentType: "DNI",
    documentNumber: "",
    phone: "",
    acceptPrivacy: false,
    acceptCommercial: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  // Validación de número de documento
  const validateDocumentNumber = (
    value: string,
    type: "DNI" | "RUC"
  ): string => {
    if (!value) return "Este campo es obligatorio";

    if (type === "DNI") {
      if (!/^\d{8}$/.test(value)) {
        return "El DNI debe tener 8 dígitos";
      }
    } else if (type === "RUC") {
      if (!/^\d{11}$/.test(value)) {
        return "El RUC debe tener 11 dígitos";
      }
    }

    return "";
  };

  // Validación de teléfono
  const validatePhone = (value: string): string => {
    if (!value) return "Este campo es obligatorio";
    if (!/^\d{9}$/.test(value)) {
      return "El celular debe tener 9 dígitos";
    }
    return "";
  };

  // Actualizar campo del formulario
  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Limpiar error del campo al escribir
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Validar todo el formulario
  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    // Validar documento
    const docError = validateDocumentNumber(
      formData.documentNumber,
      formData.documentType
    );
    if (docError) newErrors.documentNumber = docError;

    // Validar teléfono
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    // Validar checkbox de privacidad (obligatorio)
    if (!formData.acceptPrivacy) {
      newErrors.acceptPrivacy = "Debes aceptar la Política de Privacidad";
    }

    // Checkbox de comunicaciones comerciales es opcional, no validamos

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
  };
}
