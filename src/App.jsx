import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';
import { Home, TripPlanner } from './containers';
import { Providers } from './provider';
import './common/global.scss';
import './common/override.scss';
import 'semantic-ui-css/semantic.min.css';

const App = () => {
  const history = useHistory();
  return (
    <Providers>
      <Router history={history}>
        <Route exact path="/" component={Home} />
        <Route exact path="/trip-planner" component={TripPlanner} />
      </Router>
    </Providers>
  );
};

export default hot(App);
