"use client"

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

  return <div>
    <h1>Register</h1>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={submit}>Register</button>
  </div>
}