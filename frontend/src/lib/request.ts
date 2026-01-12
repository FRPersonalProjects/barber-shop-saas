import "dotenv/config";

// console.log("BACKEND_API_URL:", process.env.NEXT_PUBLIC_API_URL);
const API_URL = process.env.NEXT_PUBLIC_API_URL;// || "http://localhost:8080";

if (!process.env.NEXT_PUBLIC_API_URL) {
  // eslint-disable-next-line no-console
  throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
}

// console.log("API_URL:", API_URL);

export async function request(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    credentials: "include",
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const text = await res.text();
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

export default request;
