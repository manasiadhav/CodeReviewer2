import React from "react";
import { cn } from "../../lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = "primary",
    size = "md", 
    isLoading = false,
    leftIcon,
    rightIcon,
    children, 
    disabled, 
    ...props 
  }, ref) => {
    const variantStyles = {
      primary: "bg-accent-600 text-white hover:bg-accent-700 active:bg-accent-800 shadow-sm",
      secondary: "bg-secondary text-primary hover:bg-gray-200 active:bg-gray-300",
      outline: "border border-input bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
      ghost: "bg-transparent text-foreground hover:bg-secondary active:bg-secondary/80",
      link: "bg-transparent text-accent underline-offset-4 hover:underline",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 active:bg-destructive/80",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-md",
      md: "h-10 px-4 py-2 text-sm rounded-md",
      lg: "h-12 px-6 py-3 text-base rounded-md",
      icon: "h-10 w-10 rounded-md",
    };
    
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <span className="mr-2 animate-spin">⟳</span>
        )}
        {!isLoading && leftIcon && (
          <span className={cn("mr-2", size === "sm" ? "text-xs" : "text-sm")}>{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className={cn("ml-2", size === "sm" ? "text-xs" : "text-sm")}>{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };