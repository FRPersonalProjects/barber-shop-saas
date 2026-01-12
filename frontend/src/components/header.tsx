import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card className="bg-transparent shadow-none border-0 pt-8 pb-0">
      <CardContent className="p-5 flex items-center justify-center relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 fill-white">
          <Image src="/logo.svg" alt="Logo" width={240} height={80} />
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-5 focus:outline-none focus-visible:outline-none focus:ring-0 focus-visible:ring-0 [&_svg]:size-7"
        >
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
