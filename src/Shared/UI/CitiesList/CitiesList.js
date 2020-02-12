import React, { useContext, useMemo } from 'react';
import { AppContext } from '../../Context/AppContext';
import classes from './CitiesList.module.css';

const CitiesList = props => {
   const appContext = useContext(AppContext);
   const { getCitiesList } = appContext;

   /**
    * create cities list
    */
   const cities = useMemo(() => {
      console.log('create city list........');
      return getCitiesList().map((city, index) => {
         return (
            <option key={index} value={city}>
               {city}
            </option>
         );
      });
   }, [getCitiesList]);

   console.log('Create city list component .........');

   return (
      <select
         name='city'
         className={classes.citiesList}
         onChange={event => props.onCityChangeHandler(event.target.value)}>
         {cities}
      </select>
   );
};

export default React.memo(CitiesList);
