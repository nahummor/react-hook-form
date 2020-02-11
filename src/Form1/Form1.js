import React, { useState, useEffect, useRef, useCallback } from 'react';
import classes from './Form1.module.css';

import FocusInput from '../Shared/hoc/FocusInput';
import CitiesList from '../Shared/UI/CitiesList/CitiesList';

/**
 * manage form state by useState
 */

const Form1 = () => {
   const inputPlaceRef = useRef();
   const [petName, setPetName] = useState('');
   const [petType, setPetType] = useState('');
   const [places, setPlaces] = useState([]);
   const [city, setCity] = useState('');
   const [deletePlace, setDeletePlace] = useState(false);

   useEffect(() => {
      console.log('Form1 Component start....');
      return () => {
         console.log('Form1 Component Done....');
      };
   }, []);

   useEffect(() => {
      console.log(deletePlace);
      if (places.length > 0 && !deletePlace) {
         // set focus on the last input element
         inputPlaceRef.current.focus();
      }
   }, [places.length, deletePlace]);

   const onFormSubmitHandler = event => {
      event.preventDefault();
      const petObject = {
         petName: petName,
         petType: petType,
         petPlaces: places,
         city: city
      };
      console.log('Pet: ', petObject);
   };

   const onAddNewPlace = () => {
      console.log('Add new place');
      setDeletePlace(false);
      setPlaces(prevPlaces => {
         return [...prevPlaces, ''];
      });
   };

   const onPlaceChangeHandler = (index, value) => {
      const updatedPlaces = [...places];
      updatedPlaces[index] = value;
      setPlaces(updatedPlaces);
   };

   const onDeletePlaceHandler = index => {
      const updatedPlaces = [...places];
      updatedPlaces.splice(index, 1);
      setPlaces(updatedPlaces);
      setDeletePlace(true);
   };

   const onCityChangeHandler = useCallback(city => {
      setCity(city);
   }, []);

   const placesEl = places.map((place, index) => {
      return (
         <div key={index}>
            <input
               value={place}
               placeholder='מקום חדש'
               ref={inputPlaceRef}
               onChange={event => {
                  onPlaceChangeHandler(index, event.target.value);
               }}
            />
            <button
               title='מחיקה'
               type='button'
               onClick={() => {
                  onDeletePlaceHandler(index);
               }}>
               X
            </button>
         </div>
      );
   });

   return (
      <form onSubmit={onFormSubmitHandler} className={classes.petForm}>
         <p>State manege with useState</p>
         <div className={classes.petFormContainer}>
            <label>Pet Name: </label>
            <FocusInput>
               <input
                  name='PetName'
                  value={petName}
                  onChange={event => setPetName(event.target.value)}
               />
            </FocusInput>
            <label>Pet Type: </label>
            <input
               name='PetType'
               value={petType}
               onChange={event => setPetType(event.target.value)}
            />
            <div className={classes.formAction}>
               <button type='button' onClick={onAddNewPlace}>
                  מיקום חדש
               </button>
               <button type='submit'>שמור</button>
            </div>
            <label>City: </label>
            <div>
               <CitiesList onCityChangeHandler={onCityChangeHandler} />
            </div>
            <div></div>
            <div></div>
            <div className={classes.places}>{placesEl}</div>
         </div>
      </form>
   );
};

export default Form1;
