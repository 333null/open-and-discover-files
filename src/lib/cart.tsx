import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { products, type Product } from "./catalog";

type Line = { id: string; qty: number };
type Ctx = {
  lines: (Line & { product: Product })[];
  count: number; total: number; open: boolean;
  setOpen: (o: boolean) => void;
  add: (id: string) => void; setQty: (id: string, q: number) => void;
};
const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    try { setLines(JSON.parse(localStorage.getItem("rims-cart") || "[]")); } catch { /* ignore */ }
  }, []);
  const save = (l: Line[]) => { setLines(l); localStorage.setItem("rims-cart", JSON.stringify(l)); };
  const add = (id: string) => {
    const ex = lines.find((l) => l.id === id);
    save(ex ? lines.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...lines, { id, qty: 1 }]);
    setOpen(true);
  };
  const setQty = (id: string, q: number) => save(q <= 0 ? lines.filter((l) => l.id !== id) : lines.map((l) => (l.id === id ? { ...l, qty: q } : l)));
  const full = lines.flatMap((l) => { const p = products.find((x) => x.id === l.id); return p ? [{ ...l, product: p }] : []; });
  const count = full.reduce((a, l) => a + l.qty, 0);
  const total = full.reduce((a, l) => a + l.qty * l.product.price, 0);
  return <CartCtx.Provider value={{ lines: full, count, total, open, setOpen, add, setQty }}>{children}</CartCtx.Provider>;
}
export const useCart = () => { const c = useContext(CartCtx); if (!c) throw new Error("no cart"); return c; };
