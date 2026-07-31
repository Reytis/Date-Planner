
// text area
export const Textarea = ({
  placeholder,
  value,
  disabled = false,
  onChange,
  className = "input",
}: {
  placeholder?: string;
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <textarea
      className={`${className} min-h-32`}
      maxLength={200}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};