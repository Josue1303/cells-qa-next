//page.jsx
"use client";
import Selector from "@/components/Selector";
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
    <main className="min-h-screen p-20">
      <h1 className="">Test</h1>
      <Selector
        onInstructionsChange={handleInstructionsChange}
        onUrlChange={handleUrlChange}
      />
    </main>
  );
}
