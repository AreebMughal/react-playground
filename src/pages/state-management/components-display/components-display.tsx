
import React from 'react';
import CardOne from '../context-api/context/card-one/card-one';
import CardTwo from '../context-api/context/card-two/card-two';
import CardThree from '../context-api/context/card-three/card-three';
import CardFour from '../context-api/context/card-four/card-four';

const ComponentsDisplay: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center">
      <CardOne />
      <CardTwo />
      <CardThree />
      <CardFour />
    </div>
  );
};

export default ComponentsDisplay;
