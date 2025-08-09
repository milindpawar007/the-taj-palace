import { useEffect, useRef } from "react";

function useOutSideClick(handler ,listenCapturing=true) {
    
    const ref = useRef();
    useEffect(() => {
       function handleClick(e) {
         if (ref.current && !ref.current.contains(e.target)) {
           handler();
         }
   
       }
       const timer = setTimeout(() => {
         document.addEventListener("click", handleClick, listenCapturing);
       }, 0);
       return () => {
         clearTimeout(timer);
         document.removeEventListener("click", handleClick, listenCapturing);
       };
     }, [handler,listenCapturing])

     return {ref}
}

export default useOutSideClick
