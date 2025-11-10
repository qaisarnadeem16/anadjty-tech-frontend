import * as React from "react";

type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
  asChild?: boolean; // <-- supporte <Button asChild>...</Button>
  children?: React.ReactNode;
};

const base =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  default: "bg-sky-600 text-white hover:bg-sky-700 focus:ring-sky-500",
  outline:
    "border border-slate-300 text-slate-100 hover:bg-slate-800/50 focus:ring-slate-400",
  ghost: "text-slate-100 hover:bg-slate-800/50 focus:ring-slate-400",
};
const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-5 text-base",
  icon: "h-9 w-9",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "md", asChild = false, children, ...props }, ref) => {
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

    if (asChild) {
      // ne pas passer "asChild" au DOM; on applique juste les classes au wrapper
      return <span className={classes}>{children}</span>;
    }

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
