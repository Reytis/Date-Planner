"use client"

import { Button } from "@/components/Button";
import { InputText } from "@/components/InputText";
import { Label } from "@/components/Label";
import { useState } from "react"

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit() {
    await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    alert("User created")
  }

  return <div className="
    flex
    flex-col
    gap-8
    w-md
    m-6
    ">
    <h1 className="text-8xl font-bold font-mono">Register</h1>
    <div>
      <Label>Email</Label>
      <InputText 
        type="email"
        placeholder="Email"
        value={email}
        onChange={setEmail}
      />
    </div>
    <div>
      <Label>Password</Label>
      <InputText 
        type="password"
        placeholder="Password"
        value={password}
        onChange={setPassword}
      />
    </div>
    <Button onClick={submit}>Submit</Button>
  </div>
}