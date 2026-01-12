import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // tenta obter o token do cookie
  const token = request.cookies.get("access_token")?.value;

  // define as rotas publicas
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register");

  // !token e !rota publica -> redireciona para login
  if (!token && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // token validado não precisa de login
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

// rotas o middleware deve rodar
export const config = {
  matcher: [
    /*
     * todas, exceto:
     * 1. api (rotas de API do Next)
     * 2. _next/static (arquivos estáticos)
     * 3. _next/image (otimização de imagens)
     * 4. favicon.ico (ícone do navegador)
     * 5. arquivos com extensão (png, svg, etc)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
