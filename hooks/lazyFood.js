import React, { useEffect, useRef, useState } from "react";

function useLazyFood(elementToObserve) {
  const [show, setShow] = useState();

  useEffect(() => {
    function onChange(entries) {
      const element = entries[0];
      if (element.isIntersecting) {
        setShow(true);
      }
    }
    const observer = new IntersectionObserver(onChange, {
      rootMargin: "100px",
    });
    observer.observe(elementToObserve);
  }, [elementToObserve]);
  return { show };
}

export default useLazyFood;
