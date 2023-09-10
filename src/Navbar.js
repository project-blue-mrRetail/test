import React from "react";
import img_01 from "./assets/img_01.png";

const Navbar = () => {
  return (
    <>
      <div className="h-[10vh] bg-[#e5e5e5] ">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row mt-3 items-center">
            <span className="">
              <img
                src={img_01}
                alt="google logo"
                className="h-[44px] w-[44px]"
              />
            </span>
            <span className="">Pixel Sales Dashboard</span>
            <span className="">&#62;</span>
            <span className="">US</span>
          </div>
          <div className="flex flex-row mt-3 items-center">
            <span>6:10</span>
            <span>|</span>
            <span>12 May 2023</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
