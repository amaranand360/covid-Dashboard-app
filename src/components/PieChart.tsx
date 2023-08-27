import React from "react";
import { Pie } from "react-chartjs-2";

interface WorldData {
  cases: number;
  deaths: number;
  recovered: number;
}

interface PieChartProps {
  worldData: WorldData;
}

const PieChart: React.FC<PieChartProps> = ({ worldData }) => {
  const chartData = {
    labels: ["Cases", "Deaths", "Recovered"],
    datasets: [
      {
        data: [worldData.cases, worldData.deaths, worldData.recovered],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Worldwide Data Status</h2>
      <div className="h-64">
        <Pie data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
    </div>
  );
};

export default PieChart;
