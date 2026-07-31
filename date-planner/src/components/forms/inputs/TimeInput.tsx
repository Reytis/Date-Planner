import { formatDateValue } from "../Input";

// time input (durations)
export const TimeInput = ({
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
  const formattedValue = value ? formatDateValue(value, "time") : "";

  return (
    <input
      className={className}
      type="time"
      placeholder={placeholder}
      disabled={disabled}
      value={formattedValue}
      onChange={(e) => {
        const [hours, minutes] = e.target.value.split(":");
        if (!hours || !minutes) {
          onChange(null);
          return;
        }

        const nextDate = value ? new Date(value) : new Date();
        nextDate.setHours(parseInt(hours, 10));
        nextDate.setMinutes(parseInt(minutes, 10));
        nextDate.setSeconds(0);
        nextDate.setMilliseconds(0);

        onChange(nextDate);
      }}
    />
  );
};