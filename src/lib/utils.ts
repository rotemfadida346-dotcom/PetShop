import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number): string {
  return `₪${price.toFixed(2)}`;
}

export function calculateSubscriptionPrice(
  price: number,
  discountPercent: number
): number {
  return price * (1 - discountPercent / 100);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return text.slice(0, length) + "...";
}

export function getSubscriptionIntervalLabel(weeks: number): string {
  switch (weeks) {
    case 2:
      return "כל שבועיים";
    case 4:
      return "כל 4 שבועות";
    case 6:
      return "כל 6 שבועות";
    default:
      return `כל ${weeks} שבועות`;
  }
}

export function getShippingCost(subtotal: number): number {
  return subtotal >= 200 ? 0 : 25;
}
