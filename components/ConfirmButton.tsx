"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  message: string;
  className?: string;
};

// Submit button that asks for confirmation before letting the (server-action)
// form submit.
export function ConfirmButton({ children, message, className }: Props) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
