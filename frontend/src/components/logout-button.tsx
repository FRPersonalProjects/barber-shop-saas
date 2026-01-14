"use client";

import { logout } from "@/services/auth";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    try {
      await logout(); // Chama sua função do services/auth.ts
      router.refresh(); // Atualiza o estado do servidor
      router.push("/login"); // Redireciona
    } catch (error) {
      console.error("Erro ao deslogar", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      variant="destructive" 
      className="w-full mt-10 gap-2" 
      onClick={handleLogout}
      disabled={loading}
    >
      <LogOut size={16} />
      {loading ? "Saindo..." : "Sair da conta"}
    </Button>
  );
}