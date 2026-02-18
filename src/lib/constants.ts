export const SITE_NAME = "PawStory";
export const SITE_DESCRIPTION = "PawStory - החנות הפרימיום לחיות מחמד בישראל. מבחר מוצרים איכותיים לכלבים וחתולים: מזון, צעצועים, אביזרים ועוד. משלוחים מהירים וייעוץ מקצועי.";
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export const CURRENCY = "₪";
export const FREE_SHIPPING_THRESHOLD = 200;
export const SHIPPING_COST = 25;

export const SUBSCRIPTION_INTERVALS = [
  { weeks: 2, label: "כל שבועיים" },
  { weeks: 4, label: "כל 4 שבועות" },
  { weeks: 6, label: "כל 6 שבועות" },
] as const;

export const PET_TYPES = [
  { value: "DOG", label: "כלבים", emoji: "🐕" },
  { value: "CAT", label: "חתולים", emoji: "🐈" },
] as const;

export const PRODUCT_CATEGORIES = [
  { value: "FOOD", label: "מזון" },
  { value: "TREATS", label: "חטיפים" },
  { value: "LITTER", label: "חול" },
  { value: "SUPPLEMENTS", label: "תוספים" },
  { value: "TOYS", label: "צעצועים" },
  { value: "ACCESSORIES", label: "אביזרים" },
] as const;

export const NAV_LINKS = [
  { href: "/shop", label: "חנות" },
  { href: "/shop?pet=DOG", label: "כלבים" },
  { href: "/shop?pet=CAT", label: "חתולים" },
  { href: "/subscriptions", label: "מנויים" },
  { href: "/quiz", label: "התאמה אישית" },
  { href: "/about", label: "אודות" },
] as const;

export const FOOTER_LINKS = {
  shop: [
    { href: "/shop?pet=DOG", label: "מוצרים לכלבים" },
    { href: "/shop?pet=DOG&category=TREATS", label: "חטיפים לכלבים" },
    { href: "/shop?pet=CAT", label: "מוצרים לחתולים" },
    { href: "/shop?pet=CAT&category=LITTER", label: "חול לחתולים" },
    { href: "/shop?pet=CAT&category=TREATS", label: "חטיפים לחתולים" },
  ],
  company: [
    { href: "/about", label: "הסיפור שלנו" },
    { href: "/quiz", label: "התאמה אישית" },
    { href: "/contact", label: "צור קשר" },
  ],
  support: [
    { href: "/faq", label: "שאלות נפוצות" },
    { href: "/shipping", label: "מדיניות משלוחים" },
    { href: "/returns", label: "החזרות" },
    { href: "/account", label: "החשבון שלי" },
  ],
} as const;
