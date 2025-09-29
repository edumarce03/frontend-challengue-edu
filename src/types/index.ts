// Tipo para el usuario obtenido del API
export interface User {
  name: string;
  lastName: string;
  birthDay: string; // formato: "DD-MM-YYYY"
}

// Tipo para un plan individual del API
export interface Plan {
  name: string;
  price: number;
  description: string[];
  age: number;
}

// Tipo para la respuesta del API de planes
export interface PlansResponse {
  list: Plan[];
}

// Tipo para los datos del formulario que el usuario llena
export interface FormData {
  documentType: "DNI" | "RUC";
  documentNumber: string;
  phone: string;
  acceptPrivacy: boolean;
  acceptCommercial: boolean;
}

// Tipo para el plan seleccionado con información adicional
export interface SelectedPlanData {
  plan: Plan;
  planType: "for-me" | "for-someone";
  discountedPrice: number;
}
