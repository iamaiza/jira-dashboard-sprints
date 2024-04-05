"use client";
import Navbar from "@/components/Navbar";
import { CurrentUserContextProvider } from "@/context/CurrentUserContext";
import { useState } from "react";
import CreateIssueModal from "@/components/Create-Issue"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showModal, setShowModal] = useState(false);
  return (
    <CurrentUserContextProvider>
      <div className="px-5 max-sm:px-3">
        {showModal && (
          <>
            <div className="backdrop" onClick={() => setShowModal(false)} />
            <CreateIssueModal setShowModal={setShowModal} />
          </>
        )}
        <Navbar setShowModal={setShowModal} />
        <main className="mt-20 2xl:mt-24">{children}</main>
      </div>
    </CurrentUserContextProvider>
  );
}
