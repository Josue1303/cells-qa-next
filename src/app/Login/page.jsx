//page.jsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };
  return (
    <main className="min-h-screen p-20">
      <div className="flex justify-center">
        <Image
          src="/img/logoxl.png"
          alt="Logo xl"
          width={500}
          height={500}
        ></Image>
        <div className="w-1/3 flex items-center">
          <svg
            width="500"
            height="500"
            viewBox="0 0 661 661"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -z-10 -ml-5"
          >
            <path
              d="M661 330.5C661 513.03 513.03 661 330.5 661C147.97 661 0 513.03 0 330.5C0 147.97 147.97 0 330.5 0C513.03 0 661 147.97 661 330.5Z"
              fill="#BEE9E6"
            />
          </svg>

          <div className="bg-white w-full inline-flex items-center justify-center p-10 h-10/12 rounded-md shadow-md">
            <div className="w-full">
              <input
                type="text"
                placeholder="Username or email"
                className="input !w-full mb-8 "
              />
              <div className="display relative flex justify-center items-center">
                <input
                  type={`${mostrarPassword ? "text" : "password"}`}
                  placeholder="Password"
                  className="input !w-full mb-8"
                />
                <i
                  className={`absolute flex justify-end text-[25px] mb-7 ml-80 cursor-pointer ${
                    mostrarPassword ? "bi bi-eye-slash" : "bi bi-eye"
                  }`}
                  onClick={toggleMostrarPassword}
                ></i>
              </div>

              <div className="button !bg-[#6CA6B2] !px-8 flex justify-center mb-3">
                Login
              </div>
              <div className="flex items-center mb-3">
                <hr className="border-solid border-[#232360] w-1/2" />
                <h3 className="p-2">OR</h3>
                <hr className="border-solid border-[#232360] w-1/2" />
              </div>

              <a
                href="/Register"
                className="button !bg-[#24374B] !px-8 flex justify-center mb-3"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
