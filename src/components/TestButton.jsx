// components/TestButton.jsx
"use client";
import axios from "axios";
import React from "react";

const TestButton = ({ instructions, url }) => {
  const handleTestButtonClick = async () => {
    try {
      await axios.post("/api/tests/run-test", { instructions, url }); // Pasar tanto las instrucciones como la URL al backend
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
