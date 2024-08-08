// src/components/Card.tsx
import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  bgColor: string;
}

export default function Card ({ children, bgColor }: CardProps){
  return (
    <div className={`w-64 h-64 rounded overflow-hidden shadow-lg p-4 m-2 ${bgColor}`}>
      {children}
    </div>
  );
};


