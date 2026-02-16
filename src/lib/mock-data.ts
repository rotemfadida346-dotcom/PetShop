// Mock product data for development and static rendering
// In production, this comes from Prisma/database

export const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Premium Chicken & Rice Dog Food",
    slug: "premium-chicken-rice-dog-food",
    shortDesc: "Complete nutrition with real chicken as the first ingredient.",
    description:
      "Our Premium Chicken & Rice formula is crafted with real, deboned chicken and wholesome brown rice to provide complete, balanced nutrition for your adult dog. Every batch is slow-cooked in small batches to preserve the natural flavors and nutrients your dog craves.",
    benefits:
      "Supports lean muscle mass with high-quality protein\nPromotes healthy digestion with prebiotic fiber\nNourishes skin and coat with omega fatty acids\nNo artificial colors, flavors, or preservatives\nMade in the USA with globally sourced ingredients",
    ingredients:
      "Deboned Chicken, Brown Rice, Oatmeal, Chicken Meal, Barley, Chicken Fat (preserved with mixed tocopherols), Dried Beet Pulp, Flaxseed, Natural Flavor, Salmon Oil, Vitamins & Minerals",
    whoIsFor:
      "Perfect for adult dogs (1-7 years) of all breeds and sizes who thrive on a poultry-based diet. Ideal for dogs with moderate activity levels who need sustained energy throughout the day.",
    price: 54.99,
    compareAt: 64.99,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 150,
    subscriptionDiscount: 15,
    tags: ["chicken", "rice", "adult", "all-breeds"],
    images: [
      { url: "/images/products/dog-food-chicken.jpg", alt: "Premium Chicken & Rice Dog Food", position: 0 },
    ],
    faqs: [
      {
        id: "f1",
        question: "How much should I feed my dog?",
        answer:
          "Feeding amounts vary based on your dog's size, age, and activity level. For a 30lb dog, we recommend about 2 cups per day, split into two meals. Check the feeding guide on the bag for detailed recommendations.",
      },
      {
        id: "f2",
        question: "Is this grain-inclusive?",
        answer:
          "Yes! Our formula includes wholesome grains like brown rice, oatmeal, and barley. These provide fiber, vitamins, and sustained energy. We believe in the nutritional benefits of high-quality grains for most dogs.",
      },
      {
        id: "f3",
        question: "How do I transition to this food?",
        answer:
          "We recommend transitioning over 7-10 days. Start by mixing 25% new food with 75% current food, gradually increasing the ratio every 2-3 days until fully transitioned.",
      },
    ],
    reviews: [],
  },
  {
    id: "2",
    name: "Wild Salmon & Sweet Potato Dog Food",
    slug: "wild-salmon-sweet-potato-dog-food",
    shortDesc: "Omega-rich formula for healthy skin, coat, and joints.",
    description:
      "Featuring wild-caught salmon as the primary protein, this grain-free recipe is packed with omega-3 fatty acids for a lustrous coat and healthy joints. Sweet potatoes provide gentle, easily digestible carbohydrates.",
    benefits:
      "Rich in omega-3 for skin and coat health\nGrain-free for sensitive stomachs\nSupports joint health with glucosamine\nSustainably sourced salmon\nGentle on digestion",
    ingredients:
      "Salmon, Salmon Meal, Sweet Potatoes, Peas, Canola Oil, Potato Protein, Dried Chicory Root, Flaxseed, Natural Flavor, Vitamins & Minerals",
    whoIsFor:
      "Ideal for dogs with grain sensitivities or those who love fish-based proteins. Great for dogs with dry skin or dull coats that need extra omega support.",
    price: 59.99,
    compareAt: null,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 120,
    subscriptionDiscount: 15,
    tags: ["salmon", "grain-free", "sensitive", "omega"],
    images: [
      { url: "/images/products/dog-food-salmon.jpg", alt: "Wild Salmon Dog Food", position: 0 },
    ],
    faqs: [
      {
        id: "f4",
        question: "Is this suitable for puppies?",
        answer: "This formula is designed for adult dogs. We recommend our Puppy Growth formula for dogs under 1 year old.",
      },
    ],
    reviews: [],
  },
  {
    id: "3",
    name: "Indoor Cat Chicken Formula",
    slug: "indoor-cat-chicken-formula",
    shortDesc: "Tailored nutrition for indoor cats with weight management.",
    description:
      "Specially formulated for indoor cats, this recipe features real chicken and a precise blend of fiber to support healthy weight and reduce hairballs. Lower calorie content helps prevent weight gain common in less active indoor cats.",
    benefits:
      "Supports healthy weight for indoor cats\nReduces hairball formation with fiber blend\nReal chicken is the #1 ingredient\nSupports urinary tract health\nAdded L-carnitine for lean muscle",
    ingredients:
      "Chicken, Chicken Meal, Brown Rice, Corn Gluten Meal, Wheat, Chicken Fat, Dried Beet Pulp, Cellulose, Natural Flavor, Fish Oil, Vitamins & Minerals",
    whoIsFor:
      "Designed for adult indoor cats (1-7 years) who have a less active lifestyle. Especially beneficial for cats prone to hairballs or weight gain.",
    price: 42.99,
    compareAt: 49.99,
    petType: "CAT" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 200,
    subscriptionDiscount: 12,
    tags: ["indoor", "chicken", "weight-management", "hairball"],
    images: [
      { url: "/images/products/cat-food-indoor.jpg", alt: "Indoor Cat Chicken Formula", position: 0 },
    ],
    faqs: [
      {
        id: "f5",
        question: "Can outdoor cats eat this?",
        answer: "While it won't harm outdoor cats, this formula has reduced calories designed for less active indoor cats. Active outdoor cats may need our Original formula for more energy.",
      },
    ],
    reviews: [],
  },
  {
    id: "4",
    name: "Grain-Free Turkey & Cranberry Cat Food",
    slug: "grain-free-turkey-cranberry-cat-food",
    shortDesc: "Premium grain-free nutrition with antioxidant-rich cranberries.",
    description:
      "A gourmet grain-free recipe featuring real turkey and antioxidant-rich cranberries. This formula supports overall wellness with a carefully balanced blend of proteins, fats, and carbohydrates.",
    benefits:
      "Grain-free recipe for sensitive cats\nReal turkey as the first ingredient\nCranberries support urinary health\nRich in taurine for heart health\nNo artificial preservatives",
    ingredients:
      "Turkey, Turkey Meal, Peas, Chickpeas, Chicken Fat, Tapioca Starch, Dried Cranberries, Flaxseed, Natural Flavor, Salmon Oil, Vitamins & Minerals",
    whoIsFor:
      "Perfect for cats with grain sensitivities or those who prefer poultry flavors. Suitable for all breeds.",
    price: 46.99,
    compareAt: null,
    petType: "CAT" as const,
    category: "FOOD" as const,
    isFeatured: false,
    isActive: true,
    stock: 180,
    subscriptionDiscount: 12,
    tags: ["grain-free", "turkey", "cranberry", "sensitive"],
    images: [
      { url: "/images/products/cat-food-turkey.jpg", alt: "Grain-Free Turkey Cat Food", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "5",
    name: "Peanut Butter Training Treats",
    slug: "peanut-butter-training-treats",
    shortDesc: "Small, soft bites perfect for training sessions.",
    description:
      "Irresistible peanut butter flavored training treats, sized perfectly for repetitive rewarding during training sessions. Soft texture that's easy to break apart for smaller dogs.",
    benefits:
      "Small size perfect for training\nSoft, chewy texture\nMade with real peanut butter\nLow calorie - only 3 calories per treat\nNo wheat, corn, or soy",
    ingredients:
      "Chicken, Peanut Butter, Oat Flour, Glycerin, Pea Flour, Cane Molasses, Gelatin, Natural Flavor, Phosphoric Acid, Sorbic Acid, Mixed Tocopherols",
    whoIsFor:
      "Perfect for dog owners who love training their pups. Suitable for all life stages and breeds. The soft texture is great for senior dogs too.",
    price: 12.99,
    compareAt: 15.99,
    petType: "DOG" as const,
    category: "TREATS" as const,
    isFeatured: true,
    isActive: true,
    stock: 300,
    subscriptionDiscount: 10,
    tags: ["training", "peanut-butter", "soft", "low-calorie"],
    images: [
      { url: "/images/products/dog-treats-pb.jpg", alt: "Peanut Butter Training Treats", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "6",
    name: "Freeze-Dried Salmon Cat Treats",
    slug: "freeze-dried-salmon-cat-treats",
    shortDesc: "Single ingredient, pure wild salmon bites.",
    description:
      "Pure, single-ingredient salmon treats that cats go wild for. Freeze-dried to lock in maximum nutrition and flavor with zero additives. Perfect for rewarding or as a meal topper.",
    benefits:
      "100% wild-caught salmon\nSingle ingredient - nothing else added\nFreeze-dried for maximum nutrition\nHigh protein, low calorie\nGrain-free and hypoallergenic",
    ingredients: "Wild-Caught Salmon",
    whoIsFor:
      "Ideal for all cats, including those with food sensitivities. Perfect as training treats, rewards, or a nutritious meal topper.",
    price: 14.99,
    compareAt: null,
    petType: "CAT" as const,
    category: "TREATS" as const,
    isFeatured: false,
    isActive: true,
    stock: 250,
    subscriptionDiscount: 10,
    tags: ["salmon", "freeze-dried", "single-ingredient", "hypoallergenic"],
    images: [
      { url: "/images/products/cat-treats-salmon.jpg", alt: "Freeze-Dried Salmon Cat Treats", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "7",
    name: "Natural Clumping Cat Litter",
    slug: "natural-clumping-cat-litter",
    shortDesc: "Ultra-clumping, low-dust formula from natural clay.",
    description:
      "Our premium natural clay litter forms tight clumps for easy scooping and superior odor control. The low-dust formula is gentle on sensitive noses for both you and your cat.",
    benefits:
      "Superior clumping for easy cleanup\n99% dust-free formula\n14-day odor control\nNatural clay - no chemicals\nLong-lasting - one bag lasts up to 4 weeks",
    ingredients: "Natural Bentonite Clay, Activated Charcoal, Baking Soda",
    whoIsFor:
      "Perfect for single and multi-cat households. Especially great for cats and owners sensitive to dust. Works with all standard litter boxes.",
    price: 24.99,
    compareAt: 29.99,
    petType: "CAT" as const,
    category: "LITTER" as const,
    isFeatured: true,
    isActive: true,
    stock: 100,
    subscriptionDiscount: 15,
    tags: ["clumping", "natural", "low-dust", "odor-control"],
    images: [
      { url: "/images/products/cat-litter.jpg", alt: "Natural Clumping Cat Litter", position: 0 },
    ],
    faqs: [
      {
        id: "f6",
        question: "How often should I change the litter?",
        answer: "Scoop daily and fully replace the litter every 2-4 weeks depending on the number of cats. For multi-cat homes, we recommend more frequent full changes.",
      },
    ],
    reviews: [],
  },
  {
    id: "8",
    name: "Dental Chew Sticks for Dogs",
    slug: "dental-chew-sticks-dogs",
    shortDesc: "Daily dental care that dogs actually enjoy.",
    description:
      "Clinically proven to reduce tartar buildup by up to 80%. These delicious chew sticks clean teeth down to the gumline while freshening breath. Recommended by veterinarians for daily dental maintenance.",
    benefits:
      "Reduces tartar by up to 80%\nFreshens breath naturally\nVeterinarian recommended\nHighly digestible\nFortified with vitamins and minerals",
    ingredients:
      "Rice Flour, Glycerin, Gelatin, Powdered Cellulose, Lecithin, Calcium Carbonate, Natural Flavor, Sodium Tripolyphosphate, Dried Parsley, Zinc Sulfate",
    whoIsFor:
      "For adult dogs of all sizes. Choose the appropriate size for your dog: Small (5-25 lbs), Medium (25-50 lbs), or Large (50+ lbs).",
    price: 22.99,
    compareAt: null,
    petType: "DOG" as const,
    category: "TREATS" as const,
    isFeatured: false,
    isActive: true,
    stock: 200,
    subscriptionDiscount: 10,
    tags: ["dental", "chews", "oral-health", "vet-recommended"],
    images: [
      { url: "/images/products/dog-dental-chews.jpg", alt: "Dental Chew Sticks", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "9",
    name: "Puppy Growth Chicken & Oatmeal",
    slug: "puppy-growth-chicken-oatmeal",
    shortDesc: "DHA-enriched formula for growing puppies.",
    description:
      "Specifically formulated for growing puppies with DHA from fish oil for brain and vision development. Real chicken provides the protein growing muscles need, while calcium supports strong bones and teeth.",
    benefits:
      "DHA for brain and vision development\nCalcium for strong bones\nReal chicken for lean muscle growth\nSmall kibble size for puppy mouths\nComplete nutrition for all breed sizes",
    ingredients:
      "Chicken, Chicken Meal, Oatmeal, Brown Rice, Barley, Chicken Fat, Fish Oil (source of DHA), Dried Beet Pulp, Flaxseed, Calcium Carbonate, Vitamins & Minerals",
    whoIsFor:
      "For puppies of all breeds from weaning to 1 year old. Large breed puppies may continue this formula until 18-24 months.",
    price: 49.99,
    compareAt: null,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: false,
    isActive: true,
    stock: 130,
    subscriptionDiscount: 15,
    tags: ["puppy", "growth", "DHA", "chicken", "all-breeds"],
    images: [
      { url: "/images/products/puppy-food.jpg", alt: "Puppy Growth Formula", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "10",
    name: "Senior Cat Gentle Digestion Formula",
    slug: "senior-cat-gentle-digestion",
    shortDesc: "Easy-to-digest nutrition for cats 7+.",
    description:
      "Crafted for senior cats with specially sized kibble and a gentle recipe that's easy on aging digestive systems. Enhanced with joint support and antioxidants for vitality in their golden years.",
    benefits:
      "Easy-to-digest proteins for aging stomachs\nGlucosamine & chondroitin for joints\nAntioxidant-rich for immune support\nSmaller kibble for aging teeth\nControlled mineral levels for kidney health",
    ingredients:
      "Chicken, Chicken Meal, Brewers Rice, Corn Gluten Meal, Wheat, Chicken Fat, Natural Flavor, Dried Beet Pulp, Fish Oil, Glucosamine, Chondroitin, Vitamins & Minerals",
    whoIsFor:
      "For cats aged 7 years and older. Especially beneficial for senior cats showing signs of joint stiffness or digestive sensitivity.",
    price: 44.99,
    compareAt: 52.99,
    petType: "CAT" as const,
    category: "FOOD" as const,
    isFeatured: false,
    isActive: true,
    stock: 90,
    subscriptionDiscount: 12,
    tags: ["senior", "gentle", "digestion", "joints", "7+"],
    images: [
      { url: "/images/products/senior-cat-food.jpg", alt: "Senior Cat Food", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
];

export function getProductBySlug(slug: string) {
  return MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
}

export function getFeaturedProducts() {
  return MOCK_PRODUCTS.filter((p) => p.isFeatured);
}

export function getProductsByPetType(petType: string) {
  return MOCK_PRODUCTS.filter((p) => p.petType === petType);
}

export function getProductsByCategory(category: string) {
  return MOCK_PRODUCTS.filter((p) => p.category === category);
}

export function filterProducts(params: {
  pet?: string;
  category?: string;
  search?: string;
  sort?: string;
}) {
  let filtered = [...MOCK_PRODUCTS];

  if (params.pet) {
    filtered = filtered.filter((p) => p.petType === params.pet);
  }

  if (params.category) {
    filtered = filtered.filter((p) => p.category === params.category);
  }

  if (params.search) {
    const query = params.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.shortDesc?.toLowerCase().includes(query) ||
        p.tags.some((t) => t.includes(query))
    );
  }

  if (params.sort) {
    switch (params.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
  }

  return filtered;
}
