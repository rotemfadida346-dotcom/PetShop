import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create admin user
  const hashedPassword = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@pawsome.com" },
    update: {},
    create: {
      email: "admin@pawsome.com",
      name: "Admin User",
      hashedPassword,
      role: "ADMIN",
    },
  });
  console.log("Created admin user:", admin.email);

  // Create test customer
  const customerPassword = await bcrypt.hash("customer123456", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "John Doe",
      hashedPassword: customerPassword,
      role: "CUSTOMER",
    },
  });
  console.log("Created customer:", customer.email);

  // Create products
  const products = [
    {
      name: "Premium Chicken & Rice Dog Food",
      slug: "premium-chicken-rice-dog-food",
      description:
        "Our Premium Chicken & Rice formula is crafted with real, deboned chicken and wholesome brown rice to provide complete, balanced nutrition for your adult dog.",
      shortDesc:
        "Complete nutrition with real chicken as the first ingredient.",
      benefits:
        "Supports lean muscle mass with high-quality protein\nPromotes healthy digestion with prebiotic fiber\nNourishes skin and coat with omega fatty acids\nNo artificial colors, flavors, or preservatives\nMade in the USA with globally sourced ingredients",
      ingredients:
        "Deboned Chicken, Brown Rice, Oatmeal, Chicken Meal, Barley, Chicken Fat, Dried Beet Pulp, Flaxseed, Natural Flavor, Salmon Oil, Vitamins & Minerals",
      whoIsFor:
        "Perfect for adult dogs (1-7 years) of all breeds and sizes who thrive on a poultry-based diet.",
      price: 54.99,
      compareAt: 64.99,
      petType: "DOG" as const,
      category: "FOOD" as const,
      isFeatured: true,
      stock: 150,
      subscriptionDiscount: 15,
      tags: ["chicken", "rice", "adult", "all-breeds"],
    },
    {
      name: "Wild Salmon & Sweet Potato Dog Food",
      slug: "wild-salmon-sweet-potato-dog-food",
      description:
        "Featuring wild-caught salmon as the primary protein, this grain-free recipe is packed with omega-3 fatty acids.",
      shortDesc: "Omega-rich formula for healthy skin, coat, and joints.",
      benefits:
        "Rich in omega-3 for skin and coat health\nGrain-free for sensitive stomachs\nSupports joint health with glucosamine",
      ingredients:
        "Salmon, Salmon Meal, Sweet Potatoes, Peas, Canola Oil, Potato Protein, Dried Chicory Root, Flaxseed, Vitamins & Minerals",
      whoIsFor:
        "Ideal for dogs with grain sensitivities or those who love fish-based proteins.",
      price: 59.99,
      petType: "DOG" as const,
      category: "FOOD" as const,
      isFeatured: true,
      stock: 120,
      subscriptionDiscount: 15,
      tags: ["salmon", "grain-free", "sensitive", "omega"],
    },
    {
      name: "Indoor Cat Chicken Formula",
      slug: "indoor-cat-chicken-formula",
      description:
        "Specially formulated for indoor cats, this recipe features real chicken and a precise blend of fiber.",
      shortDesc: "Tailored nutrition for indoor cats with weight management.",
      benefits:
        "Supports healthy weight for indoor cats\nReduces hairball formation with fiber blend\nReal chicken is the #1 ingredient",
      ingredients:
        "Chicken, Chicken Meal, Brown Rice, Corn Gluten Meal, Wheat, Chicken Fat, Dried Beet Pulp, Cellulose, Vitamins & Minerals",
      whoIsFor:
        "Designed for adult indoor cats (1-7 years) who have a less active lifestyle.",
      price: 42.99,
      compareAt: 49.99,
      petType: "CAT" as const,
      category: "FOOD" as const,
      isFeatured: true,
      stock: 200,
      subscriptionDiscount: 12,
      tags: ["indoor", "chicken", "weight-management", "hairball"],
    },
    {
      name: "Peanut Butter Training Treats",
      slug: "peanut-butter-training-treats",
      description:
        "Irresistible peanut butter flavored training treats, sized perfectly for repetitive rewarding during training sessions.",
      shortDesc: "Small, soft bites perfect for training sessions.",
      benefits:
        "Small size perfect for training\nSoft, chewy texture\nMade with real peanut butter\nLow calorie - only 3 calories per treat",
      ingredients:
        "Chicken, Peanut Butter, Oat Flour, Glycerin, Pea Flour, Cane Molasses, Natural Flavor",
      whoIsFor:
        "Perfect for dog owners who love training their pups.",
      price: 12.99,
      compareAt: 15.99,
      petType: "DOG" as const,
      category: "TREATS" as const,
      isFeatured: true,
      stock: 300,
      subscriptionDiscount: 10,
      tags: ["training", "peanut-butter", "soft", "low-calorie"],
    },
    {
      name: "Natural Clumping Cat Litter",
      slug: "natural-clumping-cat-litter",
      description:
        "Our premium natural clay litter forms tight clumps for easy scooping and superior odor control.",
      shortDesc: "Ultra-clumping, low-dust formula from natural clay.",
      benefits:
        "Superior clumping for easy cleanup\n99% dust-free formula\n14-day odor control\nNatural clay - no chemicals",
      ingredients: "Natural Bentonite Clay, Activated Charcoal, Baking Soda",
      whoIsFor:
        "Perfect for single and multi-cat households.",
      price: 24.99,
      compareAt: 29.99,
      petType: "CAT" as const,
      category: "LITTER" as const,
      isFeatured: true,
      stock: 100,
      subscriptionDiscount: 15,
      tags: ["clumping", "natural", "low-dust", "odor-control"],
    },
  ];

  for (const product of products) {
    const created = await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    });
    console.log("Created product:", created.name);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
