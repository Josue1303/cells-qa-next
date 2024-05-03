// components/Sidebar.js
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="bg-white h-screen w-28 fixed left-0 top-0 overflow-y-auto">
      <div className="px-4 py-6">
        {/* Aquí puedes agregar el contenido de tu barra lateral */}
        <Image src="/img/logo.png" alt="logo" width={100} height={100} />
        <ul className="mt-6">
          <li className="px-2">
            <a
              href="/Pruebas"
              className="flex justify-center flex-row items-center py-2 rounded-lg text-[#24374B] text-[20px]  mb-0"
            >
              <div className="text-center">
                <i class="bi bi-grid"></i>
                <p className="text-[10px]">Dashboard</p>
              </div>
            </a>
          </li>
          <li className="px-2">
            <a
              href="/Pruebas"
              className="flex justify-center flex-row items-center py-2 rounded-lg text-white text-[20px]  bg-[#24374B]"
            >
              <div className="text-center">
                <i class="bi bi-send"></i>
                <p className="text-[10px]">Pruebas</p>
              </div>
            </a>
          </li>

          {/* Puedes agregar más elementos de la lista según tus necesidades */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
