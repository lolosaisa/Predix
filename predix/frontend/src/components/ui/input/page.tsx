import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full px-3 py-2 border border-gray-300 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 ${className}`}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
