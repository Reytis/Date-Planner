import { useAuth } from "./useAuth";

export function useAccount() {
  const { account } = useAuth();

  if (!account) {
    throw new Error("useAccount must be used within an AuthProvider and when the user is authenticated");
  }

  return {
    account
  };
}