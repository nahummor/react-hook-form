import React from 'react';
import classes from './Toolbar.module.css';
import { NavLink } from 'react-router-dom';

const Toolbar = () => {
   return (
      <div className={classes.toolbar}>
         <NavLink activeClassName={classes.active} exact to='/student'>
            סטודנט חדש
         </NavLink>
         <NavLink activeClassName={classes.active} exact to='/worker'>
            עובד חדש
         </NavLink>
         <NavLink activeClassName={classes.active} exact to='/form1'>
            Form 1
         </NavLink>
         <NavLink activeClassName={classes.active} exact to='/form1'>
            Form 1
         </NavLink>
         <NavLink activeClassName={classes.active} exact to='/form2'>
            Form 2
         </NavLink>
      </div>
   );
};

export default Toolbar;
