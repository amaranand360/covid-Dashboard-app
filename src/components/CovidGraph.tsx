import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Chart } from "chart.js";

interface HistoricalData {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

const fetchHistoricalData = async (): Promise<HistoricalData> => {
  const response = await axios.get(
    "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
  );
  return response.data;
};

const CovidGraph: React.FC = () => {
  const {
    data: historicalData,
    isLoading,
    isError,
  } = useQuery<HistoricalData>("historicalData", fetchHistoricalData);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const chartData = {
      labels: Object.keys(historicalData?.cases || {}),
      datasets: [
        {
          label: "Cases",
          data: Object.values(historicalData?.cases || {}),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        x: {
          type: "time",
          time: {
            unit: "day",
          },
          title: {
            display: true,
            text: "Date",
          },
        },
        y: {
          title: {
            display: true,
            text: "Cases",
          },
        },
      },
    };

    chartRef.current = new Chart("covidChart", {
      type: "line",
      data: chartData,
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [historicalData]);

  return (
    <div className="w-full mx-auto my-4">
      <h2 className="text-xl font-semibold mb-2">COVID-19 Cases Over Time</h2>
      {isLoading ? (
        <p>Loading data...</p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <canvas id="covidChart" />
      )}
    </div>
  );
};

export default CovidGraph;
