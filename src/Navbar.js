import React, { useState } from "react";
import logo from "./assets/logo.png";
import Select from "react-select";

// const options01 = [
//   { value: "Week 1", label: "Week 1", year: "2023", week: "1" },
//   { value: "Week 2", label: "Week 2", year: "2023", week: "2" },
//   { value: "Week 3", label: "Week 3", year: "2023", week: "3" },
//   { value: "Week 4", label: "Week 4", year: "2023", week: "4" },
// ];

// const options02 = [
//   { value: "year 1", label: "year 1", week: "16", year: "2023" },
//   { value: "year 2", label: "year 2", week: "2", year: "2023" },
//   { value: "year 3", label: "year 3", week: "3", year: "2023" },
//   { value: "year 4", label: "year 4", week: "4", year: "2023" },
// ];

const Navbar = ({ setSearchValue }) => {
  // const [selectedOptions, setSelectedOptions] = useState([]);

  // const handleSelectChange = (selected) => {
  //   setSearchValue((prevSearchValue) => [...prevSearchValue, ...selected]);
  // };

  // const handleYearChange = (selected) => {
  //   setSearchValue((prevSearchValue) => [...prevSearchValue, selected]);
  // };

  // const handleYearChange = (event) => {
  //   setSearchValue(event.target.value);
  // };

  // console.log(selectedYear);

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
      <div className="h-[10vh] bg-[#e5e5e5] z-10">
        <div className="flex flex-row justify-between pl-4 pr-4">
          <div className="flex flex-row mt-3 items-center space-x-2">
            <span className="">
              <img src={logo} alt="google logo" className="h-[44px] w-[44px]" />
            </span>
            <span className="">Pixel Sales Dashboard</span>
            <span className="">&#62;</span>
            <span className="">US</span>
          </div>
          <div className="relative inline-block text-left mt-4 mr-10">
            <div>
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                id="dropdown-menu-button"
                aria-expanded="true"
                aria-haspopup="true"
              >
                {selectedOption || "Select an option"}
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
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
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
    </>
  );
};

export default Navbar;
