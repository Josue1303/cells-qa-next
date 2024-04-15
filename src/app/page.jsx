"use client";
import Selector from "@/components/Selector";
import TestButton from "@/components/TestButton";
import React, { useState } from "react";

export default function Home() {
  const [instructions, setInstructions] = useState([]);
  const [url, setUrl] = useState("");

  const handleInstructionsChange = (newInstructions) => {
    setInstructions(newInstructions);
  };

  const handleUrlChange = (newUrl) => {
    setUrl(newUrl);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Página Principal</h1>
        <Selector
          onInstructionsChange={handleInstructionsChange}
          onUrlChange={handleUrlChange}
        />
        <TestButton instructions={instructions} url={url} />
      </div>
    </main>
  );
}
