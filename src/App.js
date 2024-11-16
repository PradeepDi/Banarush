import React from 'react';
//import React, { useState, useEffect } from 'react';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Game from './pages/game/Game';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Instructions from './pages/instructions/Instructions';
import Scoreboard from './pages/Scoreboard/Scoreboard';
import Levels from './pages/levels/Levels';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");

//import { response } from 'express';*

function App() {

 // const[backendData, setBackendData] = useState ([{}])

 // useEffect(() => {
 //   fetch("/api").then(
 //     response = response.json()
 //   ).then(
 //     data => {
 //       setBackendData(data)
//      }
//    )
//  }, [])

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
    {
      path: "/levels",
      element: <Levels/>,
    },
    {
      path: "/game",
      element: <Game/>,
    },
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/instructions",
      element: <Instructions/>,
    },
    {
      path: "/scoreboard",
      element: <Scoreboard/>,
    },
  ]);
  
  return (
    <div className="app">
       <RouterProvider router={router} />
    </div>
  );
}

export default App;
