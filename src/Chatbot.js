import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react'; // Import the chat icon from Lucide
import Modal from 'react-modal'; // Import Modal for displaying IP address and warning

// Set up the modal styles
Modal.setAppElement('#root'); // Ensure you set the app element for accessibility

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userIP, setUserIP] = useState('');
  const [userLocation, setUserLocation] = useState('');
  const [countdown, setCountdown] = useState(4);
  const [countdownMessage, setCountdownMessage] = useState(''); // State for countdown message
  const messagesEndRef = useRef(null); // Reference for the messages container

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleInput = (event) => {
    const userInput = event.target.value;
    if (userInput) {
      // Add user message to the chat
      setMessages((prev) => [...prev, { text: userInput, sender: 'user' }]);
      event.target.value = ''; // Clear input

      // Respond with the AI messages
      setMessages((prev) => [
        ...prev,
        { text: 'Enter admin code:', sender: 'ai' },
      ]);

      // Start the countdown
      startCountdown();
    }
  };

  const startCountdown = () => {
    let count = countdown;
    setCountdownMessage(`${count}s remaining..`); // Set initial countdown message

    const countdownInterval = setInterval(() => {
      count--;
      if (count >= 0) {
        setCountdownMessage(`${count}s remaining..`); // Update countdown message
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
    setCountdownMessage(''); // Clear countdown message

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: 'Locating user..', sender: 'ai' },
      ]);
      fetchUserIP(); // Fetch user IP address
    }, 2000);
  };

  const fetchUserIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      setUserIP(data.ip);
      fetchUserLocation(data.ip); // Fetch user location based on IP
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

  // Scroll to the bottom whenever messages change
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
      backgroundImage: "url('/b.webp')", // Background image
      backgroundSize: 'cover', // Ensure the image covers the entire modal
      backgroundPosition: 'center', // Center the image
      color: 'white', // Change text color for better contrast
      padding: '20px', // Add padding for spacing
      maxWidth: '90%', // Ensure it doesn't overflow the viewport
      width: '400px', // Set a specific width for the modal
      borderRadius: '0', // Remove rounded corners
      border: 'none', // Remove border
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
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
          <MessageCircle size={26} /> {/* Lucide chat icon */}
        </button>
      )}

      {isOpen && (
        <div className="mt-2 w-72 bg-white shadow-lg rounded-lg p-5"> {/* Slightly larger width and padding */}
          <div className="flex justify-between items-center">
            <div className='flex justify-center items-center space-x-2'>
                <div className="font-mono text-lg">GOVAI</div>
                <div className='flex justify-center items-center z-10'>
                  <a href="https://x.com/i/communities/1846367350280339598" className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-4 md:size-6 md:hover:scale-105 transition ease-in-out duration-150' fill="#00000" viewBox="0 0 50 50">
                      <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
                    </svg>
                  </a>
                  <a href="https://t.me/+MdDumaNLRblhY2U6" className=''>
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-4 md:size-6 md:hover:scale-105 transition ease-in-out duration-150' fill="#29A0DA" viewBox="0 0 50 50">
                      <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
                    </svg>
                  </a>
                </div>
            </div>
            <button onClick={closeChat} className="text-gray-600 hover:text-red-500 text-lg">
              X
            </button>
          </div>
          <div className="mt-2 overflow-y-auto">
            <p className="text-sm">PROMPT ME.</p> {/* Slightly larger text */}
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
            {countdownMessage && ( // Render the countdown message
              <div className="flex justify-start mb-2">
                <div className="p-2 rounded-lg text-sm bg-gray-200 text-black text-left">
                  <strong>GOVAI:</strong> {countdownMessage}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Empty div for scrolling */}
          </div>
          <div className="flex mt-2">
            <input
                type="text"
                onKeyDown={(e) => e.key === 'Enter' && handleInput(e)}
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

      {/* Modal for displaying user IP and warning */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Warning Modal"
        style={modalStyles} // Apply the custom styles here
      >
        <div className="flex flex-col items-center justify-center"> {/* Center content */}
          <h2 className="text-lg font-bold">AGENTS EN ROUTE</h2>
          <p className="mt-2">User IP Address: {userIP}</p>
          <p className="mt-2">User Location: {userLocation}</p> {/* Display user location */}
          <button onClick={closeModal} className="mt-4 bg-white text-black p-2">
            Ignore
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Chatbot;