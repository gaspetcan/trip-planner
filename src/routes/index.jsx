import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Home, TripPlanner } from '../containers';

const Routes = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      <Route exact path="/trip-planner" component={TripPlanner} />
    </Router>
  );
};

export default Routes;
