"use client";
import React from "react";
import Select from "react-dropdown-select";
import { InputFieldLabel, InputFieldError, InputFieldHelperText } from "./InputField";

type OptionType = { id: string; value: string; label: string };

interface InputSelectProps {
  label?: string;
  name?: string;
  value?: string;
  onChange?: (val: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  className?: string;
  options?: OptionType[];
  placeholder?: string;
}

export function InputSelect({
  label = "",
  name,
  value,
  onChange,
  required,
  disabled,
  error,
  helperText,
  className = "",
  options = [],
  placeholder = "Select",
}: InputSelectProps) {
  return (
    <div className={`maiacare-input-field-container ${className}`}>
      {label && <InputFieldLabel label={label} required={required} />}

      <Select
        name={name}
        className="maiacare-input-field custom-react-dropdown"
        options={options.map((opt) => ({ value: opt.value, label: opt.label }))}
        values={value ? [{ value, label: options.find((o) => o.value === value)?.label || "" }] : []}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(vals) => onChange && onChange(vals[0]?.value || "")}
        dropdownHeight="150px"
      />

      {helperText && !error && <InputFieldHelperText helperText={helperText} />}
      {error && <InputFieldError error={error} />}
    </div>
  );
}
