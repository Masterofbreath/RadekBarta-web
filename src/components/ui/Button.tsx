import Link from "next/link";
import { ArrowRightIcon } from "./Icons";
import { ReactNode } from "react";

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  external?: boolean;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  arrow?: boolean;
}

const variants = {
  primary:
    "bg-[#97724f] text-white hover:bg-[#7a5c3e] border-transparent",
  outline:
    "bg-transparent text-[#97724f] border-[#97724f] hover:bg-[#97724f] hover:text-white",
  ghost:
    "bg-transparent text-dark border-transparent hover:text-[#97724f]",
};

const sizes = {
  sm: "px-5 py-2.5 text-sm",
  md: "px-7 py-3.5 text-sm",
  lg: "px-9 py-4 text-base",
};

export default function Button({
  href,
  onClick,
  children,
  variant = "primary",
  size = "md",
  external,
  type = "button",
  disabled,
  className = "",
  arrow = false,
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 font-heading font-semibold rounded-full border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {children}
      {arrow && <ArrowRightIcon className="w-4 h-4" />}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
