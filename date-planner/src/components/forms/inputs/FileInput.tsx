import { Img, Upload, File } from "@/assets/icons";
import { useRef, useState } from "react";
import { Label } from "../Label";

// file input (cover, tickets)
export const FileInput = ({
  placeholder,
  value,
  onChange,
  acceptedTypes,
  className = "file",
  disabled = false,
}: {
  placeholder?: string;
  value: File | null;
  acceptedTypes: string[];
  onChange: (value: File | null) => void;
  className?: string;
  disabled?: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(value);
  const isImage = file ? file.type.startsWith("image/") : false;
  
  return <div className="relative">
    {/* To handle preview of selection we replace apparence of input */}
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      className=" cursor-pointer flex items-center justify-center w-full h-20 rounded-md border-2 border-background-4 bg-background-2 hover:bg-background-3 hover:border-foreground-3 transition-all duration-200 ease-in overflow-hidden"
    >
        {file ? (
          <div>
            <img
            src={URL.createObjectURL(file)}
            alt=""
            className="h-full w-full object-cover"
            />
            {isImage ? 
              <Img className="size-12 text-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" /> :
              <File className="size-12 text-foreground absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            }
          </div>
        ) : (
          <Upload className="size-12 text-foreground" />
        )}
    </button>

    <span className="small-p text-foreground-3">
      {file?.name ?? "No file selected"}
    </span>
    <input
      ref={inputRef}
      className={className}
      type="file"
      accept={acceptedTypes.join(",")}
      placeholder={placeholder}
      disabled={disabled}
      onChange={(e) => {
        const selectedFile = e.target.files ? e.target.files[0] : null;
        onChange(selectedFile);
        setFile(selectedFile);
      }}
    />
  </div>;
};