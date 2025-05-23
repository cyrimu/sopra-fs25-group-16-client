"use client";
import React, { useState } from "react";
import { Button as AntButton, Tooltip } from "antd";
import styles from "./RulesButton.module.css";
import RulesModal from "../rulesModal";

const RulesButton: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => setIsModalVisible(true);
  const hideModal = () => setIsModalVisible(false);

  const icon = <span className={styles.rulesIcon}>?</span>;

  return (
    <div className={styles.rulesButton}>
      <Tooltip title="View Codenames rules">
        <AntButton
          icon={icon}
          type="primary"
          shape="circle"
          style={{ width: 50, height: 50 }}
          onClick={showModal}
        />
      </Tooltip>

      <RulesModal visible={isModalVisible} onClose={hideModal} />
    </div>
  );
};

export default RulesButton;
