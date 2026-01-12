"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // auth.login agora só faz o POST.
      // browser recebe o cookie 'set-cookie' automaticamente.
      await auth.login(email, password);

      // Se !erro, o cookie esta salvo, redirecionar
      router.push("/");
      router.refresh(); // garante que a home recarregue com o novo cookie
    } catch (err: any) {
      setError(err?.message || "Login falhou");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md rounded-2xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-center mb-6">
            <Image src="/logo.svg" alt="Logo" width={160} height={30} />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                Entrar na sua conta
              </h2>
              <p className="text-sm text-muted-foreground">
                Use seu email e senha para continuar
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground">
                Senha
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2"
              />
            </div>

            {error && <div className="text-sm text-destructive">{error}</div>}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Entrando..." : "Entrar"}
            </Button>

            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <a
                className="text-primary hover:underline"
                href="/forgot-password"
              >
                Esqueci a senha
              </a>
              <a className="text-primary hover:underline" href="/register">
                Criar conta
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

export default LoginPage;
