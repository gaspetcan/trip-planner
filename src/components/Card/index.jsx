import React, { useState } from 'react';
import { Checkbox } from 'semantic-ui-react';
import './style.scss';
import mockImage from '../../common/images/bg.jpg';

const Card = ({ name, price, selectedCities, addCity, deleteCity }) => {
  const [choose, setChoose] = useState(false);

  const selectAction = () => {
    setChoose(!choose);
    if (!choose) addCity(selectedCities, { name, price });
    if (choose) deleteCity(selectedCities, { name, price });
  };

  return (
    <div className={choose ? 'hp-card-chosen' : 'hp-card'}>
      <Checkbox className="card-checkbox" onClick={selectAction} />
      <img className="card-image" src={mockImage} alt="" />
      <span className="card-price">{price} $</span>
      <span className="card-name">{name}</span>
    </div>
  );
};

export default Card;
