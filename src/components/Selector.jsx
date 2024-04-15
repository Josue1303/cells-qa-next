//components/Selector.jsx
"use client";
import axios from "axios";
import React, { useState } from "react";

const Selector = ({ onInstructionsChange, onUrlChange }) => {
  const [instructions, setInstructions] = useState([]);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { textInput: "", searchKey: "", searchBy: "", action: "" },
    ]);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    onUrlChange(e.target.value);
  };

  const handleTextChange = (index, e) => {
    const newInstructions = [...instructions];
    newInstructions[index].textInput = e.target.value;
    setInstructions(newInstructions);
  };

  const handleSearchKeyChange = (index, e) => {
    const newInstructions = [...instructions];
    newInstructions[index].searchKey = e.target.value;
    setInstructions(newInstructions);
  };

  const handleSearchByChange = (index, e) => {
    const newInstructions = [...instructions];
    newInstructions[index].searchBy = e.target.value;
    setInstructions(newInstructions);
  };

  const handleActionChange = (index, e) => {
    const newInstructions = [...instructions];
    const selectedAction = e.target.value;

    if (selectedAction === "click") {
      // Si la acción seleccionada es "click", habilitar todos los campos excepto "Acción"
      newInstructions[index].action = selectedAction;
      newInstructions[index].textInput = "";
      newInstructions[index].searchKey = "";
      newInstructions[index].searchBy = "";
    } else if (selectedAction !== "") {
      // Si se selecciona cualquier otra acción, habilitar todos los campos
      newInstructions[index].action = selectedAction;
    } else {
      // Si no se ha seleccionado ninguna acción, deshabilitar todos los campos
      newInstructions[index].action = "";
      newInstructions[index].textInput = "";
      newInstructions[index].searchKey = "";
      newInstructions[index].searchBy = "";
    }

    setInstructions(newInstructions);
  };

  const handleInstructionsChange = () => {
    onInstructionsChange(instructions);
  };

  const removeInstruction = (index) => {
    const newInstructions = [...instructions];
    newInstructions.splice(index, 1);
    setInstructions(newInstructions);
  };

  const handleInstructionsAndTest = async () => {
    // Verificar si la URL está vacía
    if (url === "") {
      setError2("Por favor ingrese la URL.");
      return;
    }

    setError2("");

    if (instructions.length === 0) {
      setError("No hay instrucciones");
      return;
    }

    // Verificar si hay instrucciones incompletas
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];
      if (
        instruction.action === "click" &&
        (instruction.searchKey === "" || instruction.searchBy === "")
      ) {
        setError(
          `Por favor llene todos los campos para la instrucción ${i + 1}.`
        );
        return;
      } else if (
        (instruction.action === "sendKeys" ||
          instruction.action === "" ||
          instruction.action === "getText") &&
        (instruction.searchKey === "" ||
          instruction.searchBy === "" ||
          instruction.textInput === "")
      ) {
        setError(
          `Por favor llene todos los campos para la instrucción ${i + 1}.`
        );
        return;
      }
    }

    // Limpiar el mensaje de error
    setError("");

    // Envía las instrucciones y la URL al backend para ejecutar la automatización
    try {
      await axios.post("/api/run-test", { instructions, url });
      alert("Prueba completada con éxito.");
    } catch (error) {
      console.error("Error al ejecutar la prueba:", error);
      alert("Error al ejecutar la prueba.");
    }
    // Llama a la función de cambio de instrucciones para mantener la sincronización de datos
    onInstructionsChange(instructions);
  };

  return (
    <div>
      <h1>URL:</h1>
      <label htmlFor="urlInput">URL:</label>
      <input
        type="text"
        id="urlInput"
        value={url}
        onChange={handleUrlChange}
        placeholder="Ingrese la URL"
      />
      {error2 && <p style={{ color: "red" }}>{error2}</p>}
      <h1>Instrucciones:</h1>
      {instructions.map((instruction, index) => (
        <div key={index}>
          <h1>{index + 1}</h1>
          <h3>Acción:</h3>
          <select
            value={instruction.action}
            onChange={(e) => handleActionChange(index, e)}
          >
            <option value="">Seleccione una opción</option>
            <option value="sendKeys">Llenar campo</option>
            <option value="click">Click</option>
            <option value="getText">Comparar texto</option>
          </select>
          <h3>Valor:</h3>
          <input
            type="text"
            placeholder="Ingrese el texto"
            value={instruction.textInput}
            onChange={(e) => handleTextChange(index, e)}
            disabled={
              instruction.action === "click" || instruction.action === ""
            }
          />
          <h3>Clave de búsqueda:</h3>
          <input
            type="text"
            placeholder="Ingrese la clave"
            value={instruction.searchKey}
            onChange={(e) => handleSearchKeyChange(index, e)}
            disabled={instruction.action === ""}
          />
          <h3>Buscar por:</h3>
          <select
            value={instruction.searchBy}
            onChange={(e) => handleSearchByChange(index, e)}
            disabled={instruction.action === ""}
          >
            <option value="">Seleccione una opción</option>
            <option value="css">css</option>
            <option value="id">id</option>
            <option value="name">name</option>
          </select>
          <br />
          <button onClick={() => removeInstruction(index)}>Eliminar</button>
        </div>
      ))}

      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={addInstruction}>Agregar Instrucción</button>
      <button onClick={handleInstructionsAndTest}>Enviar Instrucciones</button>
    </div>
  );
};

export default Selector;
