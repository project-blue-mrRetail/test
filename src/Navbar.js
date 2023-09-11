import React, { useState } from "react";
import logo from "./assets/logo.png";
import Select from "react-select";

const options01 = [
  { value: "Week 1", label: "Week 1", year: "2023", week: "1" },
  { value: "Week 2", label: "Week 2", year: "2023", week: "2" },
  { value: "Week 3", label: "Week 3", year: "2023", week: "3" },
  { value: "Week 4", label: "Week 4", year: "2023", week: "4" },
];

const options02 = [
  { value: "year 1", label: "year 1", week: "16", year: "2023" },
  { value: "year 2", label: "year 2", week: "2", year: "2023" },
  { value: "year 3", label: "year 3", week: "3", year: "2023" },
  { value: "year 4", label: "year 4", week: "4", year: "2023" },
];

const Navbar = ({ setSearchValue }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selected) => {
    setSearchValue((prevSearchValue) => [...prevSearchValue, ...selected]);
  };

  const handleYearChange = (selected) => {
    setSearchValue((prevSearchValue) => [...prevSearchValue, selected]);
  };

  // const handleYearChange = (event) => {
  //   setSearchValue(event.target.value);
  // };

  // console.log(selectedYear);

  return (
    <>
      <div className="h-[10vh] bg-[#e5e5e5]">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row mt-3 items-center">
            <span className="">
              <img src={logo} alt="google logo" className="h-[44px] w-[44px]" />
            </span>
            <span className="">Pixel Sales Dashboard</span>
            <span className="">&#62;</span>
            <span className="">US</span>
          </div>
          <div className="flex flex-row mt-3 gap-x-4 items-center">
            <div className="flex justify-center items-center">
              <label htmlFor="weekSelect">Select Week(s):</label>
              <Select
                id="weekSelect"
                name="weeks"
                isMulti
                options={options01}
                onChange={handleSelectChange}
              />
            </div>
            <div className="flex justify-center items-center">
              <label htmlFor="weekSelect">Select Year:</label>
              <Select
                id="yearSelect"
                name="year"
                options={options02}
                onChange={handleYearChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
