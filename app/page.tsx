"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("./App"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="min-h-screen p-4">
      <App />
    </main>
  );
}
