import React, { useContext, useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import { Layout, Container, Logo, Card } from '../../components';
import { TripContext } from '../../provider/TripProvider';
import { sumArray } from '../../utils';
import './style.scss';

const TripPlanner = props => {
  const { history } = props;
  const { budget, selectedCities } = useContext(TripContext);
  const [lowOfferPlan, setLowOfferPlan] = useState([]);
  const [avarageOfferPlan, setAvarageOfferPlan] = useState([]);
  const [highOfferPlan, setHighOfferPlan] = useState([]);

  const calculateCost = cities => {
    if (cities.length) {
      const cost = cities.map(c => c.price * c.day);
      return sumArray(cost);
    }
    return undefined;
  };

  const minmumPrice = cities => sumArray(cities.map(c => c.price));

  const lowOfffer = (cities, cost) => {
    const summary = cost - minmumPrice(cities);
    const maxDayOffer = parseInt(summary / cities[0].price, 10);
    const lowPlan = cities.map((c, i) => {
      if (i === 0) {
        return { ...c, day: maxDayOffer + 1 };
      }
      return { ...c, day: 1 };
    });
    return lowPlan;
  };

  const avarageOffer = (cities, cost) => {
    const summary = cost - minmumPrice(cities);
    const avarageDayOffer = parseInt(summary / minmumPrice(cities), 10);
    const leastDayOffer = parseInt(
      (cost - (avarageDayOffer + 1) * minmumPrice(cities)) / cities[0].price,
      10
    );
    const avaragePlan = cities.map((c, i) => {
      if (i === 0) {
        return { ...c, day: leastDayOffer + avarageDayOffer + 1 };
      }
      return { ...c, day: avarageDayOffer + 1 };
    });
    return avaragePlan;
  };

  const highestOffer = (cities, cost) => {
    const summary = cost - minmumPrice(cities);
    const expensiveDayOffer = parseInt(
      summary / cities[cities.length - 1].price,
      10
    );
    const luxuryPlan = cities.map((c, i) => {
      if (i === cities.length - 1) {
        return { ...c, day: expensiveDayOffer + 1 };
      }
      return { ...c, day: 1 };
    });
    const stillHasMoney = parseInt(
      summary - expensiveDayOffer * cities[cities.length - 1].price,
      10
    );
    if (stillHasMoney > luxuryPlan[0].price) {
      const delegate = parseInt(stillHasMoney / luxuryPlan[0].price, 10);
      const plan = cities.map((c, i) => {
        if (i === 0) {
          return { ...c, day: delegate + 1 };
        }
        if (i === cities.length - 1) {
          return { ...c, day: expensiveDayOffer + 1 };
        }
        return { ...c, day: 1 };
      });
      return plan;
    }
    return luxuryPlan;
  };

  const calculatePlans = (cities, cost) => {
    const sortedCities = cities.sort(function (x, y) {
      return x.price - y.price;
    });

    setLowOfferPlan(lowOfffer(sortedCities, cost));
    setAvarageOfferPlan(avarageOffer(sortedCities, cost));
    setHighOfferPlan(highestOffer(sortedCities, cost));
  };

  useEffect(() => {
    if (!budget && !selectedCities.length) {
      return history.push('/');
    }
    return calculatePlans(selectedCities, parseInt(budget, 10));
  }, [budget, selectedCities]);

  return (
    <Layout>
      <Container>
        <div className="tp-container">
          <Logo />
          <div className="hp-city-container">
            <Grid>
              <span className="tp-offer-row">
                Cheapest Offer Plan <b>{calculateCost(lowOfferPlan)} $ </b>
              </span>
              <Grid.Row columns={lowOfferPlan.length}>
                {lowOfferPlan.map(c => (
                  <Grid.Column key={c.text}>
                    <Card
                      as={<Grid.Column width={1} />}
                      name={c.name}
                      price={c.price}
                      day={c.day}
                      key={c.name}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>
              <span className="tp-offer-row">
                Avarage Offer Plan <b>{calculateCost(avarageOfferPlan)} $ </b>
              </span>
              <Grid.Row columns={avarageOfferPlan.length}>
                {avarageOfferPlan.map(c => (
                  <Grid.Column key={c.text}>
                    <Card
                      as={<Grid.Column width={1} />}
                      name={c.name}
                      price={c.price}
                      day={c.day}
                      key={c.name}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>
              <span className="tp-offer-row">
                Luxury Offer Plan <b>{calculateCost(highOfferPlan)} $</b>
              </span>
              <Grid.Row columns={highOfferPlan.length}>
                {highOfferPlan.map(c => (
                  <Grid.Column key={c.text}>
                    <Card
                      as={<Grid.Column width={1} />}
                      name={c.name}
                      price={c.price}
                      day={c.day}
                      key={c.name}
                    />
                  </Grid.Column>
                ))}
              </Grid.Row>
            </Grid>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default TripPlanner;
