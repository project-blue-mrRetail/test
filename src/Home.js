import React, { useState, useEffect } from "react";
import att from "./assets/att.png";
import bestb from "./assets/bestb.png";
import ver from "./assets/ver.png";
import tmob from "./assets/tmob.png";
import kp1 from "./assets/1.png";
import kp2 from "./assets/2.png";
import kp3 from "./assets/3.png";
import pro7 from "./assets/7pro.png";
import a7 from "./assets/7a.png";
import g7 from "./assets/7.png";
import g6 from "./assets/6.png";
import { FiFilter } from "react-icons/fi";

const Home = ({ searchValue }) => {
  console.log(searchValue);

  const [apiData, setApiData] = useState([]); // Initialize the state variable with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sheetdb.io/api/v1/ng3598dw5qdit?limit=500"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApiData(data); // Update the state variable with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  //   useEffect(() => {
  //     // console.log(apiData);

  //     if (searchValue[0]?.week && searchValue[0]?.year) {
  //       const filteredData =
  //         apiData &&
  //         apiData.filter(
  //           (item) =>
  //             item.Week === searchValue[0].week &&
  //             item.Year === searchValue[0].year
  //         );
  //       console.log(filteredData);
  //     }
  //   }
  //   const prod = filteredData
  //   .map((item) => item.deviceValue)
  //   .reduce((acc, curr) => acc + curr, 0);

  // console.log(prod);
  //   , [apiData]);

  const [prod, setProd] = useState(4);
  const [prod6, setProd6] = useState(4);

  // sales value
  useEffect(() => {
    // console.log(apiData);

    if (searchValue[0]?.week && searchValue[0]?.year) {
      const filteredData =
        apiData &&
        apiData.filter(
          (item) =>
            item.Week === searchValue[0].week &&
            item.Year === searchValue[0].year
        );
      console.log(filteredData);

      const newprod = filteredData
        .map((item) => parseInt(item[deviceValue])) // Convert to integers
        .reduce((acc, curr) => acc + curr, 0);

      // console.log(prod);
      setProd(newprod);
    }
  }, [apiData, searchValue]);

  // WoW
  useEffect(() => {
    // console.log(apiData);

    if (
      searchValue[0]?.week &&
      searchValue[0]?.year &&
      searchValue[1]?.week &&
      searchValue[1]?.year
    ) {
      const filteredData01 =
        apiData &&
        apiData.filter(
          (item) =>
            item.Week === searchValue[0].week &&
            item.Year === searchValue[0].year
        );
      // console.log(filteredData);

      const prod01 = filteredData01
        .map((item) => parseInt(item[deviceValue])) // Convert to integers
        .reduce((acc, curr) => acc + curr, 0);

      // console.log(prod);
      const filteredData02 =
        apiData &&
        apiData.filter(
          (item) =>
            item.Week === searchValue[1].week &&
            item.Year === searchValue[1].year
        );
      // console.log(filteredData);

      const prod02 = filteredData02
        .map((item) => parseInt(item[deviceValue])) // Convert to integers
        .reduce((acc, curr) => acc + curr, 0);

      console.log(prod01);
      console.log(prod02);

      if (prod01 !== 0) {
        const prod03 = ((prod02 - prod01) / prod01) * 100;
        console.log(prod03);
        setProd6(prod03);
      } else {
        console.log("Division by zero avoided.");
      }
    }
  }, [apiData, searchValue]);

  const [imageValue, setImageValue] = useState(null);

  const handleImageClick = (event) => {
    const clickedImageValue = event.target.getAttribute("data-value");

    setImageValue(clickedImageValue);
  };

  const [deviceValue, setDeviceValue] = useState(null);

  const handleDeviceClick = (event) => {
    const clickedDeviceValue = event.target.getAttribute("data-value");

    setDeviceValue(clickedDeviceValue);
  };

  return (
    <>
      <div className="flex flex-row">
        {/* Content */}
        <div className="ml-[4vw]">
          <div className="mt-4">
            <h1 className="font-medium">Choose Carrier</h1>
            <div className="flex flex-row space-x-4">
              <img
                className="w-[180px] h-[100px]"
                src={ver}
                alt="verzion-png"
              />
              <img
                className="w-[180px] h-[100px]"
                src={att}
                alt="at&t-png"
                data-value="att"
                onClick={handleImageClick}
              />
            </div>
            <div className="flex flex-row space-x-4 py-2">
              <img
                className="w-[180px] h-[100px]"
                src={tmob}
                alt="t-mobile-png"
              />
              <img
                className="w-[180px] h-[100px]"
                src={bestb}
                alt="best-buy-png"
                data-value="bbuy"
                onClick={handleImageClick}
              />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="h-[25px] font-medium">Choose Device</h1>
            <div className="flex flex-row space-x-4">
              <img
                className="w-[180px] h-[100px]"
                src={pro7}
                datavalue=""
                alt="Pixel 7 pro"
                data-value="pro7"
                onClick={handleDeviceClick}
              />
              <img
                className="w-[180px] h-[100px]"
                src={g7}
                alt="Pixel 7"
                data-value="g7"
                onClick={handleDeviceClick}
              />
            </div>
            <div className="flex flex-row space-x-4 py-2">
              <img
                className="w-[180px] h-[100px]"
                src={a7}
                alt="Pixel 7a"
                data-value="a7"
                onClick={handleDeviceClick}
              />
              <img
                className="w-[180px] h-[100px]"
                src={g6}
                alt="Pixel 6"
                data-value="pixel_6"
                onClick={handleDeviceClick}
              />
            </div>
          </div>
        </div>

        <div className="ml-[8vw]">
          <div className="mt-6 ml-[10vw] flex flex-row space-x-4">
            <div className="flex flex-row items-center justify-center space-x-2">
              <FiFilter />
              <h1 className="font-medium">KPI Filters:</h1>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2">
              <div className="h-[50px] w-[120px] border flex items-center justify-center">
                {prod !== 4 ? prod : "Total Sales"}
              </div>
              <div className="h-[50px] w-[120px] border flex items-center justify-center">
                {prod6 !== 4 ? prod6 : "SoS"}
              </div>
              <div className="h-[50px] w-[120px] border flex items-center justify-center">
                % BCHI
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
