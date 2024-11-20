"use client";
"use client";
import Header from "@/components/header";
import { useState } from "react";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("sender");

  const sendMessage = () => {
    if (input.trim()) {
      const sender = mode === "sender" ? "You" : "Bot";
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: input, sender },
      ]);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <main className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs sm:max-w-md md:max-w-lg ${
                  msg.sender === "You"
                    ? "bg-graciosa text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index === 0 || messages[index - 1].sender !== msg.sender ? (
                  <p className="text-xs text-white-500 mb-1">{msg.sender === "You" ? "Você" : "Bot"}</p>
                ) : null}
                <div>{msg.text}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="flex items-center gap-2 p-4 bg-white shadow-md sm:px-6 md:px-8">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring focus:ring-graciosa focus:ring-opacity-80"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-graciosa text-white rounded-full hover:brightness-90"
        >
          Enviar
        </button>
      </footer>
      <div className="absolute bottom-20 right-4">
        <button
          onClick={() => setMode((prevMode) => (prevMode === "sender" ? "receiver" : "sender"))}
          className="p-2 bg-gray-300 text-black rounded-full hover:bg-gray-400"
        >
          Switch to {mode === "sender" ? "Receiver" : "Sender"}
        </button>
      </div>
    </div>
  );
}
