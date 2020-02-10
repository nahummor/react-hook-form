import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AppContextProvider from './Shared/Context/AppContext.js';

import App from './App';
import './index.css';

const index = (
   <AppContextProvider>
      <BrowserRouter>
         <App />
      </BrowserRouter>
   </AppContextProvider>
);

ReactDOM.render(index, document.getElementById('root'));
