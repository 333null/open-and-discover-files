import { createFileRoute, notFound } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { formatPrice, products } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = products.find((x) => x.id === params.id);
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Продукт"} — RIMS.BG` },
      { name: "description", content: `${loaderData?.name ?? ""} ${loaderData?.spec ?? ""} — купи от RIMS.BG.` },
      { property: "og:title", content: `${loaderData?.name ?? "Продукт"} — RIMS.BG` },
      { property: "og:description", content: loaderData?.spec ?? "Премиум джанти" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const p = Route.useLoaderData();
  const { add } = useCart();
  return (
    <section className="mx-auto grid max-w-[1450px] gap-10 px-4 py-12 md:grid-cols-2 md:px-8">
      <div className="border border-border bg-card p-8"><img src={p.image} alt={p.name} className="w-full object-contain" /></div>
      <div className="flex flex-col justify-center">
        {p.badge && <span className="mb-3 w-fit bg-primary px-2 py-0.5 text-xs font-bold">{p.badge}</span>}
        <h1 className="font-display text-5xl">{p.name}</h1>
        <p className="mt-2 text-lg text-muted-foreground">{p.spec}</p>
        <p className="mt-6 text-3xl font-bold text-primary">{formatPrice(p.price)}</p>
        <p className="mt-4 text-sm text-muted-foreground">Цена за комплект от 4 броя. Безплатна доставка до 3 работни дни.</p>
        <button onClick={() => add(p.id)} className="mt-8 inline-flex w-fit items-center gap-2 bg-primary px-8 py-4 font-display text-lg transition hover:bg-primary-glow hover:shadow-red"><ShoppingCart className="h-5 w-5" /> Добави в количката</button>
      </div>
    </section>
  );
}
