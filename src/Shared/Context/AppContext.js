/**
 * Application Context
 */

import React, { useState, useEffect } from 'react';

export const AppContext = React.createContext({
   getCitiesList: () => {}
});

const AppContextProvider = props => {
   const [cites, setCites] = useState([]);

   useEffect(() => {
      setCites(['באר שבע', 'ירושלים', 'תל אביב']);
   }, []);

   const getCitiesList = () => {
      return cites;
   };

   return (
      <AppContext.Provider value={{ getCitiesList: getCitiesList }}>
         {props.children}
      </AppContext.Provider>
   );
};

export default AppContextProvider;
