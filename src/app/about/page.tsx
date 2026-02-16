import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import {
  Heart,
  Leaf,
  ShieldCheck,
  Award,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Learn about Pawsome's mission to provide premium, naturally sourced nutrition for your dogs and cats.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-amber-50 to-stone-50">
        <Container size="md">
          <div className="py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-stone-900 text-balance">
              Nutrition crafted with love for your furry family
            </h1>
            <p className="mt-6 text-lg text-stone-600 max-w-xl mx-auto leading-relaxed">
              We started Pawsome with a simple belief: every pet deserves food
              that&apos;s as good as what we&apos;d eat ourselves. No fillers, no
              shortcuts — just honest, premium nutrition.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-16">
            <h2 className="section-heading">What We Believe In</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Natural First",
                desc: "Every recipe starts with real, whole ingredients. No artificial anything.",
              },
              {
                icon: ShieldCheck,
                title: "Vet Approved",
                desc: "All formulas developed with board-certified veterinary nutritionists.",
              },
              {
                icon: Heart,
                title: "Pet Happiness",
                desc: "If your pet doesn't love it, we'll make it right. Every time.",
              },
              {
                icon: Award,
                title: "Quality Obsessed",
                desc: "Small-batch production with rigorous testing at every stage.",
              },
            ].map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 mb-4">
                  <value.icon className="h-7 w-7 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-stone-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-stone-500 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="section-padding bg-stone-50">
        <Container size="md">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-heading mb-6">Our Story</h2>
            <div className="prose prose-stone prose-lg">
              <p className="text-stone-600 leading-relaxed">
                Pawsome was born in 2022 when our founder, a lifelong pet
                parent, grew frustrated with the lack of truly premium,
                transparent pet food options. After months of research and
                collaboration with veterinary nutritionists, we created our
                first recipe — and our dogs went crazy for it.
              </p>
              <p className="text-stone-600 leading-relaxed mt-4">
                Since then, we&apos;ve expanded to serve both dogs and cats with a
                complete line of food, treats, and essentials. Every product is
                made in small batches right here in the USA, using globally
                sourced ingredients that meet our strict quality standards.
              </p>
              <p className="text-stone-600 leading-relaxed mt-4">
                Today, over 10,000 pet parents trust Pawsome for their
                furry family members&apos; nutrition. We&apos;re just getting started.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Happy Pet Parents" },
              { value: "50,000+", label: "Meals Delivered" },
              { value: "4.8/5", label: "Average Rating" },
              { value: "30-Day", label: "Money-Back Guarantee" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl md:text-4xl font-bold text-amber-600">
                  {stat.value}
                </p>
                <p className="text-sm text-stone-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-stone-900 text-white">
        <Container size="sm">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Ready to make the switch?
            </h2>
            <p className="mt-4 text-stone-400 max-w-md mx-auto">
              Join thousands of pet parents who trust Pawsome for premium
              nutrition. Try risk-free with our 30-day guarantee.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/quiz">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-stone-600 text-white hover:bg-stone-800"
                >
                  Take the Quiz
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
