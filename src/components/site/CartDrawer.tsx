import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/catalog";

export function CartDrawer() {
  const { open, setOpen, lines, total, setQty } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-surface/70" onClick={() => setOpen(false)}>
      <aside className="flex h-full w-full max-w-md flex-col border-l border-border bg-card" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-border p-5">
          <h2 className="font-display text-2xl">Количка</h2>
          <button aria-label="Затвори" onClick={() => setOpen(false)}><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-5">
          {lines.length === 0 && <p className="text-muted-foreground">Количката е празна.</p>}
          {lines.map((l) => (
            <div key={l.id} className="flex gap-3 border border-border p-3">
              <img src={l.product.image} alt={l.product.name} className="h-16 w-16 object-contain" />
              <div className="flex-1">
                <div className="font-semibold">{l.product.name}</div>
                <div className="text-sm text-primary">{formatPrice(l.product.price)}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button aria-label="По-малко" onClick={() => setQty(l.id, l.qty - 1)} className="border border-border p-1"><Minus className="h-3 w-3" /></button>
                  <span className="w-6 text-center text-sm">{l.qty}</span>
                  <button aria-label="Повече" onClick={() => setQty(l.id, l.qty + 1)} className="border border-border p-1"><Plus className="h-3 w-3" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-border p-5">
          <div className="mb-4 flex justify-between font-semibold"><span>Общо</span><span className="text-primary">{formatPrice(total)}</span></div>
          <button disabled={!lines.length} className="w-full bg-primary py-3 font-display text-lg transition hover:bg-primary-glow disabled:opacity-40">Към плащане</button>
        </div>
      </aside>
    </div>
  );
}
