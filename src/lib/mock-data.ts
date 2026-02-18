// Mock product data for development and static rendering
// In production, this comes from Prisma/database

export const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "מזון כלבים פרימיום - עוף ואורז",
    slug: "premium-chicken-rice-dog-food",
    shortDesc: "תזונה מלאה ומאוזנת עם עוף אמיתי כמרכיב ראשון",
    description:
      "פורמולת העוף והאורז הפרימיום שלנו מיוצרת מעוף טרי ואורז מלא איכותי, ומספקת תזונה מלאה ומאוזנת לכלב הבוגר שלכם. כל מנה מבושלת לאט בקבוצות קטנות כדי לשמר את הטעם והערכים התזונתיים הטבעיים.",
    benefits:
      "תומך במסת שריר רזה עם חלבון איכותי\nמקדם עיכול בריא עם סיבים פרה-ביוטיים\nמזין את העור והפרווה עם חומצות שומן אומגה\nללא צבעי מאכל, טעמים או משמרים מלאכותיים\nמיוצר בסטנדרטים הגבוהים ביותר",
    ingredients:
      "עוף טרי, אורז חום, שיבולת שועל, קמח עוף, שעורה, שומן עוף (משומר עם טוקופרולים מעורבים), סיבי סלק מיובשים, זרעי פשתן, טעם טבעי, שמן סלמון, ויטמינים ומינרלים",
    whoIsFor:
      "מושלם לכלבים בוגרים (1-7 שנים) מכל הגזעים והגדלים. אידיאלי לכלבים עם רמת פעילות בינונית שזקוקים לאנרגיה מתמשכת לאורך כל היום.",
    price: 189.90,
    compareAt: 229.90,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 150,
    subscriptionDiscount: 15,
    tags: ["chicken", "rice", "adult", "all-breeds"],
    images: [
      { url: "https://placehold.co/800x800/E8F5E9/2E7D32?text=Royal+Canin+Mini&font=assistant", alt: "מזון כלבים פרימיום - עוף ואורז", position: 0 },
      { url: "https://placehold.co/800x800/F1F8E9/558B2F?text=Kibble+Detail&font=assistant", alt: "גרגירי המזון", position: 1 },
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
    name: "מזון כלבים - סלמון וילד ובטטה",
    slug: "wild-salmon-sweet-potato-dog-food",
    shortDesc: "פורמולה עשירה באומגה 3 לעור, פרווה ומפרקים בריאים",
    description:
      "Featuring wild-caught salmon as the primary protein, this grain-free recipe is packed with omega-3 fatty acids for a lustrous coat and healthy joints. Sweet potatoes provide gentle, easily digestible carbohydrates.",
    benefits:
      "Rich in omega-3 for skin and coat health\nGrain-free for sensitive stomachs\nSupports joint health with glucosamine\nSustainably sourced salmon\nGentle on digestion",
    ingredients:
      "Salmon, Salmon Meal, Sweet Potatoes, Peas, Canola Oil, Potato Protein, Dried Chicory Root, Flaxseed, Natural Flavor, Vitamins & Minerals",
    whoIsFor:
      "Ideal for dogs with grain sensitivities or those who love fish-based proteins. Great for dogs with dry skin or dull coats that need extra omega support.",
    price: 209.90,
    compareAt: null,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 120,
    subscriptionDiscount: 15,
    tags: ["salmon", "grain-free", "sensitive", "omega"],
    images: [
      { url: "https://placehold.co/800x800/E1F5FE/01579B?text=Salmon+Dog+Food&font=assistant", alt: "מזון סלמון לכלבים", position: 0 },
      { url: "https://placehold.co/800x800/B3E5FC/0277BD?text=Salmon+Detail&font=assistant", alt: "פרטי המזון", position: 1 },
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
    name: "מוצר 3",
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
      { url: "https://placehold.co/800x800/F3E5F5/6A1B9A?text=Hills+Cat+Food&font=assistant", alt: "מזון חתולי בית", position: 0 },
      { url: "https://placehold.co/800x800/E1BEE7/7B1FA2?text=Cat+Kibble&font=assistant", alt: "גרגירי מזון", position: 1 },
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
    name: "מוצר 4",
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
      { url: "https://placehold.co/800x800/FFF3E0/E65100?text=Turkey+Cat+Food&font=assistant", alt: "מזון הודו לחתולים", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "5",
    name: "מוצר 5",
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
      { url: "https://placehold.co/800x800/FFF9C4/F57F17?text=Training+Treats&font=assistant", alt: "חטיפי אימון", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "6",
    name: "מוצר 6",
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
      { url: "https://placehold.co/800x800/E0F7FA/00838F?text=Salmon+Treats&font=assistant", alt: "חטיפי סלמון", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "7",
    name: "מוצר 7",
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
      { url: "https://placehold.co/800x800/EFEBE9/4E342E?text=Catlit+Litter&font=assistant", alt: "חול לחתולים", position: 0 },
      { url: "https://placehold.co/800x800/D7CCC8/5D4037?text=Litter+Detail&font=assistant", alt: "פרטי החול", position: 1 },
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
    name: "מוצר 8",
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
      { url: "https://placehold.co/800x800/E8EAF6/3F51B5?text=Dental+Chews&font=assistant", alt: "מקלות שיניים", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "9",
    name: "מוצר 9",
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
      { url: "https://placehold.co/800x800/FFF8E1/F9A825?text=Puppy+Food&font=assistant", alt: "מזון לגורים", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  {
    id: "10",
    name: "מוצר 10",
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
      { url: "https://placehold.co/800x800/FCE4EC/C2185B?text=Senior+Cat+Food&font=assistant", alt: "מזון לחתולים מבוגרים", position: 0 },
    ],
    faqs: [],
    reviews: [],
  },
  
  // ── NOW FRESH & GO! SOLUTIONS PRODUCTS ────────────────────────────────
  {
    id: "11",
    name: "NOW Fresh – Grain Free (הודו, סלמון וברווז)",
    slug: "now-fresh-grain-free-turkey-salmon-duck",
    shortDesc: "מזון ללא דגנים עם בשר טרי ודגים לכלבים מכל הגילאים",
    description:
      "NOW Fresh Grain Free הוא מזון פרימיום ללא דגנים המכיל רק בשר ודגים טריים - הודו, סלמון וברווז. פותח במיוחד לכלבים עם רגישויות לדגנים או לכאלה שאתם רוצים לתת להם תזונה מבוססת חלבון איכותי בלבד.",
    benefits:
      "עשיר בחלבון איכותי מבשר ודגים טריים\nתומך בשמירה על עור בריא ופרווה מבריקה\nללא דגנים - מתאים לכלבים עם רגישויות\nמכיל אומגה 3 ו-6 לבריאות העור והפרווה\nעשיר בנוגדי חמצון לחיזוק מערכת החיסון\nמונע בעיות עור ואלרגיות הקשורות לדגנים",
    ingredients:
      "בשר הודו טרי, בשר סלמון טרי, בשר ברווז טרי, תפוחי אדמה, אפונה, שמן קנולה, תפוחים, גזר, דלעת, אוכמניות, חמוציות, ויטמינים ומינרלים.",
    whoIsFor:
      "מתאים לכלבים מכל הגילאים והגזעים, במיוחד לכלבים עם רגישויות לדגנים, בעיות עור כרוניות, או אלרגיות מזון. מושלם לכלבים פעילים הזקוקים לאנרגיה מתמשכת.",
    price: 245.00,
    compareAt: 289.00,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 12,
    subscriptionDiscount: 12,
    tags: ["now-fresh", "grain-free", "turkey", "salmon", "duck", "all-ages"],
    images: [
      { url: "https://placehold.co/800x800/2E8B57/FFFFFF?text=NOW+Fresh+Grain+Free&font=assistant", alt: "NOW Fresh - Grain Free מזון ללא דגנים", position: 0 },
      { url: "https://placehold.co/800x800/228B22/FFFFFF?text=Turkey+Salmon+Duck&font=assistant", alt: "הודו, סלמון וברווז", position: 1 },
    ],
    faqs: [
      {
        id: "nf1",
        question: "האם מתאים גם לגורים?",
        answer: "כן! NOW Fresh Grain Free מתאים לכלבים מכל הגילאים - גם גורים וגם בוגרים. הנוסחה מאוזנת לכל שלבי החיים.",
      },
      {
        id: "nf2",
        question: "האם באמת ללא דגנים?",
        answer: "כן, 100% ללא דגנים. במקום דגנים משתמשים בתפוחי אדמה ואפונה כמקור פחמימות.",
      },
    ],
    reviews: [],
  },
  {
    id: "12",
    name: "NOW Fresh – Good Gravy (בשר בקר + דגנים עתיקים)",
    slug: "now-fresh-good-gravy-beef-ancient-grains",
    shortDesc: "מזון מצופה ציר טעים במיוחד עם בשר בקר ודגנים עתיקים",
    description:
      "NOW Fresh Good Gravy הוא מזון ייחודי המצופה בציר טבעי טעים שכלבים פשוט מתים עליו! מכיל בשר בקר איכותי ודגנים עתיקים בריאים כמו קינואה, דורה ושיפון. מושלם לכלבים בררנים או כאלה שצריכים עידוד לאכול.",
    benefits:
      "מצופה בציר טבעי - טעים במיוחד לכלבים בררנים\nבשר בקר איכותי כמקור חלבון ראשי\nדגנים עתיקים עשירים בסיבים ותזונה\nתומך במערכת עיכול בריאה\nמונע בעיות תיאבון וסירוב לאכול\nעוזר לשמור על משקל בריא ואנרגיה",
    ingredients:
      "בשר בקר, קמח בקר, דגנים עתיקים (קינואה, דורה, שיפון), אורז חום, שומן עוף, ציר טבעי, ירקות מיובשים, ויטמינים ומינרלים.",
    whoIsFor:
      "מתאים לכלבים בוגרים מכל הגזעים. מושלם במיוחד לכלבים בררנים, כלבים שאוכלים לאט, או כאלה שצריכים עידוד לאכול. גם מצוין לכלבים מבוגרים עם תיאבון מופחת.",
    price: 198.00,
    compareAt: 235.00,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: false,
    isActive: true,
    stock: 18,
    subscriptionDiscount: 10,
    tags: ["now-fresh", "good-gravy", "beef", "ancient-grains", "picky-eaters"],
    images: [
      { url: "https://placehold.co/800x800/8B4513/FFFFFF?text=NOW+Good+Gravy&font=assistant", alt: "NOW Fresh Good Gravy - בשר בקר", position: 0 },
      { url: "https://placehold.co/800x800/A0522D/FFFFFF?text=Beef+Ancient+Grains&font=assistant", alt: "בשר בקר ודגנים עתיקים", position: 1 },
    ],
    faqs: [
      {
        id: "gg1",
        question: "למה יש ציר על המזון?",
        answer: "הציר הטבעי נותן טעם עשיר במיוחד שכלבים אוהבים. זה עוזר במיוחד לכלבים בררנים או כאלה עם תיאבון מופחת.",
      },
      {
        id: "gg2",
        question: "מה זה דגנים עתיקים?",
        answer: "דגנים עתיקים כמו קינואה, דורה ושיפון הם דגנים מתקופות קדומות, עשירים בחלבון, סיבים וויטמינים. הם מתעכלים טוב יותר מדגנים מודרניים.",
      },
    ],
    reviews: [],
  },
  {
    id: "13",
    name: "NOW Fresh – Wet Food (בשר טחון ואורז)",
    slug: "now-fresh-wet-food-ground-beef-rice",
    shortDesc: "מזון רטוב פרימיום עם בשר טחון ואורז לכלבים בוגרים",
    description:
      "NOW Fresh Wet Food הוא מזון רטוב מלא ומאוזן עם בשר בקר טחון טרי ואורז. מושלם כארוחה מלאה או כתוספת למזון יבש. עשיר בלחות, טעים במיוחד ומספק תזונה מלאה.",
    benefits:
      "בשר בקר טחון טרי - חלבון איכותי\nעשיר בלחות - תומך בתפקוד הכליות\nטעם עשיר שכלבים אוהבים\nתזונה מלאה ומאוזנת\nמונע בעיות שיניים ועיכול\nעוזר לשמור על בריאות הכליות והשתן",
    ingredients:
      "בשר בקר טחון, אורז, ציר עוף, גזר, אפונה, שמן דגים, ויטמינים ומינרלים.",
    whoIsFor:
      "מתאים לכלבים בוגרים מכל הגזעים. מומלץ במיוחד לכלבים מבוגרים, כלבים שלא שותים מספיק מים, או כאלה עם בעיות שיניים. ניתן לשלב עם מזון יבש או להגיש כארוחה מלאה.",
    price: 14.90,
    compareAt: null,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: false,
    isActive: true,
    stock: 45,
    subscriptionDiscount: 15,
    tags: ["now-fresh", "wet-food", "beef", "rice", "senior-friendly"],
    images: [
      { url: "https://placehold.co/800x800/CD853F/FFFFFF?text=NOW+Wet+Food&font=assistant", alt: "NOW Fresh מזון רטוב", position: 0 },
      { url: "https://placehold.co/800x800/DEB887/FFFFFF?text=Ground+Beef+Rice&font=assistant", alt: "בשר טחון ואורז", position: 1 },
    ],
    faqs: [
      {
        id: "wf1",
        question: "כמה פחיות ביום?",
        answer: "לכלב במשקל 5 ק״ג מומלץ 2-3 פחיות ביום. ניתן לשלב עם מזון יבש - פחית אחת + מנה של מזון יבש.",
      },
      {
        id: "wf2",
        question: "מתאים לגורים?",
        answer: "המוצר מיועד לכלבים בוגרים. לגורים יש נוסחאות ייעודיות עם יותר קלוריות וסידן.",
      },
    ],
    reviews: [],
  },
  {
    id: "14",
    name: "GO! Solutions – Sensitivities (ברווז LID)",
    slug: "go-solutions-sensitivities-duck-lid",
    shortDesc: "מזון LID (מקור חלבון מוגבל) לכלבים עם רגישויות ואלרגיות",
    description:
      "GO! Solutions Sensitivities עם ברווז הוא מזון LID (Limited Ingredient Diet) מיוחד לכלבים עם רגישויות מזון ואלרגיות. מכיל רק ברווז כמקור חלבון יחיד ומספר מצומצם של מרכיבים איכותיים. פותח בשיתוף וטרינרים לכלבים רגישים.",
    benefits:
      "ברווז כמקור חלבון יחיד - מפחית אלרגיות\nמספר מצומצם של מרכיבים - פחות חשיפה לאלרגנים\nללא דגנים, תירס, חיטה או סויה\nתומך בעור בריא ופרווה מבריקה\nמונע תגובות אלרגיות, גרד וזיהומי עור\nעוזר לשפר את בריאות מערכת העיכול",
    ingredients:
      "קמח ברווז, פחמימות פשוטות (תפוחי אדמה, אפונה), שומן ברווז, סיבי סלק, שמן קנולה, תפוחים מיובשים, ויטמינים ומינרלים.",
    whoIsFor:
      "מתאים במיוחד לכלבים עם אלרגיות מזון, רגישות לדגנים, בעיות עור כרוניות (גרד, אדמומיות), או זיהומי אוזניים חוזרים. מומלץ על ידי וטרינרים לכלבים רגישים מכל הגילאים והגזעים.",
    price: 269.00,
    compareAt: 315.00,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 9,
    subscriptionDiscount: 15,
    tags: ["go-solutions", "sensitivities", "duck", "lid", "grain-free", "hypoallergenic"],
    images: [
      { url: "https://placehold.co/800x800/4682B4/FFFFFF?text=GO!+Sensitivities&font=assistant", alt: "GO! Solutions Sensitivities - ברווז", position: 0 },
      { url: "https://placehold.co/800x800/5F9EA0/FFFFFF?text=Duck+LID&font=assistant", alt: "מזון LID לרגישויות", position: 1 },
    ],
    faqs: [
      {
        id: "lid1",
        question: "מה זה LID?",
        answer: "LID = Limited Ingredient Diet (דיאטה מוגבלת ברכיבים). זה אומר שהמזון מכיל רק מקור חלבון אחד (ברווז) ומספר מצומצם של רכיבים נוספים, מה שמפחית משמעותית את הסיכוי לאלרגיה.",
      },
      {
        id: "lid2",
        question: "תוך כמה זמן רואים שיפור?",
        answer: "רוב הכלבים מראים שיפור בעור ובפרווה תוך 4-6 שבועות. חשוב לתת רק את המזון הזה (ללא חטיפים או תוספות אחרות) כדי לראות תוצאות.",
      },
    ],
    reviews: [],
  },
  {
    id: "15",
    name: "GO! Solutions – Carnivore (עוף, הודו וברווז)",
    slug: "go-solutions-carnivore-chicken-turkey-duck",
    shortDesc: "מזון עתיר חלבון ללא דגנים לכלבים פעילים",
    description:
      "GO! Solutions Carnivore הוא מזון פרימיום ללא דגנים עם 3 מקורות חלבון איכותיים - עוף, הודו וברווז. עם 32% חלבון, זהו מזון אידיאלי לכלבים פעילים, כלבי עבודה, או כלבים שצריכים תזונה עתירת חלבון לבניית שרירים חזקים.",
    benefits:
      "32% חלבון - הכי גבוה בשוק!\nללא דגנים - רק בשר, דגים וירקות\n3 מקורות חלבון איכותיים\nתומך בצמיחה ותחזוקה של שרירים\nמונע חוסר תזונה וחולשת שרירים\nעוזר לשמור על רמת אנרגיה גבוהה",
    ingredients:
      "בשר עוף, קמח הודו, קמח ברווז, בטטה, עדשים, אפונה, שומן עוף, שמן סלמון, חמוציות, אוכמניות, ויטמינים ומינרלים.",
    whoIsFor:
      "מתאים לכלבים בוגרים פעילים, כלבי עבודה, כלבי ספורט, או כלבים במשקל תקין שזקוקים לאנרגיה רבה. מומלץ גם לכלבים שמאבדים משקל או צריכים לבנות מסת שריר.",
    price: 239.00,
    compareAt: 279.00,
    petType: "DOG" as const,
    category: "FOOD" as const,
    isFeatured: true,
    isActive: true,
    stock: 14,
    subscriptionDiscount: 12,
    tags: ["go-solutions", "carnivore", "high-protein", "grain-free", "active-dogs"],
    images: [
      { url: "https://placehold.co/800x800/8B0000/FFFFFF?text=GO!+Carnivore&font=assistant", alt: "GO! Solutions Carnivore", position: 0 },
      { url: "https://placehold.co/800x800/A52A2A/FFFFFF?text=High+Protein+32%25&font=assistant", alt: "עתיר חלבון 32%", position: 1 },
    ],
    faqs: [
      {
        id: "car1",
        question: "למי מתאים 32% חלבון?",
        answer: "מזון עם 32% חלבון מתאים לכלבים פעילים מאוד, כלבי עבודה, כלבי ספורט, או כלבים שצריכים לבנות/לשמור על מסת שריר. לא מומלץ לכלבים עם בעיות כליות.",
      },
      {
        id: "car2",
        question: "האם יכול לגרום לעלייה במשקל?",
        answer: "המזון מתאים לכלבים פעילים. אם הכלב לא פעיל מאוד, כדאי לצמצם את המנה או לבחור מזון עם פחות שומן וחלבון.",
      },
    ],
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
