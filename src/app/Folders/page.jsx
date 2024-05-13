//page.jsx
"use client";
import "../Folders/folView.css";

export default function Home() {
  const buscarFolders = () => {
    " ";
  };
  {
    // Implementa la función buscarFolders según tu lógica
  }
  const createFolder = () => {
    " ";
  };
  {
    // Implementa la función createFolder según tu lógica
  }
  const delFolder = () => {
    " ";
  };
  {
    // Implementa la función delFolder según tu lógica
  }
  const goTo = () => {
    " ";
  };
  {
    // Implementa la función goTo según tu lógica
  }
  const uploadFile = () => {
    " ";
  };
  {
    // Implementa la función uploadFile según tu lógica
  }
  return (
    <main className="min-h-screen p-20">
      <div className="backG">
        <h1>Projects</h1>
        <div className="row">
          <div className="search-container">
            <input
              type="text"
              className="input"
              id="searchInput"
              placeholder="Find a Project..."
              onInput={buscarFolders}
            />
            <span
              className="icon"
              onClick={buscarFolders}
              style={{ cursor: "pointer" }}
            >
              <i class="bi bi-search"></i>
            </span>
          </div>
          <button className="button !bg-green-500 !flex" onClick={createFolder}>
            <i class="bi bi-folder text-white mr-2"></i>
            <p>New</p>
          </button>
        </div>
        <div id="folders"></div>
        <div class="table-row">
          <div class="table-l">
            <h1 className="text-[#24374B] ">Identificador_cambios_python</h1>
            <div class="table-l-d">
              <p>Create: 27/03/23</p>
              <p>Modified: Last Week</p>
            </div>
          </div>
          <div class="table-r">
            <div class="table-r-l">
              <a class="button !bg-[#24374B]" href="/Pruebas">
                Acceder
              </a>
              <p>Versions: 5</p>
            </div>
            <div class="table-r-r">
              <i className="bi bi-trash3-fill text-gray-400 text-2xl "></i>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
