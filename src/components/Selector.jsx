//components/Selector.jsx
"use client";
import axios from "axios";
import React, { useState } from "react";

const Selector = ({ onInstructionsChange, onUrlChange }) => {
  const [instructions, setInstructions] = useState([
    { textInput: "", searchKey: "", searchBy: "", action: "" }, // Instrucción predeterminada
  ]);
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [error2, setError2] = useState("");
  const [instructionResults, setInstructionResults] = useState(["NP"]);

  const addInstruction = () => {
    setInstructions([
      ...instructions,
      { textInput: "", searchKey: "", searchBy: "", action: "" },
    ]);
    setInstructionResults([...instructionResults, "NP"]);
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

    const newInstructionsResult = [...instructionResults];
    newInstructionsResult.splice(index, 1);
    setInstructionResults(newInstructionsResult);
    console.log(newInstructionsResult);
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
      const response = await axios.post("/api/run-test", { instructions, url });
      const results = response.data.results;

      setInstructionResults(results);

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
      <div className="flex justify-end items-center py-5 mr-24">
        <label htmlFor="urlInput" className="mr-5">
          URL:
        </label>
        <input
          type="text"
          id="urlInput"
          value={url}
          onChange={handleUrlChange}
          placeholder="Ingrese la URL"
          className={
            url === "" && error2 != "" ? "input-error" : "input" + " px-5"
          }
        />
        {error2 && <p style={{ color: "red" }}>{error2}</p>}
      </div>

      <h2 className="my-5">Instrucciones:</h2>
      <div className="flex justify-center">
        <div className="bg-white rounded-md mx-10 w-full">
          <div className="flex mx-5 my-4">
            <h3>No.</h3>
            <div className="flex w-full">
              <h3 className="w-2/12 mx-4 bg-white">Acción</h3>
              <h3 className="w-2/12 mx-10 bg-white">Valor</h3>
              <h3 className="w-2/12 mx-4 bg-white">Clave de búsqueda</h3>
              <h3 className="w-2/12 mx-10 bg-white">Buscar por</h3>
            </div>
            <div>
              <h3 className="mx-3">Status</h3>
            </div>
          </div>
          {instructions.map((instruction, index) => (
            <div key={index} className="justify-between w-full my-5">
              <div className="flex justify-center">
                <div className="flex items-center w-full">
                  <h3 className="font-bold  mx-5">{index + 1}</h3>
                  <div className="px-3">
                    <select
                      value={instruction.action}
                      onChange={(e) => handleActionChange(index, e)}
                      className={
                        instruction.action === "" && error != ""
                          ? "input-error"
                          : "input"
                      }
                    >
                      <option value="">Seleccione una acción</option>
                      <option value="sendKeys">Llenar campo</option>
                      <option value="click">Click</option>
                      <option value="getText">Comparar texto</option>
                    </select>
                  </div>
                  <div
                    className="px-3"
                    style={{
                      display:
                        instruction.action === "click" ||
                        instruction.action === ""
                          ? "none"
                          : "block",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Ingrese el valor a probar"
                      value={instruction.textInput}
                      onChange={(e) => handleTextChange(index, e)}
                      className={
                        instruction.textInput === "" &&
                        error != "" &&
                        (instruction.action == "sendKeys" ||
                          instruction.action == "getText")
                          ? "input-error"
                          : "input "
                      }
                    />
                  </div>
                  <div
                    className="px-3"
                    style={{
                      display: instruction.action === "" ? "none" : "block",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Ingrese la clave de búsqueda"
                      value={instruction.searchKey}
                      onChange={(e) => handleSearchKeyChange(index, e)}
                      className={
                        instruction.searchKey === "" &&
                        error != "" &&
                        instruction.action != ""
                          ? "input-error"
                          : "input"
                      }
                    />
                  </div>
                  <div
                    className="px-3"
                    style={{
                      display: instruction.action === "" ? "none" : "block",
                    }}
                  >
                    <select
                      value={instruction.searchBy}
                      onChange={(e) => handleSearchByChange(index, e)}
                      className={
                        instruction.searchBy === "" &&
                        error != "" &&
                        instruction.action != ""
                          ? "input-error"
                          : "input"
                      }
                    >
                      <option value="">Seleccione una opción</option>
                      <option value="css">css</option>
                      <option value="id">id</option>
                      <option value="name">name</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center mr-5">
                  <button
                    onClick={() => removeInstruction(index)}
                    className="button-delete"
                  >
                    Eliminar
                  </button>
                </div>
                <div className="mx-5 flex items-center">
                  <div
                    className="px-2 text-center bg-green-500 rounded text-[#FFFFFF] w-20 items r"
                    style={{
                      display:
                        instructionResults[index] === "Passed"
                          ? "block"
                          : "none",
                    }}
                  >
                    Pasado
                  </div>
                  <div
                    className="px-2 text-center bg-red-500 rounded  text-[#FFFFFF] w-20"
                    style={{
                      display:
                        instructionResults[index] === "Failed"
                          ? "block"
                          : "none",
                    }}
                  >
                    Fallado
                  </div>
                  <div
                    className="px-2 text-center bg-gray-500 rounded  text-[#FFFFFF] w-20"
                    style={{
                      display:
                        instructionResults[index] === "NP" ? "block" : "none",
                    }}
                  >
                    NP
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={addInstruction} className="button mx-5">
        Agregar Instrucción
      </button>
      <button onClick={handleInstructionsAndTest} className="button-send mx-5">
        Enviar Instrucciones
      </button>
    </div>
  );
};

export default Selector;
