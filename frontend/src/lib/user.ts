import { request } from "./request";

export type User = {
  id: string;
  name: string;
  email: string;
};

let _cachedUser: User | null = null; // cache do usuario logado

export const user = {
  // atalho direto (retorna a promise do request)
  me: () => request("/user/me"),

  // método com tratamento de erro e cache; retorna null se não autenticado
  getProfile: async (): Promise<User | null> => {
    if (_cachedUser) return _cachedUser; // retorna do cache se existir
    try {
      const u = (await request("/user/me")) as User;
      _cachedUser = u;
      return u;
    } catch (err) {
      return null;
    }
  },
};

export default user;
