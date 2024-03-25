"use client";
import Navbar from "@/components/Navbar";
import { CurrentUserContextProvider } from "@/context/CurrentUserContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <CurrentUserContextProvider>
      <div className="px-5 max-sm:px-3">
        <Navbar />
        <main className="mt-20 2xl:mt-24">{children}</main>
      </div>
    </CurrentUserContextProvider>
  );
}
