import { ReactNode } from 'react';
import '../index.css';

interface Props {
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const Button = ({ children, onClick }: Props) => {
  return (
    <button type="button" onClick={onClick} className="bg-fuchsia-400 border-1 border-fuchsia-400 rounded-md px-4 py-2 inline-flex items-center justify-center text-white hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
      {children}
    </button>
  );
};