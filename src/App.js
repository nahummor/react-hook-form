import React from 'react';
import './App.css';

import AppRoutes from './AppRoutes/AppRoutes';

import Toolbar from './Toolbar/Toolbar';

function App() {
   return (
      <div className='App'>
         <Toolbar />
         <h2>React Hook Form</h2>
         <AppRoutes />
      </div>
   );
}

export default App;
