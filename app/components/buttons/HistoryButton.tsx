"use client";
import React, { useState } from "react";
import { Button as AntButton, ButtonProps } from "antd";
import styles from "./HistoryButton.module.css";
import { HistoryOutlined } from "@ant-design/icons";
import HistoryModal from "../HistoryModal";

const HistoryButton: React.FC<ButtonProps> = ({ ...props }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return (
    <div className={styles.rulesButton}>
      <AntButton
        {...props}
        icon={
          <div style={{ fontSize: "30px" }}>
            <HistoryOutlined />
          </div>
        }
        shape="circle"
        style={{ width: 50, height: 50 }}
        onClick={showModal}
      />
      <HistoryModal visible={isModalVisible} onClose={hideModal} />
    </div>
  );
};

export default HistoryButton;
