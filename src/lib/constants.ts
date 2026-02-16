export const SITE_NAME = "Pawsome";
export const SITE_DESCRIPTION =
  "Premium nutrition for your dogs & cats. Vet-approved, naturally sourced ingredients your pets will love.";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const SUBSCRIPTION_INTERVALS = [
  { weeks: 2, label: "Every 2 weeks" },
  { weeks: 4, label: "Every 4 weeks" },
  { weeks: 6, label: "Every 6 weeks" },
] as const;

export const PET_TYPES = [
  { value: "DOG", label: "Dogs", emoji: "🐕" },
  { value: "CAT", label: "Cats", emoji: "🐈" },
] as const;

export const PRODUCT_CATEGORIES = [
  { value: "FOOD", label: "Food" },
  { value: "TREATS", label: "Treats" },
  { value: "LITTER", label: "Litter" },
  { value: "SUPPLEMENTS", label: "Supplements" },
  { value: "TOYS", label: "Toys" },
  { value: "ACCESSORIES", label: "Accessories" },
] as const;

export const NAV_LINKS = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?pet=DOG", label: "Dogs" },
  { href: "/shop?pet=CAT", label: "Cats" },
  { href: "/quiz", label: "Find Your Match" },
  { href: "/about", label: "Our Story" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { href: "/shop?pet=DOG", label: "Dog Food" },
    { href: "/shop?pet=DOG&category=TREATS", label: "Dog Treats" },
    { href: "/shop?pet=CAT", label: "Cat Food" },
    { href: "/shop?pet=CAT&category=LITTER", label: "Cat Litter" },
    { href: "/shop?pet=CAT&category=TREATS", label: "Cat Treats" },
  ],
  company: [
    { href: "/about", label: "Our Story" },
    { href: "/quiz", label: "Pet Quiz" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  support: [
    { href: "/faq", label: "FAQ" },
    { href: "/shipping", label: "Shipping" },
    { href: "/returns", label: "Returns" },
    { href: "/account", label: "My Account" },
  ],
} as const;
