import React, { useEffect, useRef, useState } from "react";

function useLazyFood(elementToObserve) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (elementToObserve) {
      function onChange(entries) {
        const element = entries[0];

        if (element.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      }
      const observer = new IntersectionObserver(onChange, {
        rootMargin: "100px",
      });
      observer.observe(elementToObserve);
    }
  }, [show, elementToObserve]);
  return { show };
}

export default useLazyFood;
