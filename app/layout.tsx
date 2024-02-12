"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect, useLayoutEffect } from "react";
import Loader from "@/components/common/Loader";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { useRouter } from 'next/navigation'
//import { useHistory } from "react-router-dom";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter()
  //const history = useHistory();
const [token, setToken] = useState<string>("");
const [open, setOpen] = useState<boolean>(false)
/*useLayoutEffect(() => {const authToken =  localStorage.getItem("sb-lrhdvheujetlbrjileul-auth-token") || "";
 setToken(authToken)},[token])
//setToken(localStorage.getItem("sb-lrhdvheujetlbrjileul-auth-token"))})

useLayoutEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  //  const authToken = localStorage.getItem("sb-lrhdvheujetlbrjileul-auth-token") || "";
  //  setToken(authToken)
   // If the token is not found, redirect to "/auth/signin"
   //if (!authToken) {
    if (token) {
      console.log("token mawjod")
    //router.push("/auth/signin");
   } else {
    console.log("token mahouch mawjod");
    router.push("/auth/signin");
   // setTimeout(() => setLoading(false), 1000);
    //setOpen(true);
    //setTimeout(() => setOpen(true), 10);
   }
  }, [token]);
*/
useEffect(() => {
  // Retrieve the token from local storage
  const authToken = localStorage.getItem("sb-lrhdvheujetlbrjileul-auth-token") || "";

  // If the token is not found, redirect to "/auth/signin"
  if (!authToken) {
    //router.push("/auth/signin");
    setTimeout(() => setLoading(false), 1000);

  } else {
    // If the token is found, setLoading(false) after 1000ms
    setTimeout(() => setLoading(false), 1000);
  }
}, [router]);
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              {/* <!-- ===== Sidebar Start ===== --> */}
              <Sidebar
             sidebarOpen={sidebarOpen}
             setSidebarOpen={setSidebarOpen}
          />
          
              {/* { open ? (
               <Sidebar
               sidebarOpen={sidebarOpen}
               setSidebarOpen={setSidebarOpen}
             />
             ) :  (<><h1>token doesn't exist</h1></>)
              } */}
              {/* <!-- ===== Sidebar End ===== --> */}

              {/* <!-- ===== Content Area Start ===== --> */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* <!-- ===== Header Start ===== --> */}
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* <!-- ===== Header End ===== --> */}

                {/* <!-- ===== Main Content Start ===== --> */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
                {/* <!-- ===== Main Content End ===== --> */}
              </div>
              {/* <!-- ===== Content Area End ===== --> */}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
