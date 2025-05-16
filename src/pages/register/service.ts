import { client } from "../../api/client";
import type { User } from "./types";

export const register = async (user: User) => {
  await client.post<User>("/api/auth/signup", user);
};
