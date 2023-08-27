import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { fetchGraphData } from "../services/api";

const LineGraph: React.FC = () => {
  const [graphData, setGraphData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchGraphData();
      setGraphData(data);
    };
    fetchData();
  }, []);

  const chartData = {
    labels: Object.keys(graphData),
    datasets: [
      {
        label: "Cases",
        data: Object.values(graphData),
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">
        Worldwide Cases Fluctuations
      </h2>
      <div className="h-64">
        <Line data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default LineGraph;
