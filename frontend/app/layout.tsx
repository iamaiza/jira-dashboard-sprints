"use client"

// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { GraphqlProvider } from "@/context/GraphqlProvider";
import { useEffect } from "react";
import cookie from "@/utils/cookie";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookie.get('token')
  const router = useRouter()
  useEffect(() => {
    if(!token) {
      router.push("/login")
    }
  }, [token]);

  return (
    <html lang="en">
      <head>
        <title>Dashboard</title>
        <link rel="icon" type="image/png" href="" />
      </head>
      <GraphqlProvider>
        <body className={inter.className}>{children}</body>
      </GraphqlProvider>
    </html>
  );
}
