import React from 'react';
import { TripProvider } from './TripProvider';

export const Providers = ({ children }) => (
  <TripProvider>{children}</TripProvider>
);
