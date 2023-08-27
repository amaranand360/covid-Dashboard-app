import React from 'react';
import CountryReprtTable from './CountryReprt';
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  return (
    <div>
      <Navbar/>
      <CountryReprtTable  />
    </div>
  );
};

export default Dashboard;
