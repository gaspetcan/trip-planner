import React, { createContext, useState } from 'react';

const TripContext = createContext();
const { Provider, Consumer } = TripContext;

const TripProvider = ({ children }) => {
  const [budget, setBudget] = useState();
  const [selectedCities, setSelectedCities] = useState([]);

  return (
    <Provider value={{ budget, setBudget, selectedCities, setSelectedCities }}>
      {children}
    </Provider>
  );
};

export { TripProvider, Consumer, TripContext };
