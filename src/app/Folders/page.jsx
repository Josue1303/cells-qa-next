//page.jsx
"use client";
import "../Folders/folView.css";
import React, { useState, useEffect } from 'react';
import axios from "axios";

function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { timeZone: 'UTC', year: 'numeric', month: 'numeric', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export default function Home() {
  const [directories, setDirectories] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedDirectoryId, setSelectedDirectoryId] = useState(null);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3005/api/projects/dfather/1');
                setDirectories(response.data); 
            } catch (error) {
                setError(error.message);
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
  }, []);
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
  const handleDelete = async () => {
    try {
      console.log("Deleting directory ID:", selectedDirectoryId); // Debug: Ensure this is the correct ID
      const url = `http://localhost:3005/api/projects/deleteDirectory/${selectedDirectoryId}`;
      await axios.delete(url);
      setDirectories(directories => directories.filter(d => d.directoryId !== selectedDirectoryId));
      closeModal();
    } catch (error) {
      console.error('Error deleting directory:', error);
    }
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
  const openModal = (directoryId) => {
    console.log("Opening modal for directory ID:", directoryId);  // Debug: Check what you are actually getting here
    setSelectedDirectoryId(directoryId);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  
  
  return (
    <main className="min-h-screen p-20" style={{ backgroundColor: '#FFFFFF' }}>
      
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
        {directories.map((directory, index) => (
          
          <React.Fragment key={index}>
              <div id={`folder-${index}`}>
                  
              </div>
              <div className="table-row">
                  <div className="table-l">
                      <h1 className="text-[#24374B]">{directory.directoryName}</h1>
                      <div className="table-l-d">
                          <p>Create: {formatDate(directory.dateCreated)}</p>
                          <p>Modified: </p> 
                      </div>
                  </div>
                  <div className="table-r">
                      <div className="table-r-l">
                          <a className="button !bg-[#24374B]" href="/Pruebas">Acceder</a>
                          <p>Versions: {directory.versions || 0}</p>
                      </div>
                      <div className="table-r-r">
                      <i className="bi bi-trash3-fill text-gray-400 text-2xl" onClick={() => openModal(directory.directoryId)}></i>
                      </div>
                  </div>
              </div>
          </React.Fragment>
      ))}
      </div>
      {modalIsOpen && (
        <div className="modal">
          <div className="modal-content ">
            <h2 className="font-bold text-xl" style={{ color: '#24374B' }} >You want to delete this directory?</h2>
            <div className="button-container">
              <button className="bg-[#E92525] text-white p-2 rounded-lg mt-5 px-10" onClick={handleDelete}>Delete</button>
              <button className="bg-[#768396] text-white p-2 rounded-lg mt-5 px-10" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
