"use client"
import "./globals.css";
import { Inter } from "next/font/google";
import Login from "./login";
import { useState } from "react";
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user] = useState(true);

  return (
    <html lang="en">
      <body className={inter.className}>
          <main>
            {!user?<Login />:children}
            <Toaster position="bottom-center" richColors/>
          </main>
      </body>
    </html>
  );
}
