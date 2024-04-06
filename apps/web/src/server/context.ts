import type { Session } from "next-auth";

export interface Context { session: Session | null }
