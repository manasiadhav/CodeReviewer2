import React from "react";
import { cn } from "../../lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, label, error, hint, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label 
            htmlFor={props.id} 
            className="block text-sm font-medium mb-1 text-primary-900"
          >
            {label}
          </label>
        )}
        <select
          className={cn(
            "w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent-600 focus:border-accent-600 appearance-none cursor-pointer",
            error && "border-destructive focus:ring-destructive focus:border-destructive",
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {hint && !error && (
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        )}
        {error && (
          <p className="mt-1 text-xs text-destructive">{error}</p>
        )}
      </div>
    );
  }
);

Select.displayName = "Select";

export { Select };