import { request } from "./request";

export type Barbershop = {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt?: string;
};

// buscar todas as barbearias
export async function getBarbershops(
  cookieHeader: string
): Promise<Barbershop[]> {
  return await request("/barbershops", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
}

// ordena as barbearias pelo nome
export async function getBarbershopsSortedByName(
  cookieHeader: string
): Promise<Barbershop[]> {
  const barbershops = await getBarbershops(cookieHeader);

  if (!Array.isArray(barbershops)) {
    return [];
  }

  // copia e ordena
  return [...barbershops].sort((a, b) =>
    a.name.localeCompare(b.name, "pt-BR", { sensitivity: "base" })
  );
}

// buscar uma barbearia pelo ID
export async function getBarbershopById(
  id: string,
  cookieHeader: string
): Promise<Barbershop> {
  return await request(`/barbershops/${id}`, {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });
}
