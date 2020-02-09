import React, { useState, useEffect, useRef } from 'react';

import classes from './Form2.module.css';

import FocusInput from '../Shared/hoc/FocusInput';

const Form2 = () => {
   const inputPlaceRef = useRef();
   const [petName, setPetName] = useState('');
   const [petType, setPetType] = useState('');
   const [places, setPlaces] = useState([]);
   const [deletePlace, setDeletePlace] = useState(false);

   useEffect(() => {
      console.log('Form2 Component start....');
      return () => {
         console.log('Form2 Component Done....');
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
         petPlaces: places
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
         <p>State manege with useReducer</p>
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
            <div></div>
            <div></div>
            <div className={classes.places}>{placesEl}</div>
         </div>
      </form>
   );
};

export default Form2;
