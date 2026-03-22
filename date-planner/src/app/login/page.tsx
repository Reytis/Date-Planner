"use client"

import { useState } from "react"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    console.log(res);

    if (res.ok) {
      window.location.href = "/dashboard"; // Redirect to dashboard after succesful login
    } else {
      alert("Invalid credentials");
    }
  }

  return <div>
    <h1>Login</h1>
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
    <button onClick={login}>Login</button>
  </div>
}