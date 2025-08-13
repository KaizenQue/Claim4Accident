/* eslint-disable no-undef */
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HeroPage from './Components/HomePage';
import LegalLandingPage from './Components/LandingPage';
import "leaflet/dist/leaflet.css";
import React from "react";
import Component2 from "./Components/Component2";
import LocationCard from "./Components/LocationCard";
// import LegalLandingPage from './Components/LandingPage';
import LegalLandingPage2 from './Components/LandingPage2';
import LegalLandingPage3 from './Components/LandingPage3';
import ContactUs from './Components/ContactUs';
import Disclaimer from './Components/Disclaimer';
import PrivacyPolicy from './Components/PrivacyPolicy';

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
    {
      path: '/Component2',
      element: <Component2 />,
    },
    {
      path: '/Disclaimer',
      element: <Disclaimer />,
    },
    {
      path: '/PrivacyPolicy',
      element: <PrivacyPolicy />,
    },
    {
      path: '/Nevada',
      element: <LegalLandingPage />,
    },
    {
      path: '/California',
      element: <LegalLandingPage2 />,
    },
    {
      path: '/Colorado',
      element: <LegalLandingPage3 />,
    },
    {
      path: '/contactus',
      element: <ContactUs />,
    },
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
