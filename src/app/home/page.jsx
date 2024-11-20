import Header from "@/components/header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import Image from "next/image";
import { IoBag } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { IoPeople } from "react-icons/io5";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="ml-64 w-full">
          <div className="pt-16">
            <div className="flex content-center justify-center">
              <Image
                src="/images/onibus.png"
                alt="Imagem de um ônibus"
                width={500}
                height={200}
                className="rounded"
              />
              <div className="pl-2 grid gap-2 grid-cols-2 grid-rows-2 w-1/3">
                <Image
                  src="/images/bus1.png"
                  alt="Imagem de um ônibus"
                  width={300}
                  height={200}
                  className="rounded"
                />
                <Image
                  src="/images/onibus4.png"
                  alt="Imagem de um ônibus"
                  width={300}
                  height={200}
                  className="rounded"
                />
                <Image
                  src="/images/onibus2.png"
                  alt="Imagem de um ônibus"
                  width={300}
                  height={200}
                  className="rounded"
                />
                <Image
                  src="/images/onibus3.png"
                  alt="Imagem de um ônibus"
                  width={300}
                  height={200}
                  className="rounded"
                />
              </div>
            </div>
          </div>

          {/* Botões */}
          <div className="pt-16 flex justify-center">
            <div className="grid gap-2 grid-cols-4 grid-rows-2 w-3/5">
              <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
                <IoBag className="text-2xl text-white" />
                <Link href="/building" className="text-white text-lg">
                  Vagas Internas
                </Link>
              </ul>
              <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
                <CiHeart className="text-2xl text-white" />
                <a href="/building" className="text-white text-lg">
                  Parcerias
                </a>
              </ul>
              <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
                <FaBell className="text-2xl text-white" />
                <a href="/building" className="text-white text-lg">
                  Notificações
                </a>
              </ul>
              <ul className="flex items-center space-x-2 bg-graciosa p-2 rounded-lg group">
                <IoPeople className="text-2xl text-white" />
                <a href="/travel" className="text-white text-lg">
                  Viagem
                </a>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
