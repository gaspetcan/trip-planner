import React from 'react';
import { Container as Contain } from 'semantic-ui-react';

const Container = ({ children }) => {
  return <Contain>{children}</Contain>;
};

export default Container;
