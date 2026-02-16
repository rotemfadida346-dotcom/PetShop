import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...\n");

  // ── Users ─────────────────────────────────────────────
  const hashedAdmin = await bcrypt.hash("admin123456", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@pawsome.com" },
    update: {},
    create: {
      email: "admin@pawsome.com",
      name: "Admin User",
      hashedPassword: hashedAdmin,
      role: "ADMIN",
    },
  });
  console.log("User:", admin.email, `(${admin.role})`);

  const hashedCustomer = await bcrypt.hash("customer123456", 12);
  const customer = await prisma.user.upsert({
    where: { email: "customer@example.com" },
    update: {},
    create: {
      email: "customer@example.com",
      name: "John Doe",
      hashedPassword: hashedCustomer,
      role: "CUSTOMER",
    },
  });
  console.log("User:", customer.email, `(${customer.role})\n`);

  // ── Products ──────────────────────────────────────────
  const products = [
    // ── DOG PRODUCTS (5) ────────────────────────────────
    {
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
      stock: 150,
      subscriptionDiscount: 15,
      tags: ["chicken", "rice", "adult", "all-breeds", "subscription"],
      images: [
        { url: "/images/products/dog-food-chicken.jpg", alt: "Premium Chicken & Rice Dog Food bag", position: 0 },
        { url: "/images/products/dog-food-chicken-detail.jpg", alt: "Kibble close-up", position: 1 },
      ],
      faqs: [
        { question: "How much should I feed my dog?", answer: "Feeding amounts vary based on your dog's size, age, and activity level. For a 30lb dog, we recommend about 2 cups per day, split into two meals. Check the feeding guide on the bag for detailed recommendations.", position: 0 },
        { question: "Is this grain-inclusive?", answer: "Yes! Our formula includes wholesome grains like brown rice, oatmeal, and barley. These provide fiber, vitamins, and sustained energy.", position: 1 },
        { question: "How do I transition to this food?", answer: "We recommend transitioning over 7-10 days. Start by mixing 25% new food with 75% current food, gradually increasing the ratio every 2-3 days.", position: 2 },
      ],
    },
    {
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
      petType: "DOG" as const,
      category: "FOOD" as const,
      isFeatured: true,
      stock: 120,
      subscriptionDiscount: 15,
      tags: ["salmon", "grain-free", "sensitive", "omega", "subscription"],
      images: [
        { url: "/images/products/dog-food-salmon.jpg", alt: "Wild Salmon Dog Food bag", position: 0 },
      ],
      faqs: [
        { question: "Is this suitable for puppies?", answer: "This formula is designed for adult dogs. We recommend our Puppy Growth formula for dogs under 1 year old.", position: 0 },
        { question: "Where is the salmon sourced from?", answer: "Our salmon is sustainably wild-caught from the cold waters of the Pacific Northwest.", position: 1 },
      ],
    },
    {
      name: "Peanut Butter Training Treats",
      slug: "peanut-butter-training-treats",
      shortDesc: "Small, soft bites perfect for training sessions.",
      description:
        "Irresistible peanut butter flavored training treats, sized perfectly for repetitive rewarding during training sessions. Soft texture that's easy to break apart for smaller dogs.",
      benefits:
        "Small size perfect for training\nSoft, chewy texture\nMade with real peanut butter\nLow calorie — only 3 calories per treat\nNo wheat, corn, or soy",
      ingredients:
        "Chicken, Peanut Butter, Oat Flour, Glycerin, Pea Flour, Cane Molasses, Gelatin, Natural Flavor, Phosphoric Acid, Sorbic Acid, Mixed Tocopherols",
      whoIsFor:
        "Perfect for dog owners who love training their pups. Suitable for all life stages and breeds. The soft texture is great for senior dogs too.",
      price: 12.99,
      compareAt: 15.99,
      petType: "DOG" as const,
      category: "TREATS" as const,
      isFeatured: true,
      stock: 300,
      subscriptionDiscount: 10,
      tags: ["training", "peanut-butter", "soft", "low-calorie", "subscription"],
      images: [
        { url: "/images/products/dog-treats-pb.jpg", alt: "Peanut Butter Training Treats bag", position: 0 },
      ],
      faqs: [
        { question: "Are these safe for puppies?", answer: "Yes! These treats are suitable for dogs of all ages. For very young puppies (under 3 months), break them into smaller pieces.", position: 0 },
      ],
    },
    {
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
      petType: "DOG" as const,
      category: "TREATS" as const,
      isFeatured: false,
      stock: 200,
      subscriptionDiscount: 10,
      tags: ["dental", "chews", "oral-health", "vet-recommended", "subscription"],
      images: [
        { url: "/images/products/dog-dental-chews.jpg", alt: "Dental Chew Sticks pack", position: 0 },
      ],
      faqs: [
        { question: "How many per day?", answer: "We recommend one chew stick per day for optimal dental health. For smaller dogs, you can give half a stick.", position: 0 },
        { question: "Will this replace brushing?", answer: "While dental chews are excellent for daily maintenance, they work best alongside regular brushing and annual dental check-ups.", position: 1 },
      ],
    },
    {
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
      petType: "DOG" as const,
      category: "FOOD" as const,
      isFeatured: false,
      stock: 130,
      subscriptionDiscount: 15,
      tags: ["puppy", "growth", "DHA", "chicken", "all-breeds", "subscription"],
      images: [
        { url: "/images/products/puppy-food.jpg", alt: "Puppy Growth Formula bag", position: 0 },
      ],
      faqs: [
        { question: "When should I switch to adult food?", answer: "Most breeds should switch at 12 months. Large breed puppies (expected adult weight 50+ lbs) can stay on puppy food until 18-24 months.", position: 0 },
      ],
    },

    // ── CAT PRODUCTS (5) ────────────────────────────────
    {
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
      stock: 200,
      subscriptionDiscount: 12,
      tags: ["indoor", "chicken", "weight-management", "hairball", "subscription"],
      images: [
        { url: "/images/products/cat-food-indoor.jpg", alt: "Indoor Cat Chicken Formula bag", position: 0 },
      ],
      faqs: [
        { question: "Can outdoor cats eat this?", answer: "While it won't harm outdoor cats, this formula has reduced calories designed for less active indoor cats. Active outdoor cats may need our Original formula for more energy.", position: 0 },
      ],
    },
    {
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
      petType: "CAT" as const,
      category: "FOOD" as const,
      isFeatured: false,
      stock: 180,
      subscriptionDiscount: 12,
      tags: ["grain-free", "turkey", "cranberry", "sensitive", "subscription"],
      images: [
        { url: "/images/products/cat-food-turkey.jpg", alt: "Grain-Free Turkey Cat Food bag", position: 0 },
      ],
      faqs: [
        { question: "Is this suitable for kittens?", answer: "This formula is designed for adult cats. We recommend kitten-specific food for cats under 1 year old.", position: 0 },
      ],
    },
    {
      name: "Freeze-Dried Salmon Cat Treats",
      slug: "freeze-dried-salmon-cat-treats",
      shortDesc: "Single ingredient, pure wild salmon bites.",
      description:
        "Pure, single-ingredient salmon treats that cats go wild for. Freeze-dried to lock in maximum nutrition and flavor with zero additives. Perfect for rewarding or as a meal topper.",
      benefits:
        "100% wild-caught salmon\nSingle ingredient — nothing else added\nFreeze-dried for maximum nutrition\nHigh protein, low calorie\nGrain-free and hypoallergenic",
      ingredients: "Wild-Caught Salmon",
      whoIsFor:
        "Ideal for all cats, including those with food sensitivities. Perfect as training treats, rewards, or a nutritious meal topper.",
      price: 14.99,
      petType: "CAT" as const,
      category: "TREATS" as const,
      isFeatured: false,
      stock: 250,
      subscriptionDiscount: 10,
      tags: ["salmon", "freeze-dried", "single-ingredient", "hypoallergenic"],
      images: [
        { url: "/images/products/cat-treats-salmon.jpg", alt: "Freeze-Dried Salmon Cat Treats bag", position: 0 },
      ],
      faqs: [],
    },
    {
      name: "Natural Clumping Cat Litter",
      slug: "natural-clumping-cat-litter",
      shortDesc: "Ultra-clumping, low-dust formula from natural clay.",
      description:
        "Our premium natural clay litter forms tight clumps for easy scooping and superior odor control. The low-dust formula is gentle on sensitive noses for both you and your cat.",
      benefits:
        "Superior clumping for easy cleanup\n99% dust-free formula\n14-day odor control\nNatural clay — no chemicals\nLong-lasting — one bag lasts up to 4 weeks",
      ingredients: "Natural Bentonite Clay, Activated Charcoal, Baking Soda",
      whoIsFor:
        "Perfect for single and multi-cat households. Especially great for cats and owners sensitive to dust. Works with all standard litter boxes.",
      price: 24.99,
      compareAt: 29.99,
      petType: "CAT" as const,
      category: "LITTER" as const,
      isFeatured: true,
      stock: 100,
      subscriptionDiscount: 15,
      tags: ["clumping", "natural", "low-dust", "odor-control", "subscription"],
      images: [
        { url: "/images/products/cat-litter.jpg", alt: "Natural Clumping Cat Litter bag", position: 0 },
      ],
      faqs: [
        { question: "How often should I change the litter?", answer: "Scoop daily and fully replace the litter every 2-4 weeks depending on the number of cats. For multi-cat homes, we recommend more frequent full changes.", position: 0 },
        { question: "Is this safe for kittens?", answer: "We recommend non-clumping litter for kittens under 4 months, as they may ingest clumping litter. For kittens over 4 months, this product is safe.", position: 1 },
      ],
    },
    {
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
      stock: 90,
      subscriptionDiscount: 12,
      tags: ["senior", "gentle", "digestion", "joints", "7+", "subscription"],
      images: [
        { url: "/images/products/senior-cat-food.jpg", alt: "Senior Cat Food bag", position: 0 },
      ],
      faqs: [
        { question: "At what age should I switch to senior food?", answer: "Most cats are considered senior starting at age 7. If your cat shows signs of slowing down, joint stiffness, or digestive changes, it may be time to switch.", position: 0 },
      ],
    },
  ];

  for (const { images, faqs, ...productData } of products) {
    const product = await prisma.product.upsert({
      where: { slug: productData.slug },
      update: {
        ...productData,
        images: { deleteMany: {} },
        faqs: { deleteMany: {} },
      },
      create: productData,
    });

    // Upsert images
    for (const img of images) {
      await prisma.productImage.create({
        data: { ...img, productId: product.id },
      });
    }

    // Upsert FAQs
    for (const faq of faqs) {
      await prisma.productFaq.create({
        data: { ...faq, productId: product.id },
      });
    }

    console.log(
      `Product: ${product.name} (${product.petType}/${product.category}) — $${product.price} — ${images.length} images, ${faqs.length} FAQs`
    );
  }

  console.log(`\nSeeded ${products.length} products.`);
  console.log("Done!\n");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
