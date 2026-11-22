import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Контакти — RIMS.BG" },
      { name: "description", content: "Свържи се с екипа на RIMS.BG за джанти, волани и body kits." },
      { property: "og:title", content: "Контакти — RIMS.BG" },
      { property: "og:description", content: "Свържи се с RIMS.BG." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <section className="mx-auto max-w-[1450px] px-4 py-14 md:px-8">
      <h1 className="font-display text-5xl">Контакти<span className="text-primary">.</span></h1>
      <div className="mt-8 grid gap-3 md:grid-cols-3">
        {[[Phone, "+359 888 000 000"], [Mail, "office@rims.bg"], [MapPin, "София, България"]].map(([Icon, t]) => {
          const I = Icon as typeof Phone;
          return <div key={t as string} className="flex items-center gap-3 border border-border bg-card p-6"><I className="h-5 w-5 text-primary" />{t as string}</div>;
        })}
      </div>
    </section>
  );
}
