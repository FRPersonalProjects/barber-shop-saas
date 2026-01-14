import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Card, CardContent } from "./ui/card";

const BookingItem = () => {
  return (
    <>
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
    </>
  );
};

export default BookingItem;
