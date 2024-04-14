import React from "react";
import TestButton from "../components/TestButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Página Principal</h1>
        <TestButton />
      </div>
    </main>
  );
}
