
const BASE_URL = 'https://disease.sh/v3/covid-19';

export const fetchWorldwideData = async () => {
  const response = await fetch(`${BASE_URL}/all`);
  console.log(response.json());
  return response.json();
};

export const fetchCountryData = async () => {
  const response = await fetch(`${BASE_URL}/countries`);
  return response.json();
};

export const fetchGraphData = async () => {
  const response = await fetch(`${BASE_URL}/historical/all?lastdays=all`);
  return response.json();
};
