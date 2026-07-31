
export enum StringType {
  Text = "text",
  Email = "email",
  Password = "password",
}

// text Inputs (password, mail, name)
export const StringInput = ({
  placeholder,
  value,
  type,
  disabled = false,
  onChange,
  className = "input",
}: {
  placeholder?: string;
  value: string;
  type: StringType;
  disabled?: boolean;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};