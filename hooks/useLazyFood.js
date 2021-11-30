import { useEffect, useState } from "react";

function useLazyFood(elementToObserve, change) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setShow(false);
  }, [change]);
  useEffect(() => {
    if (elementToObserve) {
      if (!show) {
        function onChange(entries) {
          const element = entries[0];

          if (element.isIntersecting) {
            setShow(true);
            console.log(show);
          }
        }
        const observer = new IntersectionObserver(onChange, {
          rootMargin: "100px",
        });
        observer.observe(elementToObserve);
      }
    }
  }, [elementToObserve, show]);
  return { show };
}

export default useLazyFood;
