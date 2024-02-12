"use client"
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3001'); // Replace with your server URL
function Index(){
  
      const [room, setRoom] = useState("");

      // Messages States
      const [message, setMessage] = useState("");
      const [messageReceived, setMessageReceived] = useState("");
    
      const joinRoom = () => {
        if (room !== "") {
          socket.emit("join_room", room);
        }
      };
    const id =socket.id
      const sendMessage = () => {
        socket.emit("send_message", { message, room , id});
      };
    
      useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageReceived(data.message);
        });
      }, [socket]);
    return (
        <div className="">
           
             <input
       
        default="preimporter"
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button onClick={joinRoom}> Join Room</button>
      {/* <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      /> */}
       <h1> Message:</h1>
       { messageReceived ? (
                       <span  className="block w-1/2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"> 
                    {/* <span  className={`block w-1/2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
             !messageReceived ? "hidden" : "inline"
           }`}> */}
                      {messageReceived}
                      </span>) : (<></>)

                      
}
<input className="ml-64 mt-32 block w-1/2 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />

      <button onClick={sendMessage} className='mt-12]'> Send Message</button>
     
     
        </div>
    )
}
export default Index;
