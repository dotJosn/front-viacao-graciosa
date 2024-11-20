"use client";
import React, { useEffect, useState } from "react";
import ticketsData from "@/data/tickets.json";
import purchasedTicketsData from "@/data/purchasedTickets.json"; // Arquivo JSON para passagens adquiridas
import Header from "@/components/header";
import Link from "next/link";

const TicketsPage = () => {
  const [tickets, setTickets] = useState([]);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [customerName, setCustomerName] = useState(""); // Estado para armazenar o nome do cliente
  const [seatNumber, setSeatNumber] = useState(""); // Estado para armazenar o número do assento
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setTickets(ticketsData);
      setPurchasedTickets(purchasedTicketsData); // Carregar as passagens adquiridas
    };
    fetchTickets();
  }, []);

  const formatDate = (isoDate) => {
    return new Date(isoDate).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleBuyTicket = (ticket) => {
    setSelectedTicket(ticket);
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!customerName || !seatNumber) {
      alert("Por favor, insira seu nome e selecione um número de assento.");
      return;
    }

    const newPurchase = {
      ...selectedTicket,
      customerName,
      seatNumber,
      purchaseDate: new Date().toISOString(), // Adiciona a data da compra
    };

    try {
      const response = await fetch("/api/purchasedTickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket: selectedTicket,
          customerName,
          seatNumber,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Compra confirmada para o ticket de ${selectedTicket.origin} → ${selectedTicket.destination} para o cliente: ${customerName}`);
        
        // Fechar modal e limpar campos
        setShowConfirmModal(false);
        setCustomerName(""); // Limpar nome do cliente após a compra
        setSeatNumber(""); // Limpar número do assento após a compra
      } else {
        throw new Error("Erro ao salvar a compra.");
      }
    } catch (error) {
      console.error(error);
      alert("Houve um erro ao tentar salvar a compra.");
    }
  };

  const handleCancelPurchase = () => {
    setShowConfirmModal(false);
  };

  const filteredTickets = tickets.filter((ticket) =>
    ticket.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-black px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-black">Passagens Disponíveis</h1>
          <Link href="/home">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors">
              Voltar para Página Inicial
            </button>
          </Link>
        </div>

        {/* Barra de Pesquisa */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Buscar por origem ou destino..."
            className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Exibição das Passagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTickets.map((ticket) => (
            <div
              key={ticket.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl border border-gray-300 transition-shadow duration-200"
            >
              <div className="p-6 bg-gray-800 rounded-lg shadow-sm border border-gray-700">
                <h2 className="text-xl font-semibold mb-4 text-white">
                  {ticket.origin} → {ticket.destination}
                </h2>
                <p className="text-gray-200 mb-2">
                  <strong>Partida:</strong> {formatDate(ticket.departure_time)}
                </p>
                <p className="text-gray-200 mb-2">
                  <strong>Preço:</strong> R$ {ticket.price.toFixed(2)}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg"
                    onClick={() => handleBuyTicket(ticket)}
                  >
                    Comprar Passagem
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botão para acessar Passagens Compradas */}
        <div className="mt-8">
          <Link href="/purchasedTickets">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded transition-colors">
              Ver Passagens Compradas
            </button>
          </Link>
        </div>
      </div>

      {/* Modal de Confirmação */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Confirmar Compra</h2>
            <p>
              Você tem certeza que deseja comprar a passagem de{" "}
              <strong>{selectedTicket.origin} → {selectedTicket.destination}</strong>?
            </p>
            {/* Formulário de nome do cliente e número do assento */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Seu Nome</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Insira seu nome"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Número do Assento</label>
              <input
                type="text"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md"
                placeholder="Insira o número do assento"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-between mt-6">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={handleCancelPurchase}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={handleConfirmPurchase}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TicketsPage;
