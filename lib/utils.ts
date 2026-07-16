import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "₦"): string {
  if (amount >= 1_000_000) {
    return `${currency}${(amount / 1_000_000).toFixed(0)} Million`;
  }
  if (amount >= 1_000) {
    return `${currency}${(amount / 1_000).toFixed(0)}K`;
  }
  return `${currency}${amount.toLocaleString()}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function generateReference(): string {
  return `GMTSC-${Date.now().toString(36).toUpperCase()}-${Math.random()
    .toString(36)
    .slice(2, 6)
    .toUpperCase()}`;
}
