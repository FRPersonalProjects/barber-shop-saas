import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortBarbershopsByName(barbershops: any[]) {
  return [...barbershops].sort((a, b) => {
    // localeCompare lida corretamente com acentos e cedilha (ex: Á, Ç)
    return a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" });
  });
}
