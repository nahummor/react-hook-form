import React from 'react';
import * as Yup from 'yup';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DeleteIcon from '@material-ui/icons/Delete';
import classes from './Student.module.css';

const formSchema = Yup.object().shape({
   firstName: Yup.string()
      .required('שם פרטי שדה חובה')
      .min(2, 'שם פרטי לפחות 2 תוים'),
   lastName: Yup.string()
      .required('שם משפחה שדה חובה')
      .min(2, 'שם משפחה לפחות 2 תוים'),
   subject: Yup.string().required('מקצוע שדה חובה'),
   email: Yup.string()
      .email('כתובת מייל לא תקנית')
      .required('כתובת מייל שדה חובה')
});

const Student = () => {
   const {
      control,
      register,
      handleSubmit,
      errors,
      formState,
      reset
   } = useForm({
      mode: 'onChange',
      validationSchema: formSchema
   });

   const { fields, append, remove } = useFieldArray({
      control: control,
      name: 'places'
   });

   const onSubmit = data => {
      console.log(data);

      // reset form fields
      reset({
         firstName: '',
         lastName: '',
         subject: 'אנגלית',
         email: '',
         done: false
      });
   };

   const onAddPlaceHandler = () => {
      append({ name: '' });
   };

   const placesEl = fields.map((place, index) => {
      return (
         <div key={place.id} className={classes.newPlaceRow}>
            <FormControl>
               <Input
                  placeholder='מיקום חדש'
                  name={`places[${index}].name`}
                  inputRef={register()}
               />
            </FormControl>
            <IconButton aria-label='delete' onClick={() => remove(index)}>
               <DeleteIcon />
            </IconButton>
         </div>
      );
   });

   return (
      <div className={classes.studentContainer}>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
               <CardContent className={classes.addNewStudentForm}>
                  <h2>New Student</h2>
                  <FormControl>
                     <InputLabel htmlFor='txtFirstName'>שם פרטי</InputLabel>
                     <Input
                        name='firstName'
                        id='txtFirstName'
                        inputRef={register}
                     />
                     {errors.firstName ? (
                        <FormHelperText id='txtFirstName-text' error>
                           {errors.firstName.message}
                        </FormHelperText>
                     ) : (
                        <FormHelperText id='txtFirstName-text'>
                           {' '}
                        </FormHelperText>
                     )}
                  </FormControl>
                  <FormControl>
                     <InputLabel htmlFor='txtLastName'>שם משפחה</InputLabel>
                     <Input
                        name='lastName'
                        id='txtLastName'
                        inputRef={register}
                     />
                     {errors.lastName ? (
                        <FormHelperText id='txtLastName-text' error>
                           {errors.lastName.message}
                        </FormHelperText>
                     ) : (
                        <FormHelperText id='txtLastName-text'> </FormHelperText>
                     )}
                  </FormControl>
                  <FormControl>
                     <InputLabel id='demo-simple-select-label'>
                        מקצוע
                     </InputLabel>
                     <Controller
                        as={
                           <Select
                              labelId='demo-simple-select-label'
                              id='subject'>
                              <MenuItem value={'חשמל'}>חשמל</MenuItem>
                              <MenuItem value={'מחשבים'}>מחשבים</MenuItem>
                              <MenuItem value={'אנגלית'}>אנגלית</MenuItem>
                           </Select>
                        }
                        name='subject'
                        control={control}
                        onChange={([selected]) => {
                           // React Select return object instead of value for selection
                           console.log(selected);
                           return selected.target.value;
                        }}
                        defaultValue={'אנגלית'}
                     />
                     {errors.subject ? (
                        <FormHelperText id='txtSubject-text' error>
                           {errors.subject.message}
                        </FormHelperText>
                     ) : (
                        <FormHelperText id='txtSubject-text'> </FormHelperText>
                     )}
                  </FormControl>
                  <FormControl>
                     <InputLabel htmlFor='txtEmail'>כתובת מייל</InputLabel>
                     <Input name='email' id='txtEmail' inputRef={register} />
                     {errors.email ? (
                        <FormHelperText id='txtEmail-text' error>
                           {errors.email.message}
                        </FormHelperText>
                     ) : (
                        <FormHelperText id='txtEmail-text'> </FormHelperText>
                     )}
                  </FormControl>
                  <div className={classes.checkboxRow}>
                     <InputLabel>בוצע</InputLabel>
                     <Controller
                        as={<Checkbox name='SomeName' />}
                        name='done'
                        value='test'
                        control={control}
                        defaultValue={false}
                     />
                  </div>
                  <div className={classes.action}>
                     <Button
                        className={classes.actionButton}
                        type='submit'
                        variant='contained'
                        color='primary'
                        disabled={!formState.isValid}>
                        הוספה
                     </Button>
                     <Button
                        onClick={onAddPlaceHandler}
                        className={classes.actionButton}
                        type='button'
                        variant='contained'
                        color='primary'
                        title='הוספת מיקום חדש'>
                        חדש
                     </Button>
                  </div>
               </CardContent>
            </Card>
            <Card className={classes.card}>
               <CardContent className={classes.placesCardContent}>
                  <h3>מיקומים</h3>
                  {placesEl}
               </CardContent>
            </Card>
         </form>
      </div>
   );
};

export default Student;
