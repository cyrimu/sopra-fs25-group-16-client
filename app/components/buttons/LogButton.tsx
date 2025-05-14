import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";
import { Button as AntButton } from "antd";
import styles from "./LogButton.module.css";
import React, { useState } from "react";
import { LogModal } from "../LogModal";

const LogButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);



  return (
    <div className={styles.logWrapper}>
      <AntButton
          icon={<BookOutlined style={{ fontSize: "30px" }} />}
          type="primary"
          shape="circle"
          style={{ width: 50, height: 50 }}
          onClick={showModal}
      />
      <LogModal visible={isModalVisible} onClose={hideModal} />
    </div>
  );
};

export default LogButton;
