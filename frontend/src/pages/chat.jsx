import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function Chat() {
  const [pregunta, setPregunta] = useState('');
  const [mensajes, setMensajes] = useState([]);
  const mensajesEndRef = useRef(null);

  const enviarPregunta = async () => {
    if (!pregunta.trim()) return;

    setMensajes(prev => [...prev, { tipo: 'user', texto: pregunta }]);

    try {
      const res = await axios.post('http://localhost:5000/api/chat', { pregunta });

      setMensajes(prev => [...prev, { tipo: 'bot', texto: res.data.respuesta }]);
    } catch (error) {
      console.error('Error del backend:', error.response?.data || error.message);
      setMensajes(prev => [...prev, {
        tipo: 'bot',
        texto: '⚠️ Error: ' + (error.response?.data?.error || 'No se pudo obtener respuesta')
      }]);
    }

    setPregunta('');
  };

  // Scroll automático al último mensaje
  useEffect(() => {
    mensajesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensajes]);

  return (
    <div className="flex flex-col h-screen bg-[#e5ddd5]">
      {/* Header tipo WhatsApp */}
      <div className="bg-green-500 text-white p-4 text-center font-bold shadow">
        Chat Bicentenario 🇧🇴
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {mensajes.map((msg, i) => (
          <div key={i} className={`flex ${msg.tipo === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-3 rounded-2xl text-sm shadow ${
              msg.tipo === 'user' 
                ? 'bg-green-400 text-white rounded-br-none'
                : 'bg-white text-gray-800 rounded-bl-none'
            }`}>
              {msg.texto}
            </div>
          </div>
        ))}
        <div ref={mensajesEndRef} />
      </div>

      {/* Input abajo */}
      <div className="p-3 flex gap-2 bg-white">
        <input
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && enviarPregunta()}
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Escribe un mensaje..."
        />
        <button
          onClick={enviarPregunta}
          className="bg-green-500 hover:bg-green-600 text-white p-2 px-4 rounded-full shadow"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}

export default Chat;
