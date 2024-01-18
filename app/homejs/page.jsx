"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Link from "next/link";
import { Card, CardBody } from "@nextui-org/react";

import path from "path";
import axios from "axios";



function ServerDetails() {
  const filePathh = path.join(process.cwd(), "app", "api", "data", "data.json");
      console.log("file pathh",filePathh);
      const filePath = path.join(process.cwd(), "data.json");
      console.log("filePath",filePath);
  const deadline = 130000;
  /////////////
  let subject = "subject";
  
  const archiveCrashes = async()=>{
   const response = await axios.get("/api/data/data.json")
   console.log("archive",response);
  }
  const sendMail = async (data) => {
    const ids = data.id;
    let message = `${ids} risks of being crashed and has exceeded the deadline of ${deadline} seconds`;
    const response = await fetch("/api/sendEmail", {
      method: "POST",
      headers: {
        contentType: "application/json",
      },
      body: JSON.stringify({ subject, message }),
    });

  
        const saveResponse = await fetch("/api/saveTodo", {
          method: "POST",
          headers: {
            contentType: "application/json",
          },
          
          body: JSON.stringify({ data }),
        });
  
  };
  //////////////////
  const [todoSingle, setTodoSingle] = useState([]);
  const currentDate = new Date();

  //setTimeout(()=>{
  const getTodo = async () => {
    try {
      const promises = [];
      const todos = []; // Array to accumulate todo items

      for (let i = 1; i < 5; i++) {
        const randomHour = Math.floor(Math.random() * 24);
        const randomMinute = Math.floor(Math.random() * 60);
        const randomSecond = Math.floor(Math.random() * 60);
        const randomDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          currentDate.getDate(),
          randomHour,
          randomMinute,
          randomSecond
        );

        let promise = fetch(`https://dummyjson.com/todos/${i}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              console.error("Fetch failed");
              return null;
            }
          })
          .then((data) => {
            if (data) {
              data.createdAt = randomDate.toISOString();
             // data.createdAt = "2024-01-18T19:14:04.000Z"
              console.log(`data.created${data.id}`, data.createdAt);
              //const timeDifference =currentDate.getTime() -  data.createdAt.getTime();
              const timeDifference =  currentDate.getTime() - randomDate.getTime();
                
              data.lastGenerated = Math.floor(timeDifference / 1000);
              if (data.lastGenerated > deadline) {
                toast(`${data.id}`);
                sendMail(data);
              }
            }
            todos.push(data); // Accumulate todo items
           
            return data;
          })
          .catch((error) => {
            console.error("An error occurred", error);
            return null;
          });

        promises.push(promise);
      }

      // Wait for all promises to resolve
      const results = await Promise.all(promises);

      // Update the state with the accumulated todo items
      setTodoSingle(results.filter((result) => result !== null));
    } catch (error) {
      console.error("An error occurred", error);
    }
  };
  //2024-01-18T19:14:04.000Z
  useEffect(() => {
    // Call the getTodo function when the component mounts
    getTodo();
    archiveCrashes();
    const interval = setInterval(() => {
      window.location.reload();
    }, 60000); // Refresh every 10 seconds

    return () => clearInterval(interval);
   
  //}, [getTodo,archiveCrashes]); 
}, []); 
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = (index) => {
    setDropdownVisible((prevState) => {
      const newState = [prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };
  return (
    
      <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
        <div className="mt-6 gap-6 flex flex-col w-full">
          {/* Card Section Top */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">List of Servers</h3>
            <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
              {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4"> */}
              {/* <CardBalance3 /> */}
              {todoSingle.map((todo, index) => (
                <Link key={todo.id}  href={`/profile/${todo.id}`}>
                  <Card
                    key={index}
                    className={
                      todo.lastGenerated > deadline
                        ? "  xl:max-w-sm bg-red-600 rounded-xl shadow-md px-3 w-full animate-pulse animate-bounce"
                        : " xl:max-w-sm bg-[#18C964] rounded-xl shadow-md px-3 w-full  "
                    }
                  >
                    <CardBody className="py-5">
                      <div className="flex gap-2.5">
                        <div className="flex flex-col">
                          <span className="text-white">{todo.id}</span>
                        </div>
                      </div>
                      <div className="flex gap-2.5 py-2 items-center">
                        <span className="text-white text-xl font-semibold">
                          {todo.lastGenerated} seconds ago
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div>
                          <div>
                            <span className="text-white text-xs ">
                              Created At:
                            </span>
                          </div>
                        </div>

                        <div>
                          <div>
                            <span className="text-white text-xs">
                              {todo.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

         </div>
      </div>

  );
}

export default ServerDetails;
