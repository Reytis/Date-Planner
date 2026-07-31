import { formatDateValue } from "../Input";

// date inut (startTime)
export const DateTimeInput = ({
  placeholder,
  value,
  onChange,
  className = "input",
  disabled = false,
}: {
  placeholder?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <input
      className={className}
      type="datetime-local"
      placeholder={placeholder}
      disabled={disabled}
      value={value ? formatDateValue(value, "datetime-local") : ""}
      onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
    />
  );
};