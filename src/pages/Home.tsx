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

    // Validar formulario
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Consumir API de usuario
      const userData = await fetchUser();

      // Guardar datos en el contexto
      setUser(userData);
      setFormData(formData);

      // Navegar a la página de planes
      navigate("/planes");
    } catch (error) {
      console.error("Error al obtener usuario:", error);
      alert("Ocurrió un error al procesar tu solicitud. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // En Home.tsx, reemplaza el div principal:
    <div className="bg-white min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-8rem)] relative overflow-hidden">
      {/* Efectos de luz/iluminación */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute top-0 right-0 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-rose-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Imagen izquierda  */}
          <div className="hidden md:block">
            <img
              src={familyImage}
              alt="Seguro de Salud Flexible"
              className="w-full h-auto rounded-2xl object-cover"
            />
          </div>

          {/* Formulario derecha */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            {/* Etiqueta superior */}
            <div className="inline-block bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              Seguro de Salud Flexible
            </div>

            {/* Título */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
              Creado para ti y tu familia
            </h1>

            {/* Separador */}
            <div className="w-12 h-1 bg-blue-600 mb-6"></div>

            {/* Descripción */}
            <p className="text-sm text-gray-600 mb-6">
              Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra
              asesoría. 100% online.
            </p>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Tipo y número de documento */}
              <div className="flex gap-3">
                {/* Select tipo de documento */}
                <select
                  value={formData.documentType}
                  onChange={(e) =>
                    updateField("documentType", e.target.value as "DNI" | "RUC")
                  }
                  className="w-32 px-3 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="DNI">DNI</option>
                  <option value="RUC">RUC</option>
                </select>

                {/* Input número de documento */}
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Nro. de documento"
                    value={formData.documentNumber}
                    onChange={(e) =>
                      updateField(
                        "documentNumber",
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    maxLength={formData.documentType === "DNI" ? 8 : 11}
                    className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.documentNumber
                        ? "border-red-500"
                        : "border-gray-300"
                    }`}
                  />
                  {errors.documentNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.documentNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Teléfono celular */}
              <div>
                <input
                  type="text"
                  placeholder="Celular"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField("phone", e.target.value.replace(/\D/g, ""))
                  }
                  maxLength={9}
                  className={`w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                />
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

              {/* Checkbox Política de Comunicaciones */}
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
                  className="bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
