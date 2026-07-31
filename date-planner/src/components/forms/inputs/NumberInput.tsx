// number Input (price)
export const NumberInput = ({
  placeholder,
  value,
  onChange,
  className = "input",
  disabled = false,
}: {
  placeholder?: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <input
      className={className}
      type="number"
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    />
  );
};