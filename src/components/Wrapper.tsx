import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const Wrapper = ({ children }: Props) => {
  return <div className='min-h-screen bg-gray-800 flex justify-center pt-32'>{children}</div>;
};