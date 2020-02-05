import React from 'react';
import './App.css';

import Worker from './Worker/Worker';
import Student from './Student/Student';

function App() {
   return (
      <div className='App'>
         <h2>React Hook Form</h2>
         <Worker />
         <Student />
      </div>
   );
}

export default App;
