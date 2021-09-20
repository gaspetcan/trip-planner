import React, { useState, useContext } from 'react';
import { Message, Icon, Grid } from 'semantic-ui-react';
import { mockDailyPrice } from '../../agent/mock';
import { Card, Layout, Logo } from '../../components';
import { TripContext } from '../../provider/TripProvider';
import { sumArray } from '../../utils';
import './style.scss';

const Home = props => {
  const { history } = props;
  const [budgetErrorMessage, setBudgetErrorMessage] = useState(null);
  const { budget, setBudget, selectedCities, setSelectedCities } = useContext(
    TripContext
  );

  function redirectTo() {
    const sum = sumArray(selectedCities.map(c => c.price));
    if (budget >= sum) {
      return history.push('/trip-planner');
    }
    if (sum > budget) {
      setBudget(null);
      setBudgetErrorMessage(
        `You must add ${sum - budget} $ more for cheapest trip plan.`
      );
    }
    return null;
  }

  const deleteCity = (current, city) => {
    setSelectedCities(current.filter(c => c.name !== city.name));
  };

  const addCity = (current, city) => {
    setSelectedCities([...current, city]);
  };

  return (
    <Layout>
      <div className="hp-container">
        <Logo />
        <input
          className={`hp-input ${budgetErrorMessage && 'error-border'}`}
          placeholder={budgetErrorMessage || 'Budget ($)'}
          onChange={e => setBudget(e.target.value)}
          value={budget}
        />
        <div className="hp-city-container">
          <Grid>
            <Grid.Row columns={2}>
              {mockDailyPrice.map(c => (
                <Grid.Column key={c.text}>
                  <Card
                    selectedCities={selectedCities}
                    addCity={addCity}
                    deleteCity={deleteCity}
                    as={<Grid.Column width={1} />}
                    name={c.name}
                    price={c.price}
                    key={c.name}
                  />
                </Grid.Column>
              ))}
            </Grid.Row>
          </Grid>
        </div>
        {budgetErrorMessage && (
          <Message className="error-message" attached="bottom" warning>
            <Icon name="money" />
            This selected trip is expensive than budget. {budgetErrorMessage}
          </Message>
        )}
        <button
          type="button"
          onClick={() => redirectTo()}
          className="hp-button"
          disabled={selectedCities.length < 3}
        >
          {selectedCities.length < 3
            ? `Choose ${3 - selectedCities.length} more  city`
            : 'Click to start'}
        </button>
      </div>
    </Layout>
  );
};

export default Home;
