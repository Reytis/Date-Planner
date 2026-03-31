import { AuthContext } from "@/context/AuthContext";
import { useCallback, useContext } from "react";

export enum AuthStatus {
  Unknown = 0,
  Authenticated = 1,
  Guest = 2,
}

export function useAuth() {
  const { account, setAccount} = useContext(AuthContext);

  // Check whenether the user is authenticated, a guest or if the status is unknown (e.g. when the app is loading and we don't know yet if the user is authenticated or not)
  let status;
  switch (account) {
    case null:
      status = AuthStatus.Guest; //Not connected
      break;
    case undefined:
      status = AuthStatus.Unknown; //loading or error state
      break;
    default:
      status = AuthStatus.Authenticated;// Connected
  }

  // Function to check if the user is authenticated by calling the /api/auth/me endpoint and updating the account state accordingly
  const authenticate = useCallback(async () => {
    const res = await fetch("/api/auth/me", { credentials: "include" });
    const json = await res.json();
    if (json.LoggedIn) {
      setAccount(json.user);// Update the account state with the user data returned from the API
    } else {
      setAccount(null);// If the user is not authenticated, set the account state to null
    }
  }, []);

  // Function to log in the user by calling the /api/auth/login endpoint with the provided email and password, and updating the account state with the user data returned from the API
  const login = useCallback( async(email: string, password: string) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),// Send the email and password in the request body as JSON
    })
    .then((res) => res.json()) // Parse the response as JSON
    .then((json) => setAccount(json.user || null)); // Update the account according to the response, if the login is successful, the user data will be returned and set in the account state, otherwise it will be set to null
  }, [])

  // Function to log out the user by calling the /api/auth/logout endpoint and setting the account state to null
  const logout = useCallback(() => {
    const res = fetch("/api/auth/logout", { 
      method: "POST" 
    }).then(() => setAccount(null));// After logging out, set the account state to null to reflect that the user is no longer authenticated
  }, [])

  return {
    account,
    status,
    authenticate,
    login,
    logout,
  }
}