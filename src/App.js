/* eslint-disable no-undef */
import './App.css';
import LoginPage from './Components/LoginPage/LoginPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Anomalies from "./Components/Admin/Anomalies/Anomalies"
import DataInsight from "./Components/Admin/DataInsight/DataInsight"
import ChoroplethMap from "./Components/Admin/DataInsight/MapComponent"
import TrendsChart from "./Components/Admin/Trends/Trends"
import Interactivity from "./Components/Admin/Interactivity/Interactivity"
import Emission from "./Components/Admin/Sustainabilty/Emission"
import Main from "./Components/Admin/Interactivity/Main"
import Dashboards from "./Components/Admin/Dashboard/Dashboard"
import NavBar from "./Components/NavBar"
import HeroPage from './Components/HomePage';
import LegalLandingPage from './Components/LandingPage';
import "leaflet/dist/leaflet.css";


import React from "react";

function App() {
  

  const router = createBrowserRouter([
    {
      path: '/',
      element: <HeroPage />, 
    },
    {
      path: '/legal',
      element: <LegalLandingPage />,
    },
    // {
    //   path: '/Anomalies',
    //   element: <Anomalies />,
    // },
    // {
    //   path: '/TrendsChart',
    //   element: <TrendsChart />,
    // },
    // {
    //   path: '/DataInsight',
    //   element: <DataInsight />,
    // },
    // {
    //   path: '/Interactivity',
    //   element: <Interactivity />,
    // },
    // {
    //   path: '/Main',
    //   element: <Main />,
    // },
    // {
    //   path: '/Dashboards',
    //   element: <Dashboards />,
    // },
    // {
    //   path: '/Main',
    //   element: <Main />,
    // },
    // {
    //   path: '/Emission',
    //   element: <Emission />,
    // },
    // {
    //   path: '/ChoroplethMap',
    //   element: <ChoroplethMap />,
    // },
   
   
   
    {
      path: '*',
      element: <h1>404 - Page Not Found</h1>,
    },
  ]);

  return (
     <RouterProvider router={router} />
  );
}

export default App;
