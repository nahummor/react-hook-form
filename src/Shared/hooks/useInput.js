import { useState } from 'react';

function useInput(initialState = '') {
   const [value, setValue] = useState(initialState);

   const reset = () => {
      setValue(initialState);
   };

   const bind = {
      value: value,
      onChange: event => setValue(event.target.value)
   };

   return [value, bind, reset];
}

export default useInput;
