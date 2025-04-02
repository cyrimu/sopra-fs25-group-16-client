import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";
import { Button as AntButton } from "antd";
import React from "react";

interface LogButtonProps {
  callback: () => void;
}

const logButton: React.FC<LogButtonProps> = ({ callback }) => {
  function handleClick() {
    callback();
  }

  return (
    <div
      onClick={handleClick}
      style={{ position: "absolute", top: 0, left: 0, margin: "10px" }}
    >
      <AntButton
        type="primary"
        icon={<BookOutlined style={{ fontSize: "30px" }} />}
        shape="circle"
        style={{ width: 50, height: 50 }}
      />
    </div>
  );
};

export default logButton;
