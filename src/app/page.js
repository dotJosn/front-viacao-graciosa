// pages/login.js
import React from 'react';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-700">
      <div className="flex w-full max-w-4xl bg-white rounded shadow-md">
        <div className="hidden md:block w-1/2 relative h-96">
          <Image
            src="/images/bus-login-page.png"
            alt="Descrição da imagem"
            layout="fill"
            objectFit="cover"
            className="rounded-l-md"
          />
        </div>

        <div className="w-full md:w-1/2 p-8 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Login
          </h2>
          <form className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Digite seu e-mail:
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-3 py-2 mt-1 text-black border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Digite sua senha:
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full px-3 py-2 mt-1 text-black border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-lime-700 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
          <p className="text-sm text-center text-gray-600">
            Não possui uma conta? <a href="#" className="text-blue-500 hover:underline">Criar conta</a>
          </p>
        </div>
      </div>
    </div>
  );
}
