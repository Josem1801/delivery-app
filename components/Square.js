import React from "react";
import styles from "@stylesComponents/Square.module.css";
function Square({ children, size = 40, ...props }) {
  return (
    <>
      <div
        {...props}
        className={styles.square}
        style={{ width: size, height: size }}
      >
        {children}
      </div>
    </>
  );
}

export default Square;
