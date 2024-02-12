"use client"
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

const socket = io('http://localhost:3001'); // Replace with your server URL

const Index = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Listen for incoming messages
    socket.on('chat message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const sendMessage = () => {
    socket.emit('chat message', newMessage);
    setNewMessage('');
  };

  return (
    

    <div>
      <Breadcrumb pageName="chat" />
      <h1>Real-Time Chat</h1>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      <Breadcrumb/>
    </div>
   
  );
};

export default Index;