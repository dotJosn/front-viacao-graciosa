import Header from "@/components/header";
import React from "react";

const Home = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
        <main className="flex-grow flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to the Intranet
          </h2>
          <p className="text-gray-700 mb-8 text-center">
            This is the central hub for all internal communications and
            resources.
          </p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Get Started
          </button>
        </main>
      </div>
    </>
  );
};

export default Home;
