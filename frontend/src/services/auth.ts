import { api } from "./api";

// loga o user com email e senha
export async function login(email: string, password: string) {
  return await api("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

// desloga o user
export async function logout() {
  return await api("/auth/logout", {
    method: "POST",
  });
}
