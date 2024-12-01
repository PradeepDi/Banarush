import React from 'react';
import { createBrowserRouter,RouterProvider } from "react-router-dom";
import Game from './pages/game/Game';
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Register from './pages/register/Register';
import Instructions from './pages/instructions/Instructions';
import Scoreboard from './pages/Scoreboard/Scoreboard';
import Menu from './pages/Menu/Menu';
import { ReactSession } from 'react-client-session';
ReactSession.setStoreType("localStorage");


function App() {


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
      path: "/menu",
      element: <Menu/>,
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
