// components/TestButton.jsx
"use client";
import axios from "axios";
import React, { useState } from "react";

const TestButton = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleTestButtonClick = async () => {
    console.log("TILIN");
    console.log("Email:", email);
    console.log("Password:", password);
    try {
      await axios.post("/api/run-test", {
        email: email,
        password: password,
      }); // Enviar email y password al backend
      alert("Prueba completada con éxito.");
    } catch (error) {
      console.error("Error al ejecutar la prueba:", error);
      alert("Error al ejecutar la prueba.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleTestButtonClick}>
        Ejecutar Automatización de Pruebas
      </button>
    </div>
  );
};

export default TestButton;
