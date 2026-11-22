import wheel1 from "@/assets/wheel-1.jpg";
import wheel2 from "@/assets/wheel-2.jpg";
import wheel3 from "@/assets/wheel-3.jpg";
import catWheels from "@/assets/cat-wheels.jpg";
import catSteering from "@/assets/cat-steering.jpg";
import catBody from "@/assets/cat-bodykit.jpg";
import catAcc from "@/assets/cat-accessories.jpg";

export type Category = { slug: string; name: string; image: string; sub: string[] };
export const categories: Category[] = [
  { slug: "dzhanti", name: "Джанти", image: catWheels, sub: ["Ковани джанти", "Леки сплави", "R18", "R19", "R20"] },
  { slug: "volani", name: "Волани", image: catSteering, sub: ["Алкантара", "Карбон", "LED волани"] },
  { slug: "body-kits", name: "Body Kits", image: catBody, sub: ["Сплитери", "Дифузьори", "Спойлери"] },
  { slug: "avtoaksesoari", name: "Автоаксесоари", image: catAcc, sub: ["Интериор", "Осветление", "Стелки"] },
];

export type Product = { id: string; name: string; spec: string; price: number; image: string; badge?: string; category: string };
export const products: Product[] = [
  { id: "vossen-hf-5", name: "Vossen HF-5", spec: "R20 • 5x112", price: 3490, image: wheel1, category: "dzhanti" },
  { id: "bbs-ci-r", name: "BBS CI-R", spec: "R19 • 5x112", price: 2690, image: wheel3, badge: "ТОП ИЗБОР", category: "dzhanti" },
  { id: "rays-volk-te37", name: "Rays Volk TE37", spec: "R18 • 5x114.3", price: 3290, image: wheel2, category: "dzhanti" },
  { id: "hre-ff10", name: "HRE FF10", spec: "R20 • 5x112", price: 4990, image: wheel1, badge: "НОВО", category: "dzhanti" },
  { id: "oz-ultraleggera", name: "OZ Ultraleggera", spec: "R18 • 5x108", price: 2390, image: wheel3, category: "dzhanti" },
];

export const formatPrice = (n: number) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} лв.`;
