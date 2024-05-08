// page.jsx
"use client";
import { useState, useEffect } from 'react';
import Header from "@/components/TopBar";
import axios from "axios";
import Modal from './Modal'; 

export default function Home() {
  const [teams, setTeams] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Definición de fetchUserTeams dentro del componente Home para asegurar su alcance
  const fetchUserTeams = async () => {
    try {
      const userId = 36;
      const response = await axios.get(`http://localhost:3005/api/teams/${userId}/teams`);
      console.log("Equipos del usuario:", response.data.teams);
      setTeams(response.data.teams);
    } catch (error) {
      console.error("Error al obtener los equipos del usuario:", error);
    }
  };

  useEffect(() => {
    fetchUserTeams();
  }, []);

  const handlePrev = () => {
    setStartIndex(Math.max(0, startIndex - 5));
  }

  const handleNext = () => {
    setStartIndex(Math.min(teams.length - 1, startIndex + 5));
  };

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <div className="flex-grow p-10">
        <h2 className="mb-12 ml-16">Menu</h2>

        <div className="relative flex items-center mb-4">
          {startIndex > 0 && (
            <button className="absolute left-0" onClick={handlePrev}><i className="bi bi-caret-left-fill"></i></button>
          )}
          <div className="grid grid-cols-3 gap-6 place-items-center w-full px-8">

            {teams.slice(startIndex, startIndex + 5).map((team, index) => (
              <div
                key={index}
                className="bg-white p-6 shadow-lg rounded-lg mb-8 flex flex-col justify-center items-center text-center"
                style={{ width: 363, height: 240 }}
              >
                <img style={{ marginBottom: '10px' }} src="/img/iconoTeam.svg" />
                <p className='font-bold text-xl'>{team.teamName}</p>
                <p className='text-sm text-gray-400'>Codigo: {team.code}</p>
              </div>
            ))}

            <div
              className="bg-white p-6 shadow-lg rounded-lg mb-8 flex justify-center items-center"
              style={{ width: 363, height: 240 }}
              onClick={() => setIsModalOpen(true)}
            >
              <img style={{ width: '25%', height: 'auto' }} src="/img/plus.svg" />
            </div>
          </div>
          {startIndex + 5 < teams.length && (
            <button className="absolute right-0" onClick={handleNext}><i className="bi bi-caret-right-fill"></i></button>
          )}
        </div>
      </div>

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} refreshTeams={fetchUserTeams} />}
    </main>
  );
}




/*
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
*/
