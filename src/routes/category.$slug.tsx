import { createFileRoute, notFound } from "@tanstack/react-router";
import { categories, products } from "@/lib/catalog";
import { ProductCard } from "@/components/site/ProductCard";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const c = categories.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { name: c.name, image: c.image, slug: c.slug };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Категория"} — RIMS.BG` },
      { name: "description", content: `${loaderData?.name ?? "Продукти"} от RIMS.BG — премиум тунинг магазин.` },
      { property: "og:title", content: `${loaderData?.name ?? "Категория"} — RIMS.BG` },
      { property: "og:description", content: "Премиум продукти за твоя автомобил." },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const c = Route.useLoaderData();
  const list = products.filter((p) => p.category === c.slug);
  return (
    <>
      <section className="relative h-56 overflow-hidden">
        <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover brightness-50" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="relative mx-auto flex h-full max-w-[1450px] items-end px-4 pb-8 md:px-8"><h1 className="font-display text-5xl">{c.name}<span className="text-primary">.</span></h1></div>
      </section>
      <section className="mx-auto max-w-[1450px] px-4 py-10 md:px-8">
        {list.length ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">{list.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : <p className="text-muted-foreground">Очаквайте скоро нови продукти в тази категория.</p>}
      </section>
    </>
  );
}
