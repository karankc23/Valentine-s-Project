import React, { useState, useEffect } from "react";
import { Page } from "./types";
import { getParamsFromUrl } from "./utils/url";
import FloatingHearts from "./components/FloatingHearts";
import ValentineForm from "./components/ValentineForm";
import ValentineInvite from "./components/ValentineInvite";
import Celebration from "./components/Celebration";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.FORM);
  const [recipient, setRecipient] = useState("");
  const [sender, setSender] = useState("");

  useEffect(() => {
    const handleUrlChange = () => {
      const { A, B } = getParamsFromUrl();
      if (A && B) {
        setRecipient(A);
        setSender(B);
        setCurrentPage(Page.INVITE);
      } else {
        // Only reset if we are not in success state
        setCurrentPage((prev) =>
          prev === Page.SUCCESS ? Page.SUCCESS : Page.FORM
        );
      }
    };

    window.addEventListener("hashchange", handleUrlChange);
    window.addEventListener("popstate", handleUrlChange);
    handleUrlChange(); // Initial check

    return () => {
      window.removeEventListener("hashchange", handleUrlChange);
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  const handleAccepted = () => {
    setCurrentPage(Page.SUCCESS);
  };

  return (
    <div className="min-h-screen bg-[#fff5f5] flex items-center justify-center relative overflow-hidden">
      <FloatingHearts />

      <main className="z-10 w-full flex items-center justify-center py-10 min-h-screen">
        {currentPage === Page.FORM && <ValentineForm />}

        {currentPage === Page.INVITE && (
          <ValentineInvite
            recipient={recipient}
            sender={sender}
            onAccept={handleAccepted}
          />
        )}

        {currentPage === Page.SUCCESS && (
          <Celebration recipient={recipient} sender={sender} />
        )}
      </main>

      {/* Decorative Hearts in corners */}
      <div className="fixed top-4 left-4 text-rose-200 opacity-20 pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <div className="fixed bottom-4 right-4 text-rose-200 opacity-20 pointer-events-none rotate-12">
        <svg width="150" height="150" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
    </div>
  );
};

export default App;
