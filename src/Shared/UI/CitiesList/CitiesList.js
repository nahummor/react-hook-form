import React, { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import classes from './CitiesList.module.css';

const CitiesList = props => {
   const appContext = useContext(AppContext);
   const { getCitiesList } = appContext;

   /**
    * create cities list
    */
   const cities = getCitiesList().map((city, index) => {
      return (
         <option key={index} value={city}>
            {city}
         </option>
      );
   });

   return (
      <select
         className={classes.citiesList}
         onChange={event => props.onCityChangeHandler(event.target.value)}>
         {cities}
      </select>
   );
};

export default CitiesList;
