const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function api(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include", // para o backend separado receber cookies
    headers: {
      "Content-Type": "application/json",
      ...(opts.headers || {}),
    },
    ...opts,
  });
  const text = await res.text();

  // tenta converter para JSON, se falhar ou estiver vazio, retorna o texto puro
  const body = (() => {
    try {
      return text ? JSON.parse(text) : null;
    } catch {
      return text;
    }
  })();

  if (!res.ok) {
    const err: any = new Error(
      body?.message || res.statusText || "Request failed"
    );
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}

export default api;
