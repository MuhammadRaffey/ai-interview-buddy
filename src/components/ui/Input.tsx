import { LucideIcon } from "lucide-react";

interface InputProps {
  label?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  icon?: LucideIcon;
  min?: number;
  max?: number;
  required?: boolean;
  className?: string;
  id?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon: Icon,
  min,
  max,
  required = false,
  className = "",
  id,
}) => {
  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-300"
        >
          {Icon && <Icon size={16} className="text-blue-400" />}
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        max={max}
        required={required}
        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:border-gray-500"
      />
    </div>
  );
};

export default Input;
