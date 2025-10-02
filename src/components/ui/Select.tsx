import { LucideIcon } from "lucide-react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  icon?: LucideIcon;
  className?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  options,
  icon: Icon,
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
          {Icon && <Icon size={16} className="text-green-400" />}
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-gray-500 cursor-pointer"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
