import React, { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";
import GoogleSheetsComponent from "./GoogleSheets";

function App() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="App bg-[#F6F7FA]">
      <Navbar setSearchValue={setSearchValue} />
      <div className="px-[28px] pb-[26px]">
        <Home searchValue={searchValue} />
      </div>
      {/* <GoogleSheetsComponent /> */}
    </div>
  );
}

export default App;
