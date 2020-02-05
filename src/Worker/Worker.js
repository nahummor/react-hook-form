import React from 'react';
import { useForm } from 'react-hook-form';
import classes from './Worker.module.css';

const Worker = () => {
   const { register, handleSubmit, watch, errors, formState } = useForm({
      mode: 'onChange'
   });

   const onSubmit = data => {
      console.log(data);
   };

   // watch input value by passing the name of it
   console.log(watch('firstName'));

   return (
      <form onSubmit={handleSubmit(onSubmit)} className={classes.workerForm}>
         <h3>New Worker</h3>
         <div className={classes.addWorkerForm}>
            <div className={classes.formLabel}>
               <label>First Name: </label>
               <label>Last Name: </label>
               <label>Email: </label>
               <label>Job Title: </label>
            </div>
            <div className={classes.formItem}>
               <input
                  name='firstName'
                  ref={register({ required: true, minLength: 2 })}
               />
               {errors.firstName && errors.firstName.type === 'required' && (
                  <p>שדה חובה</p>
               )}
               {errors.firstName && errors.firstName.type === 'minLength' && (
                  <p>על השדה להכיל לפחות 2 תוים</p>
               )}
               <input
                  name='lastName'
                  ref={register({ required: true, minLength: 2 })}
               />
               <input name='email' ref={register({ required: true })} />
               <input name='job' ref={register({ required: true })} />
               <button type='submit' disabled={!formState.isValid}>
                  שלח
               </button>
            </div>
         </div>
      </form>
   );
};

export default Worker;
