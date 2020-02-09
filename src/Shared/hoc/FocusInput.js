import React, { useRef, useEffect } from 'react';
import classes from './FocusInput.module.css';

const FocusInput = ({ children }) => {
   let inputRef = useRef(null);
   let elements = React.Children.toArray(children);
   let inputEl;

   if (elements.length === 1) {
      inputEl = React.cloneElement(elements[0], {
         className: classes.inputElement,
         placeholder: 'התחל להקליד כאן',
         ref: inputRef
      });
   }

   useEffect(() => {
      //   console.log(inputRef.current);
      inputRef.current.focus();
   }, []);

   return <div>{inputEl}</div>;
};

export default FocusInput;
