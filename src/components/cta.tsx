import Link from "next/link";
import type { ReactNode } from "react";

type CtaProps = {
  href: string;
  children: ReactNode;
  tone?: "light" | "dark";
  variant?: "solid" | "ghost";
};

const base =
  "inline-flex min-h-12 w-full touch-manipulation items-center justify-center px-5 text-center text-[0.7rem] font-medium tracking-[0.14em] transition-colors duration-300 ease-out active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#318BC3] motion-reduce:transition-none motion-reduce:active:scale-100 sm:px-6 sm:text-[0.72rem] sm:tracking-[0.16em] xl:w-auto";

const styles = {
  light: {
    solid:
      "bg-[#F7F7F2] text-[#07111C] hover:bg-[#318BC3] hover:text-[#07111C]",
    ghost:
      "text-[#F7F7F2] ring-1 ring-inset ring-[#F7F7F2]/45 hover:bg-[#F7F7F2] hover:text-[#07111C]",
  },
  dark: {
    solid:
      "bg-[#07111C] text-[#F7F7F2] hover:bg-[#318BC3] hover:text-[#07111C]",
    ghost:
      "text-[#07111C] ring-1 ring-inset ring-[#07111C]/30 hover:bg-[#07111C] hover:text-[#F7F7F2]",
  },
} as const;

export function Cta({
  href,
  children,
  tone = "light",
  variant = "solid",
}: CtaProps) {
  const className = `${base} ${styles[tone][variant]}`;
  const external =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

  if (external) {
    return (
      <a
        href={href}
        className={className}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noreferrer" }
          : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
