import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
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
      return "Every 2 weeks";
    case 4:
      return "Every 4 weeks";
    case 6:
      return "Every 6 weeks";
    default:
      return `Every ${weeks} weeks`;
  }
}
