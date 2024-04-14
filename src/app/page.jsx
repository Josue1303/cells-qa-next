"use client";
import Selector from "@/components/Selector";
import React, { useState } from "react";
import TestButton from "../components/TestButton";

export default function Home() {
  const [testParameters, setTestParameters] = useState({});

  const handleTestParametersChange = (parameters) => {
    setTestParameters(parameters);
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <h1>Página Principal</h1>

        <Selector onTestParametersChange={handleTestParametersChange} />
        <TestButton testParameters={testParameters} />
      </div>
    </main>
  );
}
