import React, { useState } from "react";
import { IoStatsChart, IoWarning, IoPerson, IoLogOut } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isKpiOpen, setIsKpiOpen] = useState(false);

  const toggleNavbar = () => setIsCollapsed((prev) => !prev);
  const toggleKpiMenu = () => setIsKpiOpen((prev) => !prev);

  const navLinks = [
    {
      href: "./Dashboards",
      title: "Anomaly Detection",
      icon: <IoWarning className="h-6 w-6 text-gray-600" />,
    },
    {
      href: "./Main",
      title: "Procurement Overview",
      icon: <IoStatsChart className="h-6 w-6 text-gray-600" />,
    }
  ];

  const userLinks = [
    {
      title: "User Profile",
      icon: <IoPerson className="h-6 w-6 text-gray-600" />,
    },
    {
      href: "./",
      title: "Logout",
      icon: <IoLogOut className="h-6 w-6 text-gray-600" />,
    }
  ];

  const renderNavLink = (link) => (
    <a
      href={link.href}
      title={link.title}
      className="flex items-center justify-center lg:justify-start text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-lg p-2 no-underline"
    >
      {link.icon}
      {!isCollapsed && <span className="ml-2">{link.title}</span>}
    </a>
  );

  return (
    <div
      className={`bg-white bg-gray-50 shadow-lg hover:shadow-xl transition-shadow duration-300 shadow-blue-500 ${
        isCollapsed ? "w-20" : "w-30"
      } h-screen flex flex-col rounded-2xl`}
    >
      <div className="flex items-center justify-center lg:justify-center py-2 border-b">
        <span className="ml-2">
          <div className="ifixlogo">
            <div className="logo">
              <img
                className="user-avatar user-logo pointer"
                src="https://media.licdn.com/dms/image/v2/D560BAQEOGgWaFutD0w/company-logo_200_200/company-logo_200_200/0/1736840866682/terrascope_climatetech_logo?e=2147483647&v=beta&t=G5c6MpF1Q0qIsGa1N0FFKizfMvorRJ-N1HkI4Jv1HUs"
                height="40"
                width="40"
                onClick={toggleNavbar}
                style={{ cursor: "pointer" }}
                alt="Logo"
              />
            </div>
          </div>
        </span>
      </div>

      <nav className="mt-6 flex flex-col space-y-4 px-2 lg:px-4">
        {navLinks.map((link, index) => (
          <React.Fragment key={index}>{renderNavLink(link)}</React.Fragment>
        ))}
      </nav>

      <div className="mt-auto mb-4 flex flex-col space-y-4 px-2 lg:px-4">
        {userLinks.map((link, index) => (
          <React.Fragment key={index}>{renderNavLink(link)}</React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Navbar;