interface FloatingInputProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  error?: string;
  placeholder?: string;
}

export function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  maxLength,
  error,
  placeholder,
}: FloatingInputProps) {
  const isFilled = value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        placeholder={placeholder}
        className={`w-full px-4 py-4 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-500" : "border-gray-300"
        } ${isFilled ? "pt-6 pb-2" : "py-4"}`}
      />

      {/* Label flotante */}
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFilled
            ? "top-2 text-xs text-gray-500"
            : "top-4 text-sm text-gray-400"
        }`}
      >
        {label}
      </label>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
