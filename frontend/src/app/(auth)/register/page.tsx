"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/services/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("As senhas não são iguais.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await register(email, name, password);
      router.push("/login");
    } catch (err) {
      setError(err.message || "Erro ao criar conta.");
      setPassword("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <style jsx global>{`
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px #1e1e1e inset !important;
          -webkit-text-fill-color: white !important;
        }
      `}</style>

      {/* 1. CONTAINER CENTRAL */}
      <div className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-[85%] sm:max-w-md flex flex-col items-center">
          {/* Cabeçalho */}
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-xl font-bold text-primary">Criar Conta</h1>
          </div>

          {/* Formulário de Cadastro */}
          <form
            onSubmit={handleSubmit}
            className={`w-full flex flex-col mt-4 space-y-4 ${error ? "animate-shake" : ""}`}
          >
            <Input
              type="email"
              placeholder={error && error.includes("Email") ? error : "Email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              required
              className={`bg-muted/50 h-11 rounded-full px-6 border-none transition-all ${
                error ? "ring-2 ring-destructive" : ""
              }`}
            />

            <Input
              type="text"
              placeholder="Nome de usuário"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (error) setError("");
              }}
              required
              className="bg-muted/50 h-11 rounded-full px-6 border-none"
            />

            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Senha"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                className={`bg-muted/50 h-11 rounded-full px-6 border-none transition-all ${
                  error && error.includes("senhas")
                    ? "ring-2 ring-destructive"
                    : ""
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
              </button>
            </div>

            <Input
              type="password"
              placeholder="Confirmar Senha"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (error) setError("");
              }}
              required
              className={`bg-muted/50 h-11 rounded-full px-6 border-none transition-all ${
                error && error.includes("senhas")
                  ? "ring-2 ring-destructive"
                  : ""
              }`}
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-primary h-11 text-slate-200 font-semibold rounded-full border-2 border-primary mt-4 hover:bg-background transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Criar Conta <ChevronRight size={18} />
                </>
              )}
            </Button>
          </form>

          {/* Link para voltar ao Login */}
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Já tem uma conta?{" "}
              <Link
                href="/login"
                className="text-primary font-bold hover:text-white transition-colors"
              >
                Faça Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* 2. FOOTER CONSISTENTE */}
      <footer className="w-full py-6 text-center space-y-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
          You are completely safe.
        </p>
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
          Read our{" "}
          <Link href="#" className="text-primary underline font-bold">
            Terms & Conditions
          </Link>
        </p>
      </footer>
    </main>
  );
}
