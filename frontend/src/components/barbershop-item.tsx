import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { StarIcon } from "lucide-react";

interface Barbershop {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  address?: string | null;
}

interface BarbershopItemProps {
  barbershop: Barbershop;
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-[159px] rounded-2xl">
      <CardContent className="p-0 px-1 pt-1">
        {/* image */}
        {barbershop.imageUrl ? ( // se existir a imagem
          <div className="relative h-[159px] w-full">
            <Image
              fill
              className="object-cover rounded-2xl"
              src={barbershop.imageUrl}
              alt={barbershop.name}
            />

            <Badge className="absolute left-2 top-2 space-x-1 bg-black/40 backdrop-blur-sm rounded-full" variant="secondary">
              <StarIcon size={12} className="fill-primary text-primary font-bold" />
              <p className="text-xs font-semibold">5,0</p>
            </Badge>
          </div>
        ) : null}
        {/* texto */}
        <div className="px-1 py-3">
          <h3 className=" truncate font-semibold">{barbershop.name}</h3>
          <p className="text-sm truncate text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full rounded-2xl text-primary">
            Reservar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarbershopItem;
