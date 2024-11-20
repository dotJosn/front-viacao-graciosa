'use client';

import React, { useEffect, useState } from "react";
import purchasedTicketsData from "@/data/purchasedTickets.json"; // Dados das passagens compradas
import Header from "@/components/header"; // Seu componente de cabeçalho
import Link from "next/link";

const PurchasedTicketsPage = () => {
    const [purchasedTickets, setPurchasedTickets] = useState([]);

    useEffect(() => {
        // Simulando um carregamento de dados, aqui você pode fazer a chamada à API ou carregar os dados diretamente
        const fetchPurchasedTickets = async () => {
            await new Promise((resolve) => setTimeout(resolve, 500)); // Simulando um delay
            setPurchasedTickets(purchasedTicketsData); // Definindo os dados das passagens compradas
        };
        fetchPurchasedTickets();
    }, []);

    return (
        <>
            <Header />
            <div className="min-h-screen bg-white text-black px-8 py-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold text-black">Passagens Adquiridas</h1>
                    <Link href="/tickets">
                        <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
                        >
                            Voltar para Passagens Disponíveis
                        </button>
                    </Link>
                </div>

                {/* Verifica se há passagens adquiridas */}
                {purchasedTickets.length === 0 ? (
                    <p className="text-center text-lg text-gray-500">Você ainda não adquiriu nenhuma passagem.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {purchasedTickets.map((ticket) => (
                            <div
                                key={ticket.id}
                                className="bg-white rounded-lg shadow-lg hover:shadow-xl border border-gray-300 transition-shadow duration-200"
                            >
                                <div className="p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
                                    <h2 className="text-xl font-semibold mb-4 text-white">
                                        {ticket.origin} → {ticket.destination}
                                    </h2>
                                    <p className="text-gray-200 mb-2">
                                        <strong>Partida:</strong> {new Date(ticket.departure_time).toLocaleString("pt-BR")}
                                    </p>
                                    <p className="text-gray-200 mb-2">
                                        <strong>Preço:</strong> R$ {ticket.price.toFixed(2)}
                                    </p>
                                    <p className="text-gray-200 mb-2">
                                        <strong>Nome do Comprador:</strong> {ticket.customerName}
                                    </p>
                                    <p className="text-gray-200 mb-2">
                                        <strong>Assento:</strong> {ticket.seatNumber}
                                    </p>
                                    <p className="text-gray-200 mb-2">
                                        <strong>Data da Compra:</strong> {new Date(ticket.purchaseDate).toLocaleString("pt-BR")}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default PurchasedTicketsPage;
