import React from "react";
import axios from "axios";
import { useQuery } from "react-query";

interface CovidData {
  country: string;
  countryInfo: {
    flag: string;
  };
  cases: number;
  todayCases: number;
  active: number;
  recovered: number;
  deaths: number;
}

const fetchCovidData = async (): Promise<CovidData[]> => {
  const response = await axios.get("https://disease.sh/v3/covid-19/countries");
  return response.data;
};

interface CovidDataTableProps {}

const CovidDataTable: React.FC<CovidDataTableProps> = () => {
  const {
    data: covidData,
    isLoading,
    isError,
  } = useQuery<CovidData[]>("covidData", fetchCovidData);

  return (
    <div className="w-full mx-auto my-4">
      <table className="table-auto w-full border-collapse border">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2">Country</th>
            <th className="px-4 py-2">Flag</th>
            <th className="px-4 py-4">Total Cases</th>
            <th className="px-4 py-4">Today Cases</th>
            <th className="px-4 py-4">Active Cases</th>
            <th className="px-4 py-4">Recovered Cases</th>
            <th className="px-4 py-4">Deaths</th>
          </tr>
        </thead>
        <tbody className="table-body text-center">
          {isLoading ? (
            <tr>
              <td colSpan={7} className="px-4 py-4 text-center">
                Loading data...
              </td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan={7} className="px-4 py-4 text-center text-red-500">
                Error fetching data
              </td>
            </tr>
          ) : (
            covidData?.map((countryData) => (
              <tr
                key={countryData.country}
                className="border-t hover:bg-gray-100 transition-colors duration-200 text-center"
              >
                <td className="px-4 py-2">{countryData.country}</td>
                <td className="px-4 py-2">
                  <img
                    src={countryData.countryInfo.flag}
                    alt='...'
                    decoding="async"
                    className="h-8"
                  />
                </td>
                <td className="px-4 py-4">{countryData.cases}</td>
                <td className="px-4 py-4">{countryData.todayCases}</td>
                <td className="px-4 py-4">{countryData.active}</td>
                <td className="px-4 py-4">{countryData.recovered}</td>
                <td className="px-4 py-4">{countryData.deaths}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CovidDataTable;
