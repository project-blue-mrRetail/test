import React, { useState } from "react";
import Home from "./Home";
import Navbar from "./Navbar";

function App() {
  const [searchValue, setSearchValue] = useState([]);
  return (
    <div className="App">
      <Navbar setSearchValue={setSearchValue} />
      <Home searchValue={searchValue} />
    </div>
  );
}

export default App;
