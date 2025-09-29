import { useInsurance } from "../hooks/useInsurance";
import { Stepper } from "../components/Stepper";
import { calculateAge } from "../utils/dateUtils";

export function Resumen() {
  const { user, formData, selectedPlan } = useInsurance();

  // Si no hay datos suficientes, mostrar mensaje
  if (!user || !formData || !selectedPlan) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Stepper currentStep={2} />
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
            <h2 className="text-lg font-semibold text-yellow-800 mb-2">
              Información incompleta
            </h2>
            <p className="text-yellow-700">
              No se encontraron todos los datos necesarios. Por favor, completa
              el proceso desde el inicio.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const userAge = calculateAge(user.birthDay);
  const planTypeText =
    selectedPlan.planType === "for-me" ? "Para mí" : "Para alguien más";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Stepper */}
      <Stepper currentStep={2} />

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Resumen del Seguro
          </h1>
          <p className="text-lg text-gray-600">
            Revisa que toda la información sea correcta
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Columna izquierda - Información personal */}
          <div className="lg:col-span-2 space-y-6">
            {/* Información del usuario */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Información Personal
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Nombre
                  </label>
                  <p className="text-gray-900 font-semibold">{user.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Apellidos
                  </label>
                  <p className="text-gray-900 font-semibold">{user.lastName}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Fecha de Nacimiento
                  </label>
                  <p className="text-gray-900 font-semibold">{user.birthDay}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Edad
                  </label>
                  <p className="text-gray-900 font-semibold">{userAge} años</p>
                </div>
              </div>
            </div>

            {/* Información de contacto */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Información de Contacto
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Tipo de Documento
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {formData.documentType}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Número de Documento
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {formData.documentNumber}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Celular
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {formData.phone}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">
                    Tipo de Cotización
                  </label>
                  <p className="text-gray-900 font-semibold">{planTypeText}</p>
                </div>
              </div>
            </div>

            {/* Políticas aceptadas */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Políticas Aceptadas
              </h2>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-500 text-sm">✓</span>
                  </div>
                  <span className="text-gray-900">Política de Privacidad</span>
                </div>

                {formData.acceptCommercial && (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-500 text-sm">✓</span>
                    </div>
                    <span className="text-gray-900">
                      Política de Comunicaciones Comerciales
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Columna derecha - Resumen del plan */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Resumen del Plan
              </h2>

              {/* Nombre del plan */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedPlan.plan.name}
                </h3>
                <p className="text-sm text-gray-600">{planTypeText}</p>
              </div>

              {/* Precio */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xs text-gray-500">S/</span>
                  <span className="text-3xl font-bold text-gray-900">
                    {selectedPlan.discountedPrice}
                  </span>
                  <span className="text-sm text-gray-500">/ mes</span>
                </div>

                {selectedPlan.planType === "for-someone" && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 line-through">
                      S/ {selectedPlan.plan.price}
                    </span>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                      5% descuento
                    </span>
                  </div>
                )}
              </div>

              {/* Beneficios incluidos */}
              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Beneficios incluidos:
                </h4>
                <ul className="space-y-2">
                  {selectedPlan.plan.description.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-green-500 mt-0.5 flex-shrink-0">
                        ✓
                      </span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Botón de acción */}
              <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors mt-6">
                Comprar Plan
              </button>

              {/* Enlace de términos */}
              <p className="text-xs text-gray-500 text-center mt-4">
                Aplican términos y condiciones.
              </p>
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
          >
            ← Volver a planes
          </button>

          <button
            onClick={() => window.print()}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg transition-colors"
          >
            Descargar Resumen
          </button>
        </div>
      </div>
    </div>
  );
}
