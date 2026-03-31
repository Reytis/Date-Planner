"use client";

import { createContext, useState, ReactNode } from "react";
import { Account } from "@/types/account";

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export const AuthContext = createContext<{
  account: Account | null | undefined;
  status: AuthStatus;
  setAccount: (account: Account | null) => void;
  setStatus: (status: AuthStatus) => void;
}>({
  account: null,
  status: AuthStatus.Guest,
  setAccount: () => {},
  setStatus: () => {},
});

// AuthProvider component that wraps the application and provides the authentication context to its children
export function AuthProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<Account | null | undefined>(null); // State to hold the current user's account information
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.Guest); // State to hold the current authentication status of the user (e.g. authenticated, guest, unknown)

  return (
    <AuthContext.Provider
      value={{ account, status, setAccount, setStatus}}
    >
      {children}
    </AuthContext.Provider>
  );
}