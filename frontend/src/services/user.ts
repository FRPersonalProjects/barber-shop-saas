import { api } from "./api";

export type User = {
  id: string;
  name: string;
  email: string;
};

// busca dados do user, validando o cookie para identicar o user logado
export async function getUserMe(cookieHeader: string): Promise<User> {
  return await api("/users/me", {
    headers: { cookie: cookieHeader },
    cache: "no-store", // garante dados atualizados
  });
}

// obter o infos do user pelo id
export async function getUserProfile(
  cookieHeader: string
): Promise<User | null> {
  try {
    return await getUserMe(cookieHeader);
  } catch (err) {
    return null;
  }
}

export async function register(
  email: string,
  name: string,
  password: string
): Promise<void> {
  await api("/users/register", {
    method: "POST",
    body: JSON.stringify({
      email,
      name,
      password,
    }),
  });
}
