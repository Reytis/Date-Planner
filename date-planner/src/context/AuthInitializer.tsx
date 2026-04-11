"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

/**
 * Component that initializes authentication on app load.
 * This ensures that the user's authentication status is checked immediately when the app starts,
 * regardless of which page the user lands on.
 */
export function AuthInitializer({ children }: { children: React.ReactNode }) {
  const { authenticate } = useAuth();

  useEffect(() => {
    authenticate();
  }, [authenticate]);

  return <div>{children}</div>;
}
