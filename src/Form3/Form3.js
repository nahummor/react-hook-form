import React, { useCallback, useState } from 'react';
import classes from './Form3.module.css';
import CitiesList from '../Shared/UI/CitiesList/CitiesList';
import useInput from '../Shared/hooks/useInput';
import useInputRef from '../Shared/hooks/useInputRef';

function Form3() {
   const [firstName, bindFirstName, resetFirstName] = useInput('');
   const [lastName, bindLastName, resetLastName] = useInput('');
   const [city, setCity] = useState('באר שבע');

   /**
    * Test useInputRef
    */
   const [elRef, bindProps, test1Value] = useInputRef();

   const onCityChangeHandler = useCallback(city => {
      console.log('City: ', city);
      setCity(city);
   }, []);

   const onSubmitHandler = event => {
      event.preventDefault();
      console.log('First Name: ', firstName);
      console.log('Last Name: ', lastName);
      console.log('City: ', city);
      console.log('Test 1: ', test1Value);

      resetFirstName();
      resetLastName();
   };

   return (
      <form onSubmit={onSubmitHandler} className={classes.personForm}>
         <p>State manege with Custom Hook</p>
         <div className={classes.personFormContainer}>
            <input
               type='text'
               {...bindFirstName}
               name='firstName'
               id='firstName'
            />
            <label>שם פרטי</label>
            <input
               type='text'
               {...bindLastName}
               name='lastName'
               id='lastName'
            />
            <label>שם משפחה</label>
            <CitiesList onCityChangeHandler={onCityChangeHandler} />
            <label>עיר</label>
            <input
               type='text'
               name='test1'
               id='test1'
               ref={elRef}
               {...bindProps}
            />
            <label>טסט 1</label>
            <input
               type='text'
               name='test2'
               id='test2'
               ref={elRef}
               {...bindProps}
            />
            <label>טסט 2</label>
            <button type='submit'>שמור</button>
         </div>
      </form>
   );
}

export default Form3;
