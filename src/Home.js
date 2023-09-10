import React, { useState } from "react";
import att from "./assets/at&t.png";
import bbuy from "./assets/best-buy.png";
import verzion from "./assets/verzion.png";
import tmobile from "./assets/t-mobile.png";
import kp1 from "./assets/kp1.png";
import kp2 from "./assets/kp2.png";
import kp3 from "./assets/kp3.png";
import StateMap from "./StateMap";

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
        <div className="ml-6">
          <div className="mt-10">
            <h1 className="h-[25px] font-medium">Choose Carrier</h1>
            <div className="flex flex-row">
              <img
                className="w-[280px] h-[160px]"
                src={verzion}
                alt="verzion-png"
              />
              <img
                className="w-[280px] h-[160px]"
                src={att}
                alt="at&t-png"
                data-value="att"
                onClick={handleImageClick}
              />
            </div>
            <div className="flex flex-row">
              <img
                className="w-[280px] h-[160px]"
                src={tmobile}
                alt="t-mobile-png"
              />
              <img
                className="w-[280px] h-[160px]"
                src={bbuy}
                alt="best-buy-png"
                data-value="bbuy"
                onClick={handleImageClick}
              />
            </div>
          </div>
          <div className="mt-10">
            <h1 className="h-[25px] font-medium">Select KPI</h1>
            <div className="flex flex-row space-x-3">
              <img src={kp1} className="w-[170px] h-[60px]" />
              <img src={kp2} className="w-[170px] h-[60px]" />
              <img src={kp3} className="w-[170px] h-[60px]" />
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
