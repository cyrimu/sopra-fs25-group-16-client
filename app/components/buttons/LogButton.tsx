import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";
import { Button as AntButton } from "antd";
import styles from "./LogButton.module.css";
import React from "react";

interface LogButtonProps {
  callback: () => void;
}

const LogButton: React.FC<LogButtonProps> = ({ callback }) => {
  function handleClick() {
    callback();
  }

  return (
    <div onClick={handleClick} className={styles.logButton}>
      <AntButton
        type="primary"
        icon={<BookOutlined style={{ fontSize: "30px" }} />}
        shape="circle"
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default LogButton;
