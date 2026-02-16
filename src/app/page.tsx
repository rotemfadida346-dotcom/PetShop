import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/lib/mock-data";
import {
  Truck,
  ShieldCheck,
  Leaf,
  Heart,
  Star,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-stone-50 overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-300 rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="relative py-20 md:py-32 lg:py-40">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6 text-sm font-medium text-amber-700 border border-amber-200">
                <Sparkles className="h-4 w-4" />
                Vet-Approved Nutrition
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-stone-900 text-balance leading-[1.1]">
                Premium food your pets will{" "}
                <span className="text-amber-600">actually love</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-stone-600 max-w-lg leading-relaxed">
                Naturally sourced, vet-approved nutrition for dogs and cats.
                Subscribe and save up to 15% with free delivery on every order.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/shop">
                  <Button size="lg">
                    Shop Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" size="lg">
                    Take the Pet Quiz
                  </Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-stone-500">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-amber-600" />
                  <span>Free shipping $49+</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-amber-600" />
                  <span>30-day guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-stone-100 py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Vet Approved",
                desc: "Formulated with veterinary nutritionists",
              },
              {
                icon: Leaf,
                title: "Natural Ingredients",
                desc: "No artificial colors, flavors, or preservatives",
              },
              {
                icon: Truck,
                title: "Free Delivery",
                desc: "On all orders over $49",
              },
              {
                icon: Heart,
                title: "Satisfaction Guarantee",
                desc: "30-day money-back promise",
              },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <item.icon className="h-8 w-8 text-amber-600 mx-auto mb-3" />
                <h3 className="font-semibold text-stone-900 text-sm">
                  {item.title}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Category Highlights */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">Shop by Pet</h2>
            <p className="section-subheading mx-auto mt-3">
              Discover premium nutrition tailored to your pet&apos;s unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Dogs */}
            <Link
              href="/shop?pet=DOG"
              className="group relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 md:p-12 overflow-hidden border border-amber-100 hover:border-amber-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative z-10">
                <span className="text-5xl mb-4 block">🐕</span>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  For Dogs
                </h3>
                <p className="text-stone-600 mb-4">
                  Premium food, treats, and supplements for every breed and life stage.
                </p>
                <span className="inline-flex items-center gap-1 text-amber-700 font-medium text-sm group-hover:gap-2 transition-all">
                  Shop Dog Products <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>

            {/* Cats */}
            <Link
              href="/shop?pet=CAT"
              className="group relative bg-gradient-to-br from-stone-50 to-stone-100 rounded-3xl p-8 md:p-12 overflow-hidden border border-stone-200 hover:border-stone-300 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative z-10">
                <span className="text-5xl mb-4 block">🐈</span>
                <h3 className="text-2xl font-bold text-stone-900 mb-2">
                  For Cats
                </h3>
                <p className="text-stone-600 mb-4">
                  From gourmet meals to natural litter, everything your cat deserves.
                </p>
                <span className="inline-flex items-center gap-1 text-stone-700 font-medium text-sm group-hover:gap-2 transition-all">
                  Shop Cat Products <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-stone-50">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading">Bestsellers</h2>
              <p className="section-subheading mt-2">
                Our most loved products, chosen by thousands of pet parents.
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-amber-700 hover:text-amber-800 transition-colors"
            >
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ProductGrid products={featuredProducts} />

          <div className="mt-8 text-center md:hidden">
            <Link href="/shop">
              <Button variant="outline">View All Products</Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Subscription CTA */}
      <section className="section-padding bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Subscribe & Save Up to 15%
            </h2>
            <p className="mt-4 text-lg text-amber-100 max-w-xl mx-auto">
              Never run out of your pet&apos;s favorites. Set your delivery schedule,
              save on every order, and pause or cancel anytime.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <span>Choose products</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <span>Pick your schedule</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <span>Save on every delivery</span>
              </div>
            </div>
            <div className="mt-8">
              <Link href="/shop">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-amber-700 hover:bg-amber-50"
                >
                  Start Saving Today
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Quiz CTA */}
      <section className="section-padding bg-white">
        <Container size="md">
          <div className="bg-gradient-to-br from-stone-50 to-amber-50 rounded-3xl p-8 md:p-16 text-center border border-stone-200">
            <span className="text-4xl mb-4 block">🔍</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
              Not sure what to get?
            </h2>
            <p className="mt-4 text-lg text-stone-600 max-w-md mx-auto">
              Take our quick quiz and get personalized product recommendations
              based on your pet&apos;s unique needs.
            </p>
            <div className="mt-8">
              <Link href="/quiz">
                <Button size="lg">
                  Take the Quiz
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-stone-400">
              Takes less than 2 minutes
            </p>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-stone-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">Happy Pets, Happy Parents</h2>
            <p className="section-subheading mx-auto mt-3">
              Don&apos;t just take our word for it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                pet: "Golden Retriever Mom",
                quote:
                  "My dog's coat has never looked better! The salmon formula is a game-changer. Plus, the subscription makes it so easy — it just shows up when we need it.",
                rating: 5,
              },
              {
                name: "James R.",
                pet: "Cat Dad x2",
                quote:
                  "Finally found a litter that actually controls odor. The clumping is incredible and the dust is virtually nonexistent. Both my cats took to it immediately.",
                rating: 5,
              },
              {
                name: "Emily K.",
                pet: "Puppy Parent",
                quote:
                  "The puppy formula has been perfect for our growing Lab. He absolutely loves mealtime now. The auto-delivery means I never have to worry about running out.",
                rating: 5,
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-white rounded-2xl p-8 border border-stone-100"
              >
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-stone-600 leading-relaxed italic">
                  &ldquo;{review.quote}&rdquo;
                </p>
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <p className="font-semibold text-stone-900">{review.name}</p>
                  <p className="text-sm text-stone-500">{review.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
