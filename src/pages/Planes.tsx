import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInsurance } from "../hooks/useInsurance";
import { fetchPlans } from "../services/api";
import { calculateAge } from "../utils/dateUtils";
import { Stepper } from "../components/Stepper";
import { PlanCard } from "../components/PlanCard";
import type { Plan } from "../types";

export function Planes() {
  const navigate = useNavigate();
  const { user, setSelectedPlan } = useInsurance();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [filteredPlans, setFilteredPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [planType, setPlanType] = useState<"for-me" | "for-someone" | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  // Cargar planes al montar el componente
  useEffect(() => {
    const loadPlans = async () => {
      try {
        setIsLoading(true);
        const plansData = await fetchPlans();
        setPlans(plansData.list);
      } catch (err) {
        setError("Error al cargar los planes");
        console.error("Error loading plans:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlans();
  }, []);

  // Filtrar planes cuando cambia el tipo de plan o se obtiene el usuario
  useEffect(() => {
    if (!user || !planType) {
      setFilteredPlans([]);
      return;
    }

    const userAge = calculateAge(user.birthDay);

    // Filtrar planes según la edad del usuario
    const availablePlans = plans.filter((plan) => userAge <= plan.age);

    setFilteredPlans(availablePlans);
  }, [user, plans, planType]);

  const handlePlanSelect = (plan: Plan) => {
    if (!planType) return;

    const discountedPrice =
      planType === "for-someone" ? plan.price * 0.95 : plan.price;

    setSelectedPlan({
      plan,
      planType,
      discountedPrice,
    });

    // Navegar a la página de resumen
    navigate("/resumen");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Stepper currentStep={1} />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Cargando planes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Stepper currentStep={1} />
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Reintentar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stepper */}
      <Stepper currentStep={1} />

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {user
              ? `¡Hola ${user.name}! ¿Para quién deseas cotizar?`
              : "¡Hola!"}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Selecciona la opción que se ajuste más a tus necesidades.
          </p>
        </div>

        {/* Selector de tipo de plan */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            ¿Para quién deseas cotizar?
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              onClick={() => setPlanType("for-me")}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                planType === "for-me"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    planType === "for-me"
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {planType === "for-me" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Para mí</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Cotiza tu seguro de salud y protege tu bienestar
                  </p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setPlanType("for-someone")}
              className={`p-4 border-2 rounded-xl text-left transition-all ${
                planType === "for-someone"
                  ? "border-blue-600 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    planType === "for-someone"
                      ? "border-blue-600 bg-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  {planType === "for-someone" && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Para alguien más
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Realiza una cotización para uno de tus familiares o
                    cualquier persona
                  </p>
                  <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded mt-2">
                    5% de descuento
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Grid de planes */}
        {planType && filteredPlans.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Planes disponibles para ti
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlans.map((plan, index) => (
                <PlanCard
                  key={index}
                  plan={plan}
                  isForSomeone={planType === "for-someone"}
                  onSelect={() => handlePlanSelect(plan)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Mensaje cuando no hay planes */}
        {planType && filteredPlans.length === 0 && plans.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
            <h3 className="text-lg font-semibold text-yellow-800 mb-2">
              No hay planes disponibles
            </h3>
            <p className="text-yellow-700">
              Lo sentimos, no encontramos planes que se ajusten a tu perfil.
            </p>
          </div>
        )}

        {/* Botón volver */}
        <div className="text-center">
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
}
