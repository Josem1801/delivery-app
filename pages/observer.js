import useLazyFood from "hooks/useLazyFood";
import React, { useEffect, useRef, useState } from "react";

function Observer() {
  const [show, setShow] = useState(false);
  const foodRef = useRef();

  useEffect(() => {
    function onChange(entries) {
      const element = entries[0];
      console.log(element);
      if (element.isIntersecting) {
        console.log(show);
        setShow(true);
      }
    }
    const observer = new IntersectionObserver(onChange, {
      rootMargin: "50px",
    });
    observer.observe(foodRef.current);
  }, [show]);
  return (
    <div style={{ minHeight: 2000, display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1 }}></div>
      <div ref={foodRef} style={{ minHeight: 20 }}></div>
    </div>
  );
}

export default Observer;
