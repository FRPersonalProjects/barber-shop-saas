import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import Header from "@/components/header";
import BarbershopItem from "@/components/barbershop-item";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  getBarbershops,
  getBarbershopsSortedByName,
} from "@/services/barbershop";
import { getUserMe } from "@/services/user";
import { LogoutButton } from "@/components/logout-button";
import { QUICK_SEARCH_OPTIONS } from "@/constants/quickSearchOptions";
import BookingItem from "@/components/booking-item";

async function Home() {
  const cookieStore = cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  // dispara todas ao mesmo tempo, tempo de espera será apenas o da chamada mais lenta
  const [user, barbershops, popularBarbershops] = await Promise.all([
    getUserMe(cookieHeader),
    getBarbershops(cookieHeader),
    getBarbershopsSortedByName(cookieHeader),
  ]);

  return (
    <div>
      <Header />
      <div className="pt-2 p-5">
        <h2 className="text-xl font-bold">Olá, {user.name}!</h2>
        <p>Sexta feira, 09 de janeiro</p>
        <div className="flex items-center gap-2 mt-6">
          <Input placeholder="Faça sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="flex overflow-x-scroll gap-3 mt-6 [&::-webkit-scrollbar]:hidden">
          {QUICK_SEARCH_OPTIONS.map((option) => (
            <Button key={option.title} variant="secondary" className="gap-2">
              <Image
                src={option.image}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className="relative w-full h-[150px] mt-6">
          <Image
            alt="Banner"
            src="/banner-01.png"
            fill
            className="rounded-2xl object-cover"
          />
        </div>

        <BookingItem />

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
          {Array.isArray(popularBarbershops) &&
          popularBarbershops.length > 0 ? (
            popularBarbershops.map((b: any) => (
              <BarbershopItem key={b.id} barbershop={b} />
            ))
          ) : (
            <div className="text-sm text-gray-400">
              Nenhuma barbearia encontrada
            </div>
          )}
        </div>

        <LogoutButton />

        <footer>
          <Card>
            <CardContent className="px-5 py-6">
              <p className="text-sm text-gray-400">
                @2026 Copyright <span className="font-bold">TrimTech</span>
              </p>
            </CardContent>
          </Card>
        </footer>
      </div>
    </div>
  );
}

export default Home;
