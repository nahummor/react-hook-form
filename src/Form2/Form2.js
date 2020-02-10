import React, { useEffect, useRef, useReducer, useContext } from 'react';
import { AppContext } from '../Shared/Context/AppContext';

import classes from './Form2.module.css';

import FocusInput from '../Shared/hoc/FocusInput';

const initialState = {
   petName: '',
   petType: '',
   places: [],
   city: '',
   deletePlace: false
};

const formReducer = (currentState, action) => {
   switch (action.type) {
      case 'SET_PLACES':
         return {
            ...currentState,
            places: action.places
         };
      case 'ADD_PLACE':
         return {
            ...currentState,
            deletePlace: false,
            places: [...currentState.places, action.place]
         };
      case 'DELETE_PLACE':
         const updatedPlaces = [...currentState.places];
         updatedPlaces.splice(action.index, 1);
         return {
            ...currentState,
            places: updatedPlaces,
            deletePlace: true
         };
      case 'UPDATE_PLACE':
         const updatedPlaces2 = [...currentState.places];
         updatedPlaces2[action.index] = action.place;
         return {
            ...currentState,
            places: updatedPlaces2
         };
      case 'SET_PET_NAME':
         return {
            ...currentState,
            petName: action.petName
         };
      case 'SET_PET_TYPE':
         return {
            ...currentState,
            petType: action.petType
         };
      case 'UPDATE_CITY':
         return {
            ...currentState,
            city: action.city
         };
      default:
         throw new Error('Should not get there');
   }
};

const Form2 = () => {
   const appContext = useContext(AppContext);
   const { getCitiesList } = appContext;
   const inputPlaceRef = useRef();
   const [formState, dispatch] = useReducer(formReducer, initialState);

   useEffect(() => {
      dispatch({ type: 'SET_PLACES', places: [] });

      console.log('Form2 Component start....');
      return () => {
         console.log('Form2 Component Done....');
      };
   }, []);

   //    useEffect(() => {
   //       console.log(getCitiesList());
   //    }, [getCitiesList]);

   useEffect(() => {
      console.log(formState.deletePlace);
      if (formState.places.length > 0 && !formState.deletePlace) {
         // set focus on the last input element
         inputPlaceRef.current.focus();
      }
   }, [formState.places.length, formState.deletePlace]);

   const onFormSubmitHandler = event => {
      event.preventDefault();

      const petObject = {
         petName: formState.petName,
         petType: formState.petType,
         petPlaces: formState.places,
         city: formState.city
      };

      console.log('Pet: ', petObject);
   };

   const onAddNewPlace = () => {
      console.log('Add new place');
      dispatch({ type: 'ADD_PLACE', place: '' });
   };

   const onPlaceChangeHandler = (index, value) => {
      dispatch({ type: 'UPDATE_PLACE', index: index, place: value });
   };

   const onCityChangeHandler = city => {
      dispatch({ type: 'UPDATE_CITY', city: city });
   };

   const onDeletePlaceHandler = index => {
      dispatch({ type: 'DELETE_PLACE', index: index });
   };

   const placesEl = formState.places.map((place, index) => {
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
      <form onSubmit={onFormSubmitHandler} className={classes.petForm}>
         <p>State manege with useReducer</p>
         <div className={classes.petFormContainer}>
            <label>Pet Name: </label>
            <FocusInput>
               <input
                  name='PetName'
                  value={formState.petName}
                  onChange={event =>
                     dispatch({
                        type: 'SET_PET_NAME',
                        petName: event.target.value
                     })
                  }
               />
            </FocusInput>
            <label>Pet Type: </label>
            <input
               name='PetType'
               value={formState.petType}
               onChange={event =>
                  dispatch({
                     type: 'SET_PET_TYPE',
                     petType: event.target.value
                  })
               }
            />
            <label>Cite:</label>
            <div>
               <select
                  className={classes.citiesList}
                  onChange={event => onCityChangeHandler(event.target.value)}>
                  {cities}
               </select>
            </div>
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
