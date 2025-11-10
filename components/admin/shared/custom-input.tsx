"use client";

import React, { useState } from "react";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";

type CustomInputProps = {
  label?: string;
  type?: string;
  inputType?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  name?: string;
  error?: string | null | false;
  className?: string;
  showLabelOnFocus?: boolean;
  disabled?: boolean;
};

const CustomInput = (props: CustomInputProps) => {
  const {
    label,
    type,
    inputType,
    placeholder,
    value,
    onChange,
    onBlur,
    name,
    error,
    className,
    showLabelOnFocus = true,
    disabled
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const actualType = type || inputType || "text";
  const isPassword = actualType === "password";

  const shouldShowLabel = showLabelOnFocus && (isFocused || value);

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <input
          type={isPassword && !showPassword ? "password" : "text"}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={`
            w-full px-4 py-3 border-2 border-[#B0B0B0] rounded-md
            focus:outline-none focus:ring-[1px] focus:ring-[#1A3447] focus:border-[#1A3447]
            ${error ? "border-red-500" : ""}
            peer
          `}
        />

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

        {isPassword && (
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <IoIosEyeOff className="text-gray-500" size={20} />
            ) : (
              <IoIosEye className="text-gray-500" size={20} />
            )}
          </button>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default CustomInput;
