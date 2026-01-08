import { type Session, type User } from "better-auth";
import { createContext } from "react-router";

export const UserContext = createContext<User | undefined>(undefined);
export const SessionContext = createContext<Session | undefined>(undefined);
