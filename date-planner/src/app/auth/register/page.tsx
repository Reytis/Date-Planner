"use client"

import { Button } from "@/components/Button";
import { StringInput, StringType } from "@/components/Inputs";
import { Label } from "@/components/Label";
import { AuthStatus, useAuth } from "@/hooks/useAuth";
import { redirect } from "next/navigation";
import { useState } from "react"

// Register page component that allows users to create a new account by providing their email and password.
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { status } = useAuth();

  // If the user is already authenticated, redirect them to the /me page
  if (status === AuthStatus.Authenticated) {
    redirect("/me");
  }
  
  async function submit() {
    try {
      await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
    redirect("/auth/login");
    } catch (err) {
      console.error("Registration error", err);
    }
  }

  return <div className="flex flex-col gap-8 w-md m-6">
    <h1 className="text-8xl font-bold font-mono">Register</h1>
    <div>
      <Label>Email</Label>
      <StringInput 
        placeholder="Email" 
        value={email} 
        onChange={(v) => setEmail(v)} 
        type={StringType.Email}
      />
    </div>
    <div>
      <Label>Name</Label>
      <StringInput 
        placeholder="Name"
        value={name}
        onChange={(v) => setName(v)}
        type={StringType.Text}
      />
    </div>
    <div>
      <Label>Password</Label>
      <StringInput
        placeholder="Password"
        value={password}
        onChange={(v) => setPassword(v)}
        type={StringType.Password}
      />
    </div>
    <Button onClick={submit}>Submit</Button>
  </div>
}