//page.jsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const toggleMostrarPassword = () => {
    setMostrarPassword(!mostrarPassword);
  };

  const [mostrarPassword2, setMostrarPassword2] = useState(false);

  const toggleMostrarPassword2 = () => {
    setMostrarPassword2(!mostrarPassword2);
  };

  return (
    <main className="min-h-screen p-20">
      <div className="flex justify-center">
        <div className="w-1/3 flex items-center">
          <svg
            width="600"
            height="600"
            viewBox="0 0 661 661"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -z-10 "
            style={{ marginLeft: -75 }}
          >
            <path
              d="M661 330.5C661 513.03 513.03 661 330.5 661C147.97 661 0 513.03 0 330.5C0 147.97 147.97 0 330.5 0C513.03 0 661 147.97 661 330.5Z"
              fill="#BEE9E6"
            />
          </svg>

          <div className="bg-white w-full inline-flex items-center justify-center p-10 h-10/12 rounded-md shadow-md">
            <div className="w-full">
              <div className="flex justify-end">
                <a href="/Login" className="p-0 -mb-5">
                  <i class="bi bi-x text-[35px] "></i>
                </a>
              </div>
              <div className="flex justify-center">
                <Image
                  src="/img/logoxl.png"
                  alt="Logo xl"
                  width={180}
                  height={180}
                  className="flex justify-center -mb-5 -mt-16"
                ></Image>
              </div>

              <input
                type="text"
                placeholder="Username"
                className="input !w-full mb-8 "
              />
              <input
                type="text"
                placeholder="Email"
                className="input !w-full mb-8"
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
              <div className="display relative flex justify-center items-center">
                <input
                  type={`${mostrarPassword2 ? "text" : "password"}`}
                  placeholder="Confirm password"
                  className="input !w-full mb-8"
                />
                <i
                  className={`absolute flex justify-end text-[25px] mb-7 ml-80 cursor-pointer ${
                    mostrarPassword2 ? "bi bi-eye-slash" : "bi bi-eye"
                  }`}
                  onClick={toggleMostrarPassword2}
                ></i>
              </div>

              <a
                href="Register"
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
