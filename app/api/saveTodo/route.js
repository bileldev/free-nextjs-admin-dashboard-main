import fs from "fs";
//import fsPromises from 'fs/promises';

import { NextResponse } from "next/server";
import path from "path";

export async function POST(req, res) {
  
    const { data } = await req.json();
  let todo = data;
    try {
      //const filePath = path.join(process.cwd(),  "data.json");
      const filePath = path.join(process.cwd(), "app", "api", "data", "data.json");
      //const filePath = path.join(process.cwd(), "app", "data.json");
     console.log("file path",filePath);
       let todos = [];
  
        const fileData = fs.readFileSync(filePath, "utf-8");

        todos = JSON.parse(fileData);
    
      await todos.push(todo);
      console.log("todos",todos)
      fs.writeFileSync(filePath, JSON.stringify(todos), "utf-8");


     
      return NextResponse.json({message: "Todo saved successfully."}, {status: 200});
    } catch (error) {
      return NextResponse.json({message: "Error saving todo."}, {status: 400});

    }
   
//   else {
//     // res.status(405).json({ message: "Method not allowed." });
//     return NextResponse.json({message: "Error saving todo."}, {status: 400});

//   }
}