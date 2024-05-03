//page.jsx
"use client";

import Header from "@/components/TopBar";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header></Header>

      <div className="flex-grow p-10">
        <h2 className="mb-12 ml-16">Menu</h2> 
        <div className="grid grid-cols-3 gap-6 place-items-center">

          {Array.from({ length: 6 }, (_, i) => (
            <div
              key={i}
              className="bg-white p-6 shadow-lg rounded-lg mb-8 mr-6 "
              style={{ width: 363, height: 240 }}
            >
              Equipo de Trabajo {i + 1}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

/*
npm install --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
*/
