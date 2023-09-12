import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const QuadrantChart = () => {
  const quadrantChartRef = useRef(null);
  const [apiData, setApiData] = useState([]);
  let quadrantChart; // Declare quadrantChart here

  useEffect(() => {
    const fetchApiData = async () => {
      try {
        const response = await fetch("https://sheetdb.io/api/v1/awae2iipjhzln");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error("Error fetching API data:", error);
      }
    };

    fetchApiData();
  }, []);

  useEffect(() => {
    if (apiData.length > 0) {
      const store_name = apiData.map((item) => item.store_name);
      const Cycle_Achievement = apiData.map((item) =>
        parseFloat(item.Cycle_Achievement)
      );
      const four_Cycle_Achievement = apiData.map((item) =>
        parseFloat(item.four_Cycle_Achievement)
      );

      const data_x_y = [];

      for (let i = 0; i < Cycle_Achievement.length; i++) {
        data_x_y.push({
          x: Cycle_Achievement[i],
          y: four_Cycle_Achievement[i],
        });
      }

      drawChart(data_x_y, store_name);
    }
  }, [apiData]);

  const drawChart = (data_x_y, store_name) => {
    const quadrantChartCanvas = quadrantChartRef.current.getContext("2d");
    let existingChart = null;

    if (quadrantChart) {
      existingChart = Chart.getChart(quadrantChartCanvas);
      existingChart.destroy();
    }

    const data = {
      labels: store_name,
      datasets: [
        {
          label: "Points",
          data: data_x_y,
          borderColor: "blue",
          backgroundColor: "rgba(0, 125, 255, 0.5)",
        },
      ],
    };

    const options = {
      scales: {
        x: {
          ticks: {
            callback: function (value, index, values) {
              return value + "%";
            },
          },
        },
        y: {
          ticks: {
            callback: function (value, index, values) {
              return value + "%";
            },
          },
        },
      },
      plugins: {
        quadrants: {
          topLeft: "rgba(255, 255, 255, 0.5)",
          topRight: "rgba(255, 255, 255, 0.5)",
          bottomRight: "rgba(255, 255, 255, 0.5)",
          bottomLeft: "rgba(255, 255, 255, 0.5)",
        },
      },
      references: {
        xLine: {
          value: 100,
          borderColor: "black",
          borderWidth: 1,
          label: {
            content: "X = 100",
            enabled: true,
          },
        },
        yLine: {
          value: 100,
          borderColor: "black", // Fixed 'back' to 'black'
          borderWidth: 1,
          label: {
            content: "Y = 100",
            enabled: true,
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

        const { references } = chart.options;
        if (references) {
          const { xLine, yLine } = references;
          if (xLine) {
            const { value, borderColor, borderWidth, label } = xLine;
            const xPixel = x.getPixelForValue(value);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(xPixel, top);
            ctx.lineTo(xPixel, bottom);
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
            ctx.restore();
            if (label && label.enabled) {
              const { content } = label;
              ctx.save();
              ctx.fillStyle = borderColor;
              ctx.font = "12px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "bottom";
              ctx.fillText(content, xPixel, bottom);
              ctx.restore();
            }
          }
          if (yLine) {
            const { value, borderColor, borderWidth, label } = yLine;
            const yPixel = y.getPixelForValue(value);
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(left, yPixel);
            ctx.lineTo(right, yPixel);
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = borderWidth;
            ctx.stroke();
            ctx.restore();
            if (label && label.enabled) {
              const { content } = label;
              ctx.save();
              ctx.fillStyle = borderColor;
              ctx.font = "12px Arial";
              ctx.textAlign = "right";
              ctx.textBaseline = "bottom";
              ctx.fillText(content, right, yPixel);
              ctx.restore();
            }
          }
        }
      },
    };

    if (quadrantChart) {
      quadrantChart.destroy();
    }

    quadrantChart = new Chart(quadrantChartCanvas, {
      type: "scatter",
      data: data,
      options: options,
      plugins: [quadrants],
    });
  };

  return (
    <div className="container pt-10 flex justify-center items-center">
      <canvas
        id="quadrantChart"
        ref={quadrantChartRef}
        width="200"
        height="200"
      ></canvas>
    </div>
  );
};

export default QuadrantChart;
