import { useContext } from 'react';

import { AMapAPIContextType, AMapAPIContext } from '../components/APIContainer/AMapAPIContext';

export type useAMapAPIValue = AMapAPIContextType;

export const useAMapAPI: () => useAMapAPIValue = () => {
  const context: useAMapAPIValue = useContext(AMapAPIContext);
  return context;
};

export default useAMapAPI;
