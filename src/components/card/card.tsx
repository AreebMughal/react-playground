// src/components/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  bgColor: string;
}

const Card: React.FC<CardProps> = ({ children, bgColor }) => {
  return (
    <div className={`h-64 w-64 max-w-sm rounded overflow-hidden shadow-lg p-4 m-2 ${bgColor}`}>
      {children}
    </div>
  );
};

export default Card;
