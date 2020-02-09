import React from 'react';
import { Route } from 'react-router-dom';
import Student from '../Student/Student';
import Worker from '../Worker/Worker';
import Form1 from '../Form1/Form1';
import Form2 from '../Form2/Form2';

const AppRouter = () => {
   return (
      <div>
         <Route path='/student' exact component={Student} />
         <Route path='/worker' exact component={Worker} />
         <Route path='/form1' exact component={Form1} />
         <Route path='/form2' exact component={Form2} />
      </div>
   );
};

export default AppRouter;
