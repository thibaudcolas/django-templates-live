import React, { Component, useCallback } from "react";

interface SelectProps {
  value: string;
  id: string;
  className: string;
  options: ReadonlyArray<{
    label: string;
    value: string;
    disabled?: boolean;
  }>;
  onChange: (value: string) => void;
}

const Select = ({ value, id, className, options, onChange }: SelectProps) => {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange]);

  return (
    <select value={value} id={id} className={className} onChange={handleChange}>
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
