"use client";

import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

type CustomSelectProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  error?: string | null | false;
  className?: string;
  children: React.ReactNode;
  showLabelOnFocus?: boolean;
  disabled?: boolean;
};

const CustomSelect = (props: CustomSelectProps) => {
  const {
    label,
    placeholder,
    value,
    onChange,
    name,
    error,
    className,
    showLabelOnFocus = true,
    children,
    disabled
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const shouldShowLabel = showLabelOnFocus && (isFocused || value);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          disabled={disabled}
          name={name}
          className={`
            w-full px-4 py-3 border-2 border-[#B0B0B0] rounded-md
            focus:outline-none focus:ring-[1px] focus:ring-[#1A3447] focus:border-[#1A3447]
            appearance-none bg-white
            ${error ? "border-red-500" : ""}
            peer
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {label && (
          <label
            htmlFor={name}
            className={`
              absolute left-4 transition-all duration-200 ease-in-out
              ${shouldShowLabel
                ? "top-0 -translate-y-1/2 bg-white px-1 text-sm text-gray-600"
                : "top-1/2 -translate-y-1/2 text-gray-400"}
              peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:bg-white 
              peer-focus:px-1 peer-focus:text-sm peer-focus:text-gray-600
              pointer-events-none
            `}
          >
            {label}
          </label>
        )}

        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
          {isFocused ? (
            <IoIosArrowUp className="text-gray-500" size={20} />
          ) : (
            <IoIosArrowDown className="text-gray-500" size={20} />
          )}
        </div>
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CustomSelect;