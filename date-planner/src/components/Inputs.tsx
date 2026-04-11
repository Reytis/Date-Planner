"use client";

const formatDateValue = (value: Date, type: "date" | "datetime-local" | "time") => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const year = value.getFullYear();
  const month = pad(value.getMonth() + 1);
  const day = pad(value.getDate());
  const hours = pad(value.getHours());
  const minutes = pad(value.getMinutes());

  if (type === "datetime-local") {
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  if (type === "time") {
    return `${hours}:${minutes}`;
  }

  return `${year}-${month}-${day}`;
};

const baseInputClassName =
  "font-mono text-2xl pt-3 pb-3 pl-4 pr-4 border-2 border-gray-500 rounded w-full";

export enum StringType {
  Text = "text",
  Email = "email",
  Password = "password",
}

export const StringInput = ({
  placeholder,
  value,
  type,
  onChange,
  className = baseInputClassName,
}: {
  placeholder?: string;
  value: string;
  type: StringType;
  onChange: (value: string) => void;
  className?: string;
}) => {
  return (
    <input
      className={className}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const NumberInput = ({
  placeholder,
  value,
  onChange,
  className = baseInputClassName,
}: {
  placeholder?: string;
  value: number;
  onChange: (value: number) => void;
  className?: string;
}) => {
  return (
    <input
      className={className}
      type="number"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
    />
  );
};

export const FileInput = ({
  placeholder,
  value,
  onChange,
  acceptedTypes,
  className = baseInputClassName,
}: {
  placeholder?: string;
  value: File | null;
  acceptedTypes: string[];
  onChange: (value: File | null) => void;
  className?: string;
}) => {
  return (
    <input
      className={className}
      type="file"
      accept={acceptedTypes.join(",")}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
    />
  );
};

export const TimeInput = ({
  placeholder,
  value,
  onChange,
  className = baseInputClassName,
}: {
  placeholder?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  className?: string;
}) => {
  const formattedValue = value ? formatDateValue(value, "time") : "";

  return (
    <input
      className={className}
      type="time"
      placeholder={placeholder}
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

export const DateTimeInput = ({
  placeholder,
  value,
  onChange,
  className = baseInputClassName,
}: {
  placeholder?: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  className?: string;
}) => {
  return (
    <input
      className={className}
      type="datetime-local"
      placeholder={placeholder}
      value={value ? formatDateValue(value, "datetime-local") : ""}
      onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
    />
  );
};

export const CheckboxInput = ({
  checked,
  onChange,
  className = baseInputClassName,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}) => {
  return <input
    className={className}
    type="checkbox"
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
  />
};