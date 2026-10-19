import { useEffect } from "react";

let locks = 0;

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    locks += 1;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      locks -= 1;
      if (locks === 0) root.style.overflow = previous;
    };
  }, [locked]);
}
