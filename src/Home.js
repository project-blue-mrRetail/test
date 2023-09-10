import React, { useState } from "react";
import att from "./assets/at&t.png";
import bbuy from "./assets/best-buy.png";
import verzion from "./assets/verzion.png";
import tmobile from "./assets/t-mobile.png";
import kp1 from "./assets/kp1.png";
import kp2 from "./assets/kp2.png";
import kp3 from "./assets/kp3.png";
import StateMap from "./StateMap";
import StateMap01 from "./StateMap01";

const Home = () => {
  const [imageValue, setImageValue] = useState(null);

  const handleImageClick = (event) => {
    const clickedImageValue = event.target.getAttribute("data-value");

    setImageValue(clickedImageValue);
  };
  return (
    <>
      <div className="flex flex-row">
        {/* Content */}
        <div className="ml-5">
          <table className="mt-[6vh] ml-5 w-[30vw] table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 bg-gray-200">Device</th>
                <th className="px-4 py-2 bg-gray-200">Target Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">Device 1</td>
                <td className="border px-4 py-2">1000</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Device 2</td>
                <td className="border px-4 py-2">1500</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Device 3</td>
                <td className="border px-4 py-2">800</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">Device 4</td>
                <td className="border px-4 py-2">1200</td>
              </tr>
            </tbody>
          </table>

          <div className="mt-4">
            <h1 className="font-medium">Choose Carrier</h1>
            <div className="flex flex-row">
              <img
                className="w-[180px] h-[100px]"
                src={verzion}
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
            <div className="flex flex-row">
              <img
                className="w-[180px] h-[100px]"
                src={tmobile}
                alt="t-mobile-png"
              />
              <img
                className="w-[180px] h-[100px]"
                src={bbuy}
                alt="best-buy-png"
                data-value="bbuy"
                onClick={handleImageClick}
              />
            </div>
          </div>
          <div className="mt-4">
            <h1 className="h-[25px] font-medium">Select KPI</h1>
            <div className="flex flex-row space-x-3">
              <img src={kp1} className="w-[140px] h-[50px]" />
              <img src={kp2} className="w-[140px] h-[50px]" />
              <img src={kp3} className="w-[140px] h-[50px]" />
            </div>
          </div>
        </div>

        {/* Map */}
        <div>
          <StateMap imageValue={imageValue} />
        </div>
      </div>
    </>
  );
};

export default Home;
