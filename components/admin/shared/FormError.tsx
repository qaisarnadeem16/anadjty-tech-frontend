"use client";

import React from "react";

interface FormErrorProps {
  errors: Array<{ field: string; message: string }>;
  field?: string;
}

const FormError: React.FC<FormErrorProps> = ({ errors, field }) => {
  if (!errors || errors.length === 0) return null;

  const fieldErrors = field
    ? errors.filter((err) => err.field === field)
    : errors;

  if (fieldErrors.length === 0) return null;

  return (
    <div className="mt-1">
      {fieldErrors.map((error, index) => (
        <p key={index} className="text-sm text-red-600">
          {error.message}
        </p>
      ))}
    </div>
  );
};

export default FormError;

