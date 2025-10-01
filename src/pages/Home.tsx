import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useInsurance } from "../hooks/useInsurance";
import { useHomeForm } from "../hooks/useHomeForm";
import { fetchUser } from "../services/api";
import familyImage from "../assets/Imagen-Home.svg";

export function Home() {
  const navigate = useNavigate();
  const { setUser, setFormData } = useInsurance();
  const { formData, errors, updateField, validateForm } = useHomeForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const userData = await fetchUser();
      setUser(userData);
      setFormData(formData);
      navigate("/planes");
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      alert("Ocurrió un error al procesar tu solicitud. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex-1 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 relative z-10">
        {/* Versión Mobile */}
        <div className="block md:hidden space-y-6">
          {/* Header horizontal */}
          <div className="flex items-start gap-4">
            {/* Columna izquierda - Tag y título */}
            <div className="flex-1">
              <div className="inline-block bg-gradient-to-r from-cyan-200 to-green-400 text-black text-xs font-semibold px-3 py-1 rounded-md mb-2">
                Seguro de Salud Flexible
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Creado para ti y tu familia
              </h1>
            </div>

            {/* Columna derecha - Imagen */}
            <div className="flex-shrink-0">
              <img
                src={familyImage}
                alt="Seguro de Salud Flexible"
                className="size-40 rounded-xl object-cover" // Imagen más compacta
              />
            </div>
          </div>

          {/* Separador*/}
          <div className="w-full h-px bg-gray-300"></div>

          {/* Descripción */}
          <p className="text-sm text-black font-medium text-start">
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
            asesoría. 100% online.
          </p>

          {/* Formulario */}
          <div className="space-y-4">
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo y número de documento  */}
              <div className="flex">
                {/* Select tipo de documento */}
                <div className="relative flex-shrink-0">
                  <select
                    value={formData.documentType}
                    onChange={(e) =>
                      updateField(
                        "documentType",
                        e.target.value as "DNI" | "RUC"
                      )
                    }
                    className="w-28 px-4 py-4 border border-gray-700 border-r-0 rounded-l-lg rounded-r-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 appearance-none bg-white"
                  >
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </select>

                  {/* Ícono de flecha para el select */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Input número de documento */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) =>
                      updateField(
                        "documentNumber",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    maxLength={formData.documentType === "DNI" ? 8 : 11}
                    className={`w-full px-4 py-4 border border-gray-700  rounded-r-lg rounded-l-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 ${
                      errors.documentNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } ${
                      formData.documentNumber.length > 0 ? "pt-6 pb-2" : "py-4"
                    }`}
                  />

                  {/* Label flotante */}
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      formData.documentNumber.length > 0
                        ? "top-2 text-xs text-gray-500"
                        : "top-4 text-sm text-gray-400"
                    }`}
                  >
                    Nro. de documento
                  </label>

                  {errors.documentNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.documentNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Teléfono celular */}
              <div className="relative">
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={9}
                  className={`w-full px-4 py-4 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500" : "border-gray-700"
                  } ${formData.phone.length > 0 ? "pt-6 pb-2" : "py-4"}`}
                />

                {/* Label flotante */}
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    formData.phone.length > 0
                      ? "top-2 text-xs text-gray-500"
                      : "top-4 text-sm text-gray-400"
                  }`}
                >
                  Celular
                </label>

                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Checkbox Política de Privacidad */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptPrivacy}
                    onChange={(e) =>
                      updateField("acceptPrivacy", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">
                    Acepto la Política de Privacidad
                  </span>
                </label>
                {errors.acceptPrivacy && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.acceptPrivacy}
                  </p>
                )}
              </div>

              {/* Checkbox Política de Comunicaciones Comerciales */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptCommercial}
                    onChange={(e) =>
                      updateField("acceptCommercial", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">
                    Acepto la Política de Comunicaciones Comerciales
                  </span>
                </label>
                {errors.acceptCommercial && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.acceptCommercial}
                  </p>
                )}
              </div>

              {/* Enlace */}
              <p className="text-xs text-black underline">
                Aplican términos y condiciones.
              </p>

              {/* Botón submit */}

              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Cotizando..." : "Cotiza aquí"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Versión Desktop */}
        <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Imagen izquierda */}
          <div>
            <img
              src={familyImage}
              alt="Seguro de Salud Flexible"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          {/* Formulario derecha */}
          <div className="p-6 md:p-8 ">
            {/* Etiqueta superior */}
            <div className="inline-block bg-gradient-to-r from-cyan-200 to-green-400 text-black text-xs font-semibold px-3 py-1 rounded-md mb-4">
              Seguro de Salud Flexible
            </div>

            {/* Título */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Creado para ti y tu familia
            </h1>

            {/* Descripción */}
            <p className="text-sm text-black mb-6">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
              asesoría. 100% online.
            </p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tipo y número de documento  */}
              <div className="flex">
                {/* Select tipo de documento */}
                <div className="relative flex-shrink-0">
                  <select
                    value={formData.documentType}
                    onChange={(e) =>
                      updateField(
                        "documentType",
                        e.target.value as "DNI" | "RUC"
                      )
                    }
                    className="w-28 px-4 py-4 border border-gray-700 border-r-0 rounded-l-lg rounded-r-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 appearance-none bg-white"
                  >
                    <option value="DNI">DNI</option>
                    <option value="RUC">RUC</option>
                  </select>

                  {/* Ícono de flecha para el select */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Input número de documento  */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={formData.documentNumber}
                    onChange={(e) =>
                      updateField(
                        "documentNumber",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    maxLength={formData.documentType === "DNI" ? 8 : 11}
                    className={`w-full px-4 py-4 border border-gray-700  rounded-r-lg rounded-l-none text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10 ${
                      errors.documentNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    } ${
                      formData.documentNumber.length > 0 ? "pt-6 pb-2" : "py-4"
                    }`}
                  />

                  {/* Label flotante */}
                  <label
                    className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                      formData.documentNumber.length > 0
                        ? "top-2 text-xs text-gray-500"
                        : "top-4 text-sm text-gray-400"
                    }`}
                  >
                    Nro. de documento
                  </label>

                  {errors.documentNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.documentNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Teléfono celular */}
              <div className="relative">
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={9}
                  className={`w-full px-4 py-4 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } ${formData.phone.length > 0 ? "pt-6 pb-2" : "py-4"}`}
                />

                {/* Label flotante */}
                <label
                  className={`absolute left-4 transition-all duration-200 pointer-events-none ${
                    formData.phone.length > 0
                      ? "top-2 text-xs text-gray-500"
                      : "top-4 text-sm text-gray-400"
                  }`}
                >
                  Celular
                </label>

                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Checkbox Política de Privacidad */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptPrivacy}
                    onChange={(e) =>
                      updateField("acceptPrivacy", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">
                    Acepto la Política de Privacidad
                  </span>
                </label>
                {errors.acceptPrivacy && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.acceptPrivacy}
                  </p>
                )}
              </div>

              {/* Checkbox Política de Comunicaciones Comerciales */}
              <div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.acceptCommercial}
                    onChange={(e) =>
                      updateField("acceptCommercial", e.target.checked)
                    }
                    className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs text-gray-700">
                    Acepto la Política de Comunicaciones Comerciales
                  </span>
                </label>
                {errors.acceptCommercial && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.acceptCommercial}
                  </p>
                )}
              </div>

              {/* Enlace */}
              <p className="text-xs text-black underline">
                Aplican términos y condiciones.
              </p>

              {/* Botón submit */}

              <div className="flex justify-start">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Cotizando..." : "Cotiza aquí"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
