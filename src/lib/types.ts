import { Product, ProductImage, ProductFaq, Review } from "@prisma/client";

export type ProductWithRelations = Product & {
  images: ProductImage[];
  faqs: ProductFaq[];
  reviews: Review[];
};

export type ProductCard = Pick<
  Product,
  | "id"
  | "name"
  | "slug"
  | "shortDesc"
  | "price"
  | "compareAt"
  | "petType"
  | "category"
  | "subscriptionDiscount"
  | "isFeatured"
> & {
  images: Pick<ProductImage, "url" | "alt">[];
};

export interface CartItemType {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  isSubscription: boolean;
  intervalWeeks?: number;
  subscriptionDiscount: number;
}

export interface QuizAnswers {
  petType: "DOG" | "CAT";
  petName: string;
  petAge: "puppy" | "adult" | "senior" | "kitten";
  petSize: "small" | "medium" | "large";
  sensitivities: string[];
  preferences: string[];
}
