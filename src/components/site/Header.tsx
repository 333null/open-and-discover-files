import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { categories, products, formatPrice } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export function Logo() {
  return <Link to="/" className="font-display text-3xl leading-none">RIMS<span className="text-primary">.BG</span></Link>;
}

export function Header() {
  const { count, setOpen } = useCart();
  const [mobile, setMobile] = useState(false);
  const [search, setSearch] = useState(false);
  const [q, setQ] = useState("");
  const results = q ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase())) : [];
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1450px] items-center justify-between gap-4 px-4 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex">
          {categories.map((c) => (
            <div key={c.slug} className="group relative">
              <Link to="/category/$slug" params={{ slug: c.slug }} className="flex items-center gap-1 py-5 text-sm font-semibold tracking-wide uppercase transition-colors hover:text-primary">
                {c.name} <ChevronDown className="h-3.5 w-3.5" />
              </Link>
              <div className="invisible absolute top-full left-0 min-w-52 border border-border border-t-2 border-t-primary bg-popover py-2 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                {c.sub.map((s) => (
                  <Link key={s} to="/category/$slug" params={{ slug: c.slug }} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">{s}</Link>
                ))}
              </div>
            </div>
          ))}
          <Link to="/contact" className="text-sm font-semibold tracking-wide uppercase hover:text-primary">Контакти</Link>
        </nav>
        <div className="flex items-center gap-1">
          <button aria-label="Търсене" onClick={() => setSearch(true)} className="p-2 hover:text-primary"><Search className="h-5 w-5" /></button>
          <button aria-label="Профил" className="hidden p-2 hover:text-primary sm:block"><User className="h-5 w-5" /></button>
          <button aria-label="Количка" onClick={() => setOpen(true)} className="relative p-2 hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && <span className="absolute top-0 right-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold">{count}</span>}
          </button>
          <button aria-label="Меню" onClick={() => setMobile(!mobile)} className="p-2 lg:hidden">{mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}</button>
        </div>
      </div>
      {mobile && (
        <nav className="border-t border-border bg-surface px-4 pb-4 lg:hidden">
          {categories.map((c) => (
            <Link key={c.slug} onClick={() => setMobile(false)} to="/category/$slug" params={{ slug: c.slug }} className="block border-b border-border py-3 font-display text-xl">{c.name}</Link>
          ))}
          <Link to="/contact" onClick={() => setMobile(false)} className="block py-3 font-display text-xl">Контакти</Link>
        </nav>
      )}
      {search && (
        <div className="fixed inset-0 z-50 bg-surface/95 p-4 pt-24" onClick={() => setSearch(false)}>
          <div className="mx-auto max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3 border-b-2 border-primary pb-3">
              <Search className="h-6 w-6 text-primary" />
              <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Търси джанти, марки..." className="flex-1 bg-transparent font-display text-3xl outline-none placeholder:text-muted-foreground" />
              <button aria-label="Затвори" onClick={() => setSearch(false)}><X className="h-6 w-6" /></button>
            </div>
            <div className="mt-4 space-y-2">
              {results.map((p) => (
                <Link key={p.id} to="/product/$id" params={{ id: p.id }} onClick={() => setSearch(false)} className="flex items-center gap-4 border border-border bg-card p-3 hover:border-primary">
                  <img src={p.image} alt={p.name} className="h-14 w-14 object-contain" />
                  <div className="flex-1"><div className="font-semibold">{p.name}</div><div className="text-sm text-muted-foreground">{p.spec}</div></div>
                  <div className="font-bold text-primary">{formatPrice(p.price)}</div>
                </Link>
              ))}
              {q && results.length === 0 && <p className="text-muted-foreground">Няма резултати.</p>}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
