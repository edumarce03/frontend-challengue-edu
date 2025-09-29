import type { User, PlansResponse } from "../types";

const API_BASE_URL = "https://rimac-front-end-challenge.netlify.app/api";

// Función para obtener datos del usuario
export async function fetchUser(): Promise<User> {
  try {
    const response = await fetch(`${API_BASE_URL}/user.json`);

    if (!response.ok) {
      throw new Error("Error al obtener datos del usuario");
    }

    const data: User = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

// Función para obtener los planes
export async function fetchPlans(): Promise<PlansResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/plans.json`);

    if (!response.ok) {
      throw new Error("Error al obtener planes");
    }

    const data: PlansResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching plans:", error);
    throw error;
  }
}
