import { useEffect, useState } from "react";

function useLazyFood(elementToObserve) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (elementToObserve) {
      let observer;
      function onChange(entries) {
        const element = entries[0];
        if (element.isIntersecting) {
          setShow(true);
        } else {
          setShow(false);
        }
      }

      Promise.resolve(
        typeof IntersectionObserver !== "undefined"
          ? IntersectionObserver
          : import("intersection-observer")
      ).then(() => {
        observer = new IntersectionObserver(onChange, {
          rootMargin: "30px",
        });

        observer.observe(elementToObserve);
      });
    }
  }, [elementToObserve, show]);
  return { show };
}

export default useLazyFood;
