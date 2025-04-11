import React from "react";
import styles from "./LargeButton.module.css";

type LargeButtonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

const LargeButton: React.FC<LargeButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className={styles.landingButton}>
      {children}
    </button>
  );
};

export default LargeButton;
