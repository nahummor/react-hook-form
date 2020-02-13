import { useRef, useEffect, useState } from 'react';

const useInputRef = (initValue = '') => {
   const elRef = useRef();
   const [value, setValue] = useState(initValue);

   useEffect(() => {
      console.log(elRef.current);
      console.log('Name: ', elRef.current.name);
      console.log('Value: ', elRef.current.value);
      console.log('Type: ', elRef.current.type);
   }, []);
   console.log('Name: ', elRef.current);
   const bind = {
      value: value,
      onChange: event => setValue(event.target.value)
   };

   return [elRef, bind, value];
};

export default useInputRef;
