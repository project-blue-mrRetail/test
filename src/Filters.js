import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { AiOutlineClose } from "react-icons/ai";

const Filters = ({ isFilterOpen, setIsFilterOpen }) => {
  const quadrantChartRef = useRef(null);
  const [apiD, setApiD] = useState();

  useEffect(() => {
    const apiData = () => {
      fetch("https://sheetdb.io/api/v1/vdq5t5fev3uiq?limit=500")
        .then((res) => res.json())
        .then((data) => setApiD(data));
    };

    apiData();
  }, []);

  useEffect(() => {
    const quadrantChartCanvas = quadrantChartRef.current.getContext("2d");
    const existingChart = Chart.getChart(quadrantChartCanvas);

    // Destroy the existing chart if it exists
    if (existingChart) {
      existingChart.destroy();
    }

    if (apiD) {
      const data = {
        labels: apiD.map((item) => item.store_name),
        datasets: [
          {
            label: "pixel_6",
            data: apiD.map((item) => ({
              x: parseFloat(item.Total_Sales),
              y: parseFloat(item.Quadrant_Plot),
              label: item.store_name,
            })),
            borderColor: "red",
            backgroundColor: "green",
          },
          // {
          //   label: "pixel_6A",
          //   data: apiD.map((item) => ({
          //     x: parseFloat(item.pixel_7_pro_cycle),
          //     y: parseFloat(item.pixel_7_pro),
          //     label: item.store_name,
          //   })),
          //   borderColor: "yellow",
          //   backgroundColor: "orange",
          // },
        ],
      };

      const options = {
        plugins: {
          quadrants: {
            topLeft: "#BAF2E9",
            topRight: "#B0F2B4",
            bottomRight: "#F2BAC9",
            bottomLeft: "#BAD7F2",
          },
        },
        tooltips: {
          callbacks: {
            label: (context) => {
              const storeName =
                data.datasets[context.datasetIndex].data[context.dataIndex]
                  .label;
              return `Store Name: ${storeName}`;
            },
          },
        },
      };

      const quadrants = {
        id: "quadrants",
        beforeDraw(chart, args, options) {
          const {
            ctx,
            chartArea: { left, top, right, bottom },
            scales: { x, y },
          } = chart;
          const midX = x.getPixelForValue(0);
          const midY = y.getPixelForValue(0);
          ctx.save();
          ctx.fillStyle = options.topLeft;
          ctx.fillRect(left, top, midX - left, midY - top);
          ctx.fillStyle = options.topRight;
          ctx.fillRect(midX, top, right - midX, midY - top);
          ctx.fillStyle = options.bottomRight;
          ctx.fillRect(midX, midY, right - midX, bottom - midY);
          ctx.fillStyle = options.bottomLeft;
          ctx.fillRect(left, midY, midX - left, bottom - midY);
          ctx.restore();
        },
      };

      const quadrantChart = new Chart(quadrantChartCanvas, {
        type: "scatter",
        data: data,
        options: options,
        plugins: [quadrants],
      });
    }
  }, [apiD]);

  return (
    <aside
      className={`filtersContainer fixed top-0 h-screen z-20 flex flex-col p-3 gap-3 overflow-auto
    transition-all ease-in-out duration-300  ${
      isFilterOpen ? "right-0 w-[65vw]" : "-right-96 w-0"
    }
    `}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Product Chart</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        />
      </div>
      <div className="container pt-10 flex justify-center items-center">
        <canvas
          id="quadrantChart"
          ref={quadrantChartRef}
          width="200"
          height="200"
        ></canvas>
      </div>
    </aside>
  );
};

export default Filters;
