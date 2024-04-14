"use client";
import React, { useState } from "react";

const Selector = ({ onTestParametersChange }) => {
  const [textInput, setTextInput] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const [action, setAction] = useState("");

  const handleTextChange = (e) => {
    setTextInput(e.target.value);
  };

  const handleSearchKeyChange = (e) => {
    setSearchKey(e.target.value);
  };

  const handleSearchByChange = (e) => {
    setSearchBy(e.target.value);
  };

  const handleActionChange = (e) => {
    setAction(e.target.value);
  };

  const handleTestParametersChange = () => {
    onTestParametersChange({ textInput, searchKey, searchBy, action });
    console.log(textInput, searchKey, searchBy, action);
  };

  return (
    <div>
      <h3>Valor:</h3>
      <input
        type="text"
        placeholder="Ingrese el texto"
        value={textInput}
        onChange={handleTextChange}
      />

      <h3>Clave de búsqueda:</h3>
      <input
        type="text"
        placeholder="Ingrese la clave"
        value={searchKey}
        onChange={handleSearchKeyChange}
      />
      <br />

      <h3>Buscar por:</h3>
      <select value={searchBy} onChange={handleSearchByChange}>
        <option value="">Seleccione una opción</option>
        <option value="css">css</option>
        <option value="id">id</option>
        <option value="name">name</option>
      </select>
      <br />

      <h3>Acción:</h3>
      <select value={action} onChange={handleActionChange}>
        <option value="">Seleccione una opción</option>
        <option value="sendKeys">Llenar campo</option>
        <option value="click">Click</option>
        <option value="getText">Comparar texto</option>
      </select>

      <br />
      <button onClick={handleTestParametersChange}>Enviar Parámetros</button>
    </div>
  );
};

export default Selector;
