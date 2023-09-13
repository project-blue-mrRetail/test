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
import { BiFilter } from "react-icons/bi";
import Filters from "./Filters";

const Home = ({ searchValue }) => {
  const [apiData, setApiData] = useState([]); // Initialize the state variable with an empty array
  // const [borderColor, setBorderColor] = useState({
  //   att: false,
  //   ver: false,
  //   tmob: false,
  //   bestb: false,
  // });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://script.googleusercontent.com/a/macros/gretail.com/echo?user_content_key=xmvSokh3tFvJw5VnyjnLZp2jHYXVpRFWmLW8P3qA22nxJ-JYWZWRizFqB1Psu-pLLT5cPt4ABBHP8xd6ZVHDPAkmUFwXmW17OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKD1bawQL3SRwvta4TobXTk4h8JJZFsljkhvwkJxhVOROxL9pgPh2nUnlrnVYnf3Z1GF8pBgCF8oZYMOIcOoz4epp-E1npCN_KkPM2ExEbUzdifscNTAf1rUiZqwz6PKY8M&lib=MYh46KwtR1PGqq2iJu_X2srTH389liFSA "
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApiData(data.data); // Update the state variable with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(apiData);

  const [prod, setProd] = useState(4);
  const [prod6, setProd6] = useState(4);
  const [prod7, setProd7] = useState(4);

  const [imageValue, setImageValue] = useState(null);

  const handleImageClick = (e) => {
    const clickedImageValue = e.target.getAttribute("data-value");

    setImageValue(clickedImageValue);
  };

  const [deviceValue, setDeviceValue] = useState(null);

  const handleDeviceClick = (e) => {
    const clickedDeviceValue = e.target.getAttribute("data-value");

    setDeviceValue(clickedDeviceValue);
  };

  // console.log(searchValue);
  // console.log(deviceValue);
  // console.log(imageValue);

  // sales value
  useEffect(() => {
    if (searchValue && deviceValue && imageValue) {
      const filteredData =
        apiData &&
        apiData.filter(
          (item) =>
            item.Week === searchValue &&
            item.Product === deviceValue &&
            item.Retailer === imageValue
        );
      console.log(filteredData);

      const newprod = filteredData
        .filter((item) => item.Actual_Sellout !== undefined) // Filter objects with Total_Sales defined
        .map((item) => parseInt(item.Actual_Sellout, 10)) // Convert Total_Sales to integers
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
        .filter((item) => item.Cycle_Achievement !== undefined) // Filter objects with Achievement defined
        .map((item) => parseInt(item.Cycle_Achievement, 10)) // Convert Achievement to integers
        .reduce((acc, curr) => acc + curr, 0); // Sum the integer Achievement values

      console.log(pprod); // This will give you the sum of all integer Achievement values
      setProd7(pprod); // Update the state variable with the sum
    }
  }, [searchValue, deviceValue, imageValue, apiData]);

  const [openValue, setOpenValue] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [is01Clicked, setIs01Clicked] = useState(false);

  const handleImage01Click = (e) => {
    setIs01Clicked(!is01Clicked);
  };

  const [is02Clicked, setIs02Clicked] = useState(false);

  const handleImage02Click = (e) => {
    setIs02Clicked(!is02Clicked);
  };

  const [is03Clicked, setIs03Clicked] = useState(false);

  const handleImage03Click = (e) => {
    setIs03Clicked(!is03Clicked);
  };
  const [is04Clicked, setIs04Clicked] = useState(false);

  const handleImage04Click = (e) => {
    setIs04Clicked(!is04Clicked);
  };
  const [is05Clicked, setIs05Clicked] = useState(false);

  const handleImage05Click = (e) => {
    setIs05Clicked(!is05Clicked);
  };
  const [is06Clicked, setIs06Clicked] = useState(false);

  const handleImage06Click = (e) => {
    setIs06Clicked(!is06Clicked);
  };

  const [activeImage, setActiveImage] = useState(null);

  const handleImgClick = (imageNumber) => {
    setActiveImage(imageNumber);
  };

  const [activeI, setActiveI] = useState(null);

  const handleIClick = (imageNumber) => {
    setActiveI(imageNumber);
  };
  return (
    <>
      <div className="flex flex-row bg-white rounded-b-lg rounded-tl-lg">
        {/* Content */}
        {openValue ? (
          <div className="flex items-center justify-center w-[50vw]">
            <button
              className={`flex py-4 px-6 rounded-md shadow-md items-center gap-1 hover:bg-[--primary-text-color] hover:text-white hover:shadow-lg ${
                isFilterOpen ? "bg-[--primary-text-color] text-white" : ""
              }`}
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              {/* <BiFilter className="text-lg" /> */}
              <span className="text-md block">Choose</span>
              <span className="text-md block">Quadrant</span>
            </button>
          </div>
        ) : (
          <div className="ml-[2.5vw] mt-3">
            <div className="mt-2">
              <h1 className="font-medium text-start text-lg">Choose Carrier</h1>
              <div className="flex flex-row space-x-4 mt-3 ">
                <img
                  className="w-[200px] h-[100px]"
                  src={ver}
                  alt="verzion-png"
                  onClick={handleImageClick}
                />
                <img
                  className={`w-[200px] h-[100px] ${
                    activeI === 1 ? "border-blue-500 border-2" : ""
                  }`}
                  src={att}
                  alt="at&t-png"
                  data-value="ATT"
                  // onClick={handleImageClick}
                  onClick={(e) => {
                    handleImageClick(e);
                    handleIClick(1);
                  }}
                />
              </div>
              <div className="flex flex-row space-x-4 py-2">
                <img
                  className="w-[200px] h-[100px]"
                  src={tmob}
                  alt="t-mobile-png"
                  onClick={handleImageClick}
                />
                <img
                  className={`w-[200px] h-[100px] ${
                    activeI === 2 ? "border-blue-500 border-2" : ""
                  }`}
                  src={bestb}
                  alt="best-buy-png"
                  data-value="Bestbuy"
                  onClick={(e) => {
                    handleImageClick(e);
                    handleIClick(2);
                  }}
                />
              </div>
            </div>
            <div className="mt-4">
              <h1 className="h-[25px] font-medium text-start text-lg">
                Choose Device
              </h1>
              <div className="flex flex-row space-x-4 mt-3">
                <img
                  className={`w-[200px] h-[80px] ${
                    activeImage === 3 ? "border-blue-500 border-2" : ""
                  }`}
                  src={pro7}
                  datavalue=""
                  alt="Pixel 7 pro"
                  data-value="Pixel 7 Pro"
                  onClick={(e) => {
                    handleDeviceClick(e);
                    handleImgClick(3);
                  }}
                />
                <img
                  className={`w-[200px] h-[80px] ${
                    activeImage === 4 ? "border-blue-500 border-2" : ""
                  }`}
                  src={g7}
                  alt="Pixel 7"
                  data-value="Pixel Fold"
                  // onClick={handleDeviceClick}
                  onClick={(e) => {
                    handleDeviceClick(e);
                    handleImgClick(4);
                  }}
                />
              </div>
              <div className="flex flex-row space-x-4 py-2">
                <img
                  className={`w-[200px] h-[80px] ${
                    activeImage === 5 ? "border-blue-500 border-2" : ""
                  }`}
                  src={a7}
                  alt="Pixel 7a"
                  data-value="Pixel 7a"
                  onClick={(e) => {
                    handleDeviceClick(e);
                    handleImgClick(5);
                  }}
                />
                <img
                  className={`w-[200px] h-[80px] ${
                    activeImage === 6 ? "border-blue-500 border-2" : ""
                  }`}
                  src={g6}
                  alt="Pixel 6"
                  data-value="Pixel 6a"
                  onClick={(e) => {
                    handleDeviceClick(e);
                    handleImgClick(6);
                  }}
                />
              </div>
            </div>
          </div>
        )}
        {/* MAP */}
        <div className="ml-[6vw]">
          <div className="mt-3 ml-[6vw] flex flex-row space-x-4">
            <div className="flex items-center gap-2 mt-2">
              <Filters
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
            </div>
            {/* <div className="flex flex-row items-center justify-center space-x-2">
              <FiFilter />
              <h1 className="font-medium">KPI Filters:</h1>
            </div> */}
            {!openValue ? (
              <div className="flex flex-row items-center justify-center pl-11 space-x-2">
                <div className="h-[50px] w-[120px] border flex items-center text-sm justify-center rounded-lg">
                  {prod !== 4 ? `TOTAL SALES: ${prod}` : "Total Sales"}
                </div>
                <div className="h-[50px] w-[120px] border flex items-center text-sm justify-center rounded-lg">
                  {prod6 !== 4 ? `WOW: ${prod6}%` : "WOW"}
                </div>
                <div className="h-[50px] w-auto border flex items-center text-sm justify-center px-4 rounded-lg">
                  {prod7 !== 4
                    ? `Target Achievement: ${prod7}%`
                    : "Target Achievement"}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="mt-4 z-1 ">
            <Map setOpenValue={setOpenValue} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
