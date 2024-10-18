import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIP, setUserIP] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [countdown, setCountdown] = useState(4);
  const [countdownMessage, setCountdownMessage] = useState('');
  const messagesEndRef = useRef(null);
  const [inputValue, setInputValue] = useState('');

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleInput = () => {
    if (inputValue) {
      setMessages((prev) => [...prev, { text: inputValue, sender: 'user' }]);
      setInputValue('');
  
      setMessages((prev) => [
        ...prev,
        { text: 'Enter admin code:', sender: 'ai' },
      ]);
  
      startCountdown();
    }
  };

  const startCountdown = () => {
    let count = countdown;
    setCountdownMessage(`${count}s remaining..`);

    const countdownInterval = setInterval(() => {
      count--;
      if (count >= 0) {
        setCountdownMessage(`${count}s remaining..`);
      } else {
        clearInterval(countdownInterval);
        activateDefenseProtocol();
      }
    }, 1000);
  };

  const activateDefenseProtocol = () => {
    setMessages((prev) => [
      ...prev,
      { text: 'Activating defense protocol..', sender: 'ai' },
    ]);
    setCountdownMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'Locating user..', sender: 'ai' },
      ]);
      fetchUserIP();
    }, 2000);
  };

  const fetchUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setUserIP(data.ip);
      fetchUserLocation(data.ip);
    } catch (error) {
      console.error('Error fetching IP:', error);
    }
  };

  const fetchUserLocation = async (ip) => {
    try {
      const response = await fetch(`http://ip-api.com/json/${ip}`);
      const data = await response.json();
      setUserLocation(`${data.city}, ${data.region}, ${data.country}`);
      setTimeout(() => {
        setIsModalOpen(true);
      }, 2000);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  
  const modalStyles = {
    content: {
      position: 'relative',
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      transform: 'translate(-50%, -50%)',
      backgroundImage: "url('/b.webp')", 
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      padding: '20px',
      maxWidth: '90%',
      width: '400px',
      borderRadius: '0',
      border: 'none',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 50,
    },
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-black text-white p-4 rounded-full shadow-lg focus:outline-none flex items-center justify-center"
        >
          <MessageCircle size={26} />
        </button>
      )}

      {isOpen && (
        <div className="mt-2 w-72 bg-white shadow-lg rounded-lg p-5">
          <div className="flex justify-between items-center">
            <div className='flex justify-center items-center space-x-2'>
                <div className="font-mono text-lg">GOVAI</div>
            </div>
            <button onClick={closeChat} className="text-gray-600 hover:text-red-500 text-lg">
              X
            </button>
          </div>
          <div className="mt-2 overflow-y-auto">
            <p className="text-sm">PROMPT ME.</p>
          </div>
          <div className="my-2 overflow-y-auto h-50 md:h-70">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                <div
                  className={`p-2 rounded-lg text-sm ${
                    msg.sender === 'user' ? 'bg-black text-white' : 'bg-gray-200 text-black'
                  }`}
                >
                  <strong>{msg.sender === 'user' ? 'You' : 'GOVAI'}:</strong> {msg.text}
                </div>
              </div>
            ))}
            {countdownMessage && (
              <div className="flex justify-start mb-2">
                <div className="p-2 rounded-lg text-sm bg-gray-200 text-black text-left">
                  <strong>GOVAI:</strong> {countdownMessage}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="flex mt-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleInput()}
              placeholder="Type your message..."
              className="w-full border rounded p-2 text-sm outline-black"
            />
            <button
              onClick={handleInput}
              className="ml-2 bg-black text-white px-3 py-2 rounded"
            >
              Send
            </button>
            </div>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Warning Modal"
        style={modalStyles}
      >
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-lg font-bold">AGENTS EN ROUTE</h2>
          <p className="mt-2">User IP Address: {userIP}</p>
          <p className="mt-2">User Location: {userLocation}</p>
          <button onClick={closeModal} className="mt-4 bg-white text-black p-2">
            Ignore
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;