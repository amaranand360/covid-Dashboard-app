import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface CountryData {
  country: string;
  countryInfo: {
    lat: number;
    long: number;
  };
  active: number;
  recovered: number;
  deaths: number;
}

const Map: React.FC = () => {
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        const countries = response.data;
        setCountriesData(countries);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Country-wise Data</h2>
      <div className="h-64">
        <MapContainer id='1' style={{ height: '100%', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countriesData.map(country => (
            <Marker
              key={country.country}
              position={[country.countryInfo.lat, country.countryInfo.long]}
            >
              <Popup>
                <div>
                  <h3 className="text-lg font-semibold">{country.country}</h3>
                  <p>Active Cases: {country.active}</p>
                  <p>Recovered Cases: {country.recovered}</p>
                  <p>Deaths: {country.deaths}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
