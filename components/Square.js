import React from "react";
import styles from "@stylesComponents/Square.module.css";
function Square({ children, size = 35, className, ...props }) {
  return (
    <div
      {...props}
      className={`${styles.square} ${className}`}
      style={{ width: size, height: size }}
    >
      {children}
    </div>
  );
}

export default Square;
