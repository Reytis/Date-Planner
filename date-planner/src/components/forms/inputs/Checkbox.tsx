import { Label, LabelSize } from "../Label";

// checkbox input
export const CheckboxInput = ({
  checked,
  label,
  onChange,
  className = "checkbox",
  disabled = false,
}: {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
  className?: string;
  disabled?: boolean;
}) => {
  return <div className="flex flex-row items-center gap-1 py-2 cursor-pointer **:cursor-pointer">
    <input
      className={className}
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
    />
    <Label size={LabelSize.m}>{label}</Label>
  </div>

};