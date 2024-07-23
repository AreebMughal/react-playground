import React from 'react';
import { IButtonProps } from '../../interfaces/button.interface';

export default function Button({
  title,
  className,
}: IButtonProps): React.ReactElement {
  return (
    <button
      className={`py-2 px-4 m-1 bg-emerald-800 text-white text-sm rounded-md ${className}`}
    >
      {title}
    </button>
  );
}

