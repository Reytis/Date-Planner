"use client"

import { Button } from "@/components/Button";
import { StringInput, StringType } from "@/components/Inputs";
import { Label } from "@/components/Label";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useState } from "react"

// Login component that renders a login form and handles user authentication
export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, status } = useAuth();

  // If the user is already authenticated, redirect them to the /me page
  if (status === AuthStatus.Authenticated) {
    redirect("/me");
  }

  return <div className="flex flex-col gap-8 w-md m-6">
    <h1 className="text-8xl font-bold font-mono">Login</h1>
    <div>
      <Label>Email</Label>
      <StringInput
        type={StringType.Email}
        placeholder="Email"
        value={email}
        onChange={(v) => typeof v === "string" ? setEmail(v) : null}
      />
    </div>
    <div>
      <Label>Password</Label>
      <StringInput
        type={StringType.Password}
        placeholder="Password"
        value={password}
        onChange={(v) => typeof v === "string" ? setPassword(v) : null}
      />
    </div>
    <div>
      <Button onClick={() => login(email, password)}>Login</Button>
    </div>
  </div>
}