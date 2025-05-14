"use client";
import React, { useState } from "react";
import { Button as AntButton } from "antd";
import styles from "./HistoryButton.module.css";
import { HistoryOutlined } from "@ant-design/icons";
import HistoryModal from "../HistoryModal";

const HistoryButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  return (
<div>
  <div className={styles.rulesButton}>
    <AntButton
      icon={
        <div style={{ fontSize: "30px" }}>
          <HistoryOutlined />
        </div>
      }
      type="primary"
      shape="circle"
      style={{ width: 50, height: 50 }}
      onClick={showModal}
    />
  </div>
  <div style={{ display: "flex", justifyContent: "center"}}>
    <HistoryModal visible={isModalVisible} onClose={hideModal} />
  </div>
</div>
);
};

export default HistoryButton;
