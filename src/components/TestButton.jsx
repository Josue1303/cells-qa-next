// components/TestButton.jsx
"use client";
import axios from "axios";
import React, { useState } from "react";

const TestButton = ({ testParameters }) => {
  const handleTestButtonClick = async () => {
    try {
      await axios.post("/api/run-test", testParameters);
      alert("Prueba completada con éxito.");
    } catch (error) {
      console.error("Error al ejecutar la prueba:", error);
      alert("Error al ejecutar la prueba.");
    }
  };

  return (
    <button onClick={handleTestButtonClick}>
      Ejecutar Automatización de Pruebas
    </button>
  );
};

export default TestButton;
