"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);

    const ok = login(username, password);

    if (!ok) {
      setErr("Invalid username or password");
      return;
    }

    router.replace("/");
  }

  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          width: 360,
          padding: 24,
          borderRadius: 14,
          border: "1px solid rgba(255,255,255,0.15)",
        }}
      >
        <h1 style={{ fontSize: 22, fontWeight: 800, marginBottom: 18 }}>
          Login
        </h1>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 10,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 12,
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            background: "transparent",
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Sign In
        </button>

        {err && (
          <p style={{ marginTop: 10, color: "red", fontSize: 13 }}>{err}</p>
        )}

        <p style={{ marginTop: 14, opacity: 0.7, fontSize: 12 }}>
          Default: <b>admin</b> / <b>admin123</b>
        </p>
      </form>
    </main>
  );
}