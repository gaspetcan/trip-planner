import React, { useState, useEffect } from 'react';
import { Checkbox, Label } from 'semantic-ui-react';
import './style.scss';
import { Photos } from '../../agent';

const Card = ({ name, price, selectedCities, addCity, deleteCity, day }) => {
  const [choose, setChoose] = useState(false);
  const [imageURL, setImageURL] = useState();

  useEffect(() => {
    if (!imageURL)
      Photos.get(name)
        .then(response => response.text())
        .then(result => setImageURL(JSON.parse(result)?.photos[0]?.src?.medium))
        .catch(error => error);
  }, [choose, imageURL]);

  const selectAction = () => {
    setChoose(!choose);
    if (!choose) addCity(selectedCities, { name, price });
    if (choose) deleteCity(selectedCities, { name, price });
  };

  return (
    <div className={choose ? 'hp-card-chosen' : 'hp-card'}>
      {selectedCities && (
        <Checkbox className="card-checkbox" onClick={selectAction} />
      )}
      <img className="card-image" src={imageURL} alt="" />
      <span className="card-price">
        <Label as="a" color={choose ? 'yellow' : 'gray'} image>
          {price} $
        </Label>
      </span>
      <span className="card-name">{name}</span>
      {day && <span className="card-day">{day} Day</span>}
    </div>
  );
};

export default Card;
