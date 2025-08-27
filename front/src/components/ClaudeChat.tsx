"use client";

import { useState, useRef, useEffect } from 'react';

interface PresaData {
  nombre: string;
  isla: string;
  cuenca: string;
  barranco: string;
  cotaMuro: number;
  altura: number;
  capacidad: number;
  volumenMaximo: number;
  fuente: string;
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ClaudeChatProps {
  presasData: PresaData[];
}

const ClaudeChat: React.FC<ClaudeChatProps> = ({ presasData }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy tu asistente especializado en presas canarias. Puedo ayudarte con información sobre las 72 presas de Gran Canaria. ¿Qué te gustaría saber?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/claude', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputText,
          presasData: presasData
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const claudeMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, claudeMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu consulta. Por favor, asegúrate de que la API key de Claude esté configurada correctamente.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const exampleQuestions = [
    "¿Cuál es la presa más grande?",
    "¿Cuántas presas hay en total?",
    "¿Qué presas están en la cuenca del Guiniguada?",
    "¿Cuál es la capacidad total de todas las presas?"
  ];

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease',
            zIndex: 1000
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          🤖
        </button>
      )}

      {/* Ventana de chat */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '400px',
          height: '600px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1000,
          overflow: 'hidden'
        }}>
          {/* Header del chat */}
          <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '1.1rem' }}>🤖 Claude - Asistente de Presas</h3>
              <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.8 }}>
                Especialista en presas canarias
              </p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
                padding: '5px'
              }}
            >
              ×
            </button>
          </div>

          {/* Área de mensajes */}
          <div style={{
            flex: 1,
            padding: '20px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
          }}>
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  alignSelf: message.isUser ? 'flex-end' : 'flex-start',
                  maxWidth: '80%'
                }}
              >
                <div style={{
                  background: message.isUser 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#f1f3f4',
                  color: message.isUser ? 'white' : '#333',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  fontSize: '0.9rem',
                  lineHeight: '1.4',
                  whiteSpace: 'pre-wrap'
                }}>
                  {message.text}
                </div>
                <div style={{
                  fontSize: '0.7rem',
                  color: '#999',
                  marginTop: '5px',
                  textAlign: message.isUser ? 'right' : 'left'
                }}>
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
            ))}

            {isLoading && (
              <div style={{ alignSelf: 'flex-start' }}>
                <div style={{
                  background: '#f1f3f4',
                  padding: '12px 16px',
                  borderRadius: '18px',
                  color: '#666'
                }}>
                  Claude está escribiendo...
                </div>
              </div>
            )}

            {/* Preguntas de ejemplo */}
            {messages.length === 1 && (
              <div style={{ marginTop: '10px' }}>
                <p style={{ 
                  fontSize: '0.8rem', 
                  color: '#666', 
                  marginBottom: '10px',
                  textAlign: 'center'
                }}>
                  Preguntas de ejemplo:
                </p>
                {exampleQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => setInputText(question)}
                    style={{
                      display: 'block',
                      width: '100%',
                      background: '#f8f9fa',
                      border: '1px solid #e9ecef',
                      borderRadius: '8px',
                      padding: '8px 12px',
                      margin: '5px 0',
                      fontSize: '0.8rem',
                      color: '#495057',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e9ecef';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f8f9fa';
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={{
            padding: '15px 20px',
            borderTop: '1px solid #e1e5e9',
            display: 'flex',
            gap: '10px'
          }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Pregunta sobre las presas..."
              style={{
                flex: 1,
                padding: '10px 15px',
                border: '1px solid #e1e5e9',
                borderRadius: '20px',
                outline: 'none',
                fontSize: '0.9rem'
              }}
              disabled={isLoading}
            />
            <button
              onClick={sendMessage}
              disabled={!inputText.trim() || isLoading}
              style={{
                background: inputText.trim() && !isLoading 
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                  : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                width: '40px',
                height: '40px',
                cursor: inputText.trim() && !isLoading ? 'pointer' : 'not-allowed',
                fontSize: '16px'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ClaudeChat;
