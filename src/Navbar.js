import React, { useState } from "react";
import logo from "./assets/logo.png";
import Select from "react-select";
import { SlCalender, SlOrganization } from "react-icons/sl";

const Navbar = ({ setSearchValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const options = ["Week34 2023", "Week33 2023", "Week32 2023", "Week31 2023"];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setSearchValue(option);
    setIsOpen(false);
  };
  return (
    <>
      <div className="h-[10vh] bg-[#F6F7FA] z-10">
        <div className="flex flex-row justify-between pl-8 pr-4">
          <div className="flex flex-row mt-3 items-center space-x-1">
            <span className="">
              <img src={logo} alt="google logo" className="h-[24px] w-[24px]" />
            </span>
            <span className="text-md font-medium">Pixel Sales Dashboard</span>
            <span className="text-[#21232653] font-medium px-3">&#62;</span>
            <span
              className="text-[#21232685] font-medium
"
            >
              US
            </span>
          </div>
          <div className="relative text-left mt-5 flex flex-row space-x-4 bg-white px-5 pt-1 rounded-t-lg mr-[12px] w-[40%]">
            <div className="flex items-center justify-center">
              <h2 className="text-md">Results For:</h2>
            </div>
            <div>
              <div>
                <button
                  onClick={toggleMenu}
                  type="button"
                  className="inline-flex justify-center w-[25vw] rounded-full border border-gray-300 shadow-sm pr-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  id="dropdown-menu-button"
                  aria-expanded="true"
                  aria-haspopup="true"
                  style={{ zIndex: 10 }} // Add a zIndex style here
                >
                  {selectedOption || (
                    <>
                      <span className="mt-1">
                        <SlCalender />
                      </span>
                      <span className="text-gray-500 ml-2 mt-0.5">
                        Search Here...
                      </span>
                      {/* Add the text */}
                    </>
                  )}
                  <svg
                    className="-mr-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              {isOpen && (
                <div
                  className="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-20"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="dropdown-menu-button"
                >
                  <div className="py-1" role="none">
                    {options.map((option, index) => (
                      <a
                        key={index}
                        href="#"
                        onClick={() => handleOptionClick(option)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {option}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
