"use client";
import React, { useState } from "react";

const Selector = ({ onInstructionsChange }) => {
  const [instructions, setInstructions] = useState([]);

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { textInput: "", searchKey: "", searchBy: "", action: "" },
    ]);
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
    newInstructions[index].action = e.target.value;
    setInstructions(newInstructions);
  };

  const handleInstructionsChange = () => {
    onInstructionsChange(instructions);
  };

  return (
    <div>
      <h1>Instrucciones:</h1>
      {instructions.map((instruction, index) => (
        <div key={index}>
          <h3>Valor:</h3>
          <input
            type="text"
            placeholder="Ingrese el texto"
            value={instruction.textInput}
            onChange={(e) => handleTextChange(index, e)}
          />
          <h3>Clave de búsqueda:</h3>
          <input
            type="text"
            placeholder="Ingrese la clave"
            value={instruction.searchKey}
            onChange={(e) => handleSearchKeyChange(index, e)}
          />
          <h3>Buscar por:</h3>
          <select
            value={instruction.searchBy}
            onChange={(e) => handleSearchByChange(index, e)}
          >
            <option value="">Seleccione una opción</option>
            <option value="css">css</option>
            <option value="id">id</option>
            <option value="name">name</option>
          </select>
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
        </div>
      ))}
      <button onClick={addInstruction}>Agregar Instrucción</button>
      <button onClick={handleInstructionsChange}>Enviar Instrucciones</button>
    </div>
  );
};

export default Selector;
