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
import Map from "./Map";
import QuadrantChart from "./QuadrantChart";

const Home = ({ searchValue }) => {
  const [apiData, setApiData] = useState([]); // Initialize the state variable with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://sheetdb.io/api/v1/i521rqr7n8ht1?limit=100"
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

  console.log(apiData);

  const [prod, setProd] = useState(4);
  const [prod6, setProd6] = useState(4);
  const [prod7, setProd7] = useState(4);

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

  console.log(searchValue);
  console.log(deviceValue);
  console.log(imageValue);

  // sales value
  useEffect(() => {
    if (searchValue && deviceValue && imageValue) {
      const filteredData =
        apiData &&
        apiData.filter(
          (item) =>
            item.Week_Year === searchValue &&
            item.Product === deviceValue &&
            item.Retailer === imageValue
        );
      console.log(filteredData);

      const newprod = filteredData
        .filter((item) => item.Total_Sales !== undefined) // Filter objects with Total_Sales defined
        .map((item) => parseInt(item.Total_Sales, 10)) // Convert Total_Sales to integers
        .reduce((acc, curr) => acc + curr, 0); // Sum the integer Total_Sales values

      console.log(newprod); // This will give you the sum of all integer Total_Sales values
      setProd(newprod); // Update the state variable with the sum

      const nprod = filteredData
        .filter((item) => item.WOW !== undefined) // Filter objects with WOW defined
        .map((item) => parseInt(item.WOW, 10)) // Convert WOW to integers
        .reduce((acc, curr) => acc + curr, 0); // Sum the integer WOW values

      console.log(nprod); // This will give you the sum of all integer WOW values
      setProd6(nprod); // Update the state variable with the sum

      const pprod = filteredData
        .filter((item) => item.Achievement !== undefined) // Filter objects with Achievement defined
        .map((item) => parseInt(item.Achievement, 10)) // Convert Achievement to integers
        .reduce((acc, curr) => acc + curr, 0); // Sum the integer Achievement values

      console.log(pprod); // This will give you the sum of all integer Achievement values
      setProd7(pprod); // Update the state variable with the sum
    }
  }, [searchValue, deviceValue, imageValue, apiData]);

  const [openValue, setOpenValue] = useState();

  return (
    <>
      <div className="flex flex-row">
        {/* Content */}
        {openValue ? (
          <QuadrantChart />
        ) : (
          <div className="ml-[2.5vw]">
            <div className="mt-4">
              <h1 className="font-medium">Choose Carrier</h1>
              <div className="flex flex-row space-x-4 mt-3">
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={ver}
                  alt="verzion-png"
                />
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={att}
                  alt="at&t-png"
                  data-value="ATT"
                  onClick={handleImageClick}
                />
              </div>
              <div className="flex flex-row space-x-4 py-2">
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={tmob}
                  alt="t-mobile-png"
                />
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={bestb}
                  alt="best-buy-png"
                  data-value="Bestbuy"
                  onClick={handleImageClick}
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="h-[25px] font-medium">Choose Device</h1>
              <div className="flex flex-row space-x-4 mt-3">
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={pro7}
                  datavalue=""
                  alt="Pixel 7 pro"
                  data-value="Pixel 7 Pro"
                  onClick={handleDeviceClick}
                />
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={g7}
                  alt="Pixel 7"
                  data-value="Pixel Fold"
                  onClick={handleDeviceClick}
                />
              </div>
              <div className="flex flex-row space-x-4 py-2">
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={a7}
                  alt="Pixel 7a"
                  data-value="Pixel 7a"
                  onClick={handleDeviceClick}
                />
                <img
                  className="w-[200px] h-[110px] shadow-md"
                  src={g6}
                  alt="Pixel 6"
                  data-value="Pixel 6a"
                  onClick={handleDeviceClick}
                />
              </div>
            </div>
          </div>
        )}
        {/* MAP */}
        <div className="ml-[8vw]">
          <div className="mt-6 ml-[10vw] flex flex-row space-x-4">
            <div className="flex flex-row items-center justify-center space-x-2">
              <FiFilter />
              <h1 className="font-medium">KPI Filters:</h1>
            </div>
            <div className="flex flex-row items-center justify-center space-x-2">
              <div className="h-[50px] w-[120px] border shadow-md flex items-center text-sm justify-center">
                {prod !== 4 ? `${prod} TOTAL SALES` : "Total Sales"}
              </div>
              <div className="h-[50px] w-[120px] border shadow-md flex items-center text-sm justify-center">
                {prod6 !== 4 ? `WOW ${prod6}%` : "SOS"}
              </div>
              <div className="h-[50px] w-[120px] border shadow-md flex items-center text-sm justify-center">
                {prod7 !== 4 ? `${prod7}% inc` : "Achievement"}
              </div>
            </div>
          </div>
          <div className="mt-4 z-1">
            <Map setOpenValue={setOpenValue} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
