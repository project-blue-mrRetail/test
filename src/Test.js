import React, { useState, useEffect } from "react";

export const Test = () => {
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
        const response = await fetch("https://sheetdb.io/api/v1/awae2iipjhzln");
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
  return <div>Test</div>;
};
