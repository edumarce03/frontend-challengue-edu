interface StepperProps {
  currentStep: 1 | 2;
}

export function Stepper({ currentStep }: StepperProps) {
  return (
    <>
      {/* Versión Desktop - Steps */}
      <div className="hidden md:flex items-center gap-4 bg-white py-6 px-8">
        {/* Paso 1 */}
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 1
                ? "bg-blue-600 text-white"
                : "bg-blue-600 text-white"
            }`}
          >
            1
          </div>
          <span
            className={`text-sm font-semibold ${
              currentStep === 1 ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Planes y coberturas
          </span>
        </div>

        {/* Separador */}
        <div className="flex-1 h-px bg-gray-300 mx-2"></div>

        {/* Paso 2 */}
        <div className="flex items-center gap-3">
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
              currentStep === 2
                ? "bg-blue-600 text-white"
                : "bg-gray-300 text-gray-600"
            }`}
          >
            2
          </div>
          <span
            className={`text-sm font-semibold ${
              currentStep === 2 ? "text-gray-900" : "text-gray-500"
            }`}
          >
            Resumen
          </span>
        </div>
      </div>

      {/* Versión Mobile - Progress Bar */}
      <div className="md:hidden bg-white py-4 px-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-gray-900">
            PASO {currentStep} DE 2
          </span>
          <button className="text-xs text-blue-600 font-semibold">
            {currentStep === 1 ? "Planes y coberturas" : "Resumen"}
          </button>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${currentStep * 50}%` }}
          ></div>
        </div>
      </div>
    </>
  );
}
