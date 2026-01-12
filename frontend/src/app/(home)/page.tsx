import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import BarbershopItem from "@/components/barbershop-item";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { request } from "@/lib/request";
import { sortBarbershopsByName } from "@/lib/utils";
import { getBarbershops } from "@/lib/barbershop";

async function Home() {
  // pega todos os cookies para repassar ao backend
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const user = await request("/users/me", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  let barbershops = [];
  let popularBarbershops = [];
  try {
  // 1. Primeiro guardamos o resultado da API em uma variável (ex: data)
  const data = await request("/barbershops", {
    headers: { cookie: cookieHeader },
    cache: "no-store",
  });

  // 2. Agora passamos esse 'data' para a função de ordenação
  // Se você estiver usando a função getBarbershopsSortedByName que criamos, 
  // ela já faz tudo isso. Mas se estiver ordenando manualmente na página:
  barbershops = await getBarbershops(cookieHeader);
  popularBarbershops = sortBarbershopsByName(barbershops); 

} catch (err) {
  console.error("Erro ao buscar barbearias:", err);
  barbershops = [];
}

  return (
    <div>
      <Header />
      <div className="pt-2 p-5">
        <h2 className="text-xl font-bold">Olá, {user.name}!</h2>
        <p>Sexta feira, 09 de janeiro</p>
        <div className="flex items-center gap-2 mt-6 space-x-2">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>
        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Banner"
            src="/banner-01.png"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <h2 className="mb-3 uppercase text-xs font-bold text-gray-400 mt-6 ">
          Agendamentos
        </h2>
        <Card className="rounded-2xl">
          <CardContent className="flex justify-between p-0">
            {/* esquerda */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3 className="font-semibold">Corte de Cabelo</h3>
              <div className="flex items-center gap-2">
                <Avatar className="w-6 h-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p className="text-sm">Nome da Barbearia</p>
              </div>
            </div>
            {/* direita */}
            <div className="flex flex-col items-center justify-center px-5 border-l-2 border-solid">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">08:00</p>
            </div>
          </CardContent>
        </Card>

        <h2 className="mb-3 uppercase text-xs font-bold text-gray-400 mt-6 ">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {Array.isArray(barbershops) && barbershops.length > 0 ? (
            barbershops.map((b: any) => (
              <BarbershopItem key={b.id} barbershop={b} />
            ))
          ) : (
            <div className="text-sm text-gray-400">
              Nenhuma barbearia encontrada
            </div>
          )}
        </div>
        <h2 className="mb-3 uppercase text-xs font-bold text-gray-400 mt-6 ">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {Array.isArray(popularBarbershops) && popularBarbershops.length > 0 ? (
            popularBarbershops.map((b: any) => (
              <BarbershopItem key={b.id} barbershop={b} />
            ))
          ) : (
            <div className="text-sm text-gray-400">
              Nenhuma barbearia encontrada
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
