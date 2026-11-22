import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import hero from "@/assets/hero-car.jpg";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RIMS.BG — Премиум джанти, волани и body kits" },
      { name: "description", content: "Премиум джанти Vossen, BBS, Rays, HRE и OZ, спортни волани, body kits и автоаксесоари." },
      { property: "og:title", content: "RIMS.BG — Стил. Прецизност. Характер." },
      { property: "og:description", content: "Изгради автомобила, който заслужаваш. Премиум джанти и тунинг аксесоари." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <section className="relative h-[420px] overflow-hidden md:h-[460px]">
        <img src={hero} alt="Черен спортен седан" width={1920} height={832} className="absolute inset-0 h-full w-full object-cover object-[70%_center]" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex h-full max-w-[1450px] flex-col justify-center px-4 md:px-8">
          <h1 className="font-display text-5xl leading-[0.95] md:text-7xl">Стил.<br />Прецизност.<br />Характер<span className="text-primary">.</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">Изгради автомобила, който заслужаваш.</p>
          <Link to="/category/$slug" params={{ slug: "dzhanti" }} className="mt-6 inline-flex w-fit items-center gap-2 bg-primary px-7 py-4 font-display text-lg transition hover:bg-primary-glow hover:shadow-red">
            Разгледай колекцията <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-4 py-10 md:px-8">
        <h2 className="mb-5 font-display text-3xl">Избрани категории</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {categories.map((c) => (
            <Link key={c.slug} to="/category/$slug" params={{ slug: c.slug }} className="group relative aspect-[4/3] overflow-hidden border border-border transition hover:border-primary lg:aspect-[16/10]">
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover brightness-75 transition duration-500 group-hover:scale-110 group-hover:brightness-100" />
              <div className="absolute inset-0 bg-card-overlay" />
              <span className="absolute bottom-4 left-4 flex items-center gap-2 font-display text-xl md:text-2xl">{c.name} <ArrowRight className="h-5 w-5 text-primary transition group-hover:translate-x-1" /></span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1450px] px-4 pb-16 md:px-8">
        <div className="mb-5 flex items-end justify-between">
          <h2 className="font-display text-3xl">Премиум джанти</h2>
          <Link to="/category/$slug" params={{ slug: "dzhanti" }} className="flex items-center gap-1 text-sm font-semibold uppercase hover:text-primary">Виж всички <ArrowRight className="h-4 w-4 text-primary" /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
          {products.map((p) => <ProductCard key={p.id} p={p} />)}
        </div>
      </section>
    </>
  );
}
