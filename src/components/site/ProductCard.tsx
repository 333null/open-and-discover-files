import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { formatPrice, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function ProductCard({ p }: { p: Product }) {
  const { add } = useCart();
  return (
    <div className="group relative flex flex-col border border-border bg-card p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-red">
      {p.badge && <span className={`absolute top-3 left-3 z-10 px-2 py-0.5 text-[10px] font-bold tracking-wider ${p.badge === "НОВО" ? "bg-secondary" : "bg-primary"}`}>{p.badge}</span>}
      <Link to="/product/$id" params={{ id: p.id }} className="block">
        <img src={p.image} alt={p.name} loading="lazy" width={816} height={816} className="aspect-square w-full object-contain transition duration-500 group-hover:scale-105" />
        <h3 className="mt-3 font-semibold">{p.name}</h3>
        <p className="text-sm text-muted-foreground">{p.spec}</p>
      </Link>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-lg font-bold text-primary">{formatPrice(p.price)}</span>
        <button aria-label={`Добави ${p.name}`} onClick={() => add(p.id)} className="border border-border p-2 transition hover:border-primary hover:bg-primary"><ShoppingCart className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
