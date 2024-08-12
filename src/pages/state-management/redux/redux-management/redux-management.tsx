import React from 'react';
import CardOne from '../redux-cardone/redux-cardone';
import CardTwo from '../redux-cardtwo/redux-cardtwo';
import CardThree from '../redux-cardtwo/redux-cardtwo';
import CardFour from '../redux-cardfour/redux-cardfour';

const Reduxmanagement: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center">
      <CardOne />
      <CardTwo />
      <CardThree />
      <CardFour />
    </div>
  );
};

export default Reduxmanagement;
