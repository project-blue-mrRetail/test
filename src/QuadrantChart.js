import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import csvData from './data.csv';

const QuadrantChart = () => {
  const quadrantChartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    console.log("QuadrantChart component is mounted.");
  
    const ctx = quadrantChartRef.current.getContext("2d");
    // Check if there's an existing Chart instance and destroy it
    // if (chartInstanceRef.current) {
    //   console.log("Chart destroyer")
    //   chartInstanceRef.current.destroy();
    // }

    let isChartMounted = true;

    fetch(csvData)
      .then((res) => res.text())
      .then((data) => {
        const dataArr = data
          .trim()
          .split('\n')
          .map((row) => row.replace('\r', '').split(','))
          .slice(1);
        
        if(!isChartMounted) return

        const store_name = dataArr.map((row) => row[7]);
        const Cycle_Achievement = dataArr.map((row) => row[27]);
        const four_Cycle_Achievement = dataArr.map((row) => row[24]);

        const data_x_y = [];

        for (let i = 0; i < Cycle_Achievement.length; i++) {
          data_x_y.push({
            x: parseFloat(Cycle_Achievement[i].split('%')[0]),
            y: parseFloat(four_Cycle_Achievement[i].split('%')[0]),
          });
        }

        const options = {
          scales: {
            x: {
              ticks: {
                callback: function (value, index, values) {
                  return value + '%';
                },
              },
            },
            y: {
              ticks: {
                callback: function (value, index, values) {
                  return value + '%';
                },
              },
            },
          },
          plugins: {
            quadrants: {
              topLeft: 'rgba(255, 255, 255, 0.5)',
              topRight: 'rgba(255, 255, 255, 0.5)',
              bottomRight: 'rgba(255, 255, 255, 0.5)',
              bottomLeft: 'rgba(255, 255, 255, 0.5)',
            },
          },
          references: {
            xLine: {
              value: 100,
              borderColor: 'black',
              borderWidth: 1,
              label: {
                content: 'X = 100',
                enabled: true,
              },
            },
            yLine: {
              value: 100,
              borderColor: 'black',
              borderWidth: 1,
              label: {
                content: 'Y = 100',
                enabled: true,
              },
            },
          },
        };

        const quadrants = {
          id: 'quadrants',
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

            // Add references line here
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
                  ctx.font = '12px Arial';
                  ctx.textAlign = 'center';
                  ctx.textBaseline = 'bottom';
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
                  ctx.font = '12px Arial';
                  ctx.textAlign = 'right';
                  ctx.textBaseline = 'bottom';
                  ctx.fillText(content, right, yPixel);
                  ctx.restore();
                }
              }
            }
          },
        };

        chartInstanceRef.current = new Chart(ctx, {
          type: 'scatter',
          data: {
            labels: store_name,
            datasets: [
              {
                label: 'Points',
                data: data_x_y,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 125, 255, 0.5)',
              },
            ],
          },
          options: options,
          plugins: [quadrants],
        });
      });
      return () => {
        isChartMounted = false; // Set the flag to false when unmounting
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }
      };
  }, []);
  

  return (
    <div className=" h-[500px] pt-10 flex justify-center items-center">
      <canvas
        // id="quadrantChart"/
        id="chartComponent"
        ref={quadrantChartRef}
        ></canvas>
    </div>
  );
};

export default QuadrantChart;
