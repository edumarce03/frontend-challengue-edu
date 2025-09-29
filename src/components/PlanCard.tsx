import type { Plan } from "../types";

interface PlanCardProps {
  plan: Plan;
  isForSomeone: boolean;
  onSelect: () => void;
}

export function PlanCard({ plan, isForSomeone, onSelect }: PlanCardProps) {
  const finalPrice = isForSomeone ? plan.price * 0.95 : plan.price;

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-blue-600 transition-colors p-6 cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">{plan.name}</h3>
          {isForSomeone && (
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
              5% descuento
            </span>
          )}
        </div>
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">🏠</span>
        </div>
      </div>

      {/* Precio */}
      <div className="mb-4">
        <div className="flex items-baseline gap-1">
          <span className="text-xs text-gray-500">S/</span>
          <span className="text-3xl font-bold text-gray-900">{finalPrice}</span>
          <span className="text-sm text-gray-500">/ mes</span>
        </div>
        {isForSomeone && (
          <p className="text-xs text-gray-500 line-through mt-1">
            S/ {plan.price}
          </p>
        )}
      </div>

      {/* Separador */}
      <div className="border-t border-gray-200 mb-4"></div>

      {/* Descripción */}
      <ul className="space-y-3 mb-6">
        {plan.description.map((item, index) => (
          <li
            key={index}
            className="flex items-start gap-2 text-sm text-gray-700"
          >
            <span className="text-green-500 mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Botón */}
      <button
        onClick={onSelect}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg transition-colors"
      >
        Seleccionar Plan
      </button>
    </div>
  );
}
