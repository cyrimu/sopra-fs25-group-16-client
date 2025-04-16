import { Button as AntButton, ButtonProps } from "antd";
import styles from "./RulesButton.module.css";
import React from "react";

const RulesButton: React.FC = ({ ...props }) => {
  return (
    <div className={styles.rulesButton}>
      <AntButton
        {...props}
        icon={<span className={styles.rulesIcon}>?</span>}
        shape="circle"
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default RulesButton;
