"use client";
import { Inter } from "next/font/google";
import Login from "./login";
import { getSession } from "@/lib/utils";
import { useState } from "react";
import Dashboard from "./dashboard";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [user] = useState(getSession("user"));

  if (!user) {
    return (
      <main>
        <Login />
      </main>
    );
  }
  return (
    <main>
      <Dashboard />
    </main>
  );
}
