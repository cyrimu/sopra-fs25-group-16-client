"use client";
import React, { useState } from "react";
import { Button as AntButton, ButtonProps } from "antd";
import RulesModal from "../rulesModal";
import styles from "./RulesButton.module.css";

const RulesButton: React.FC<ButtonProps> = ({ ...props }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    return (
        <div className={styles.rulesButton}>
            <AntButton
                {...props}
                icon={<span className={styles.rulesIcon}>?</span>}
                shape="circle"
                style={{ width: 50, height: 50 }}
                onClick={showModal}
            />
            <RulesModal visible={isModalVisible} onClose={hideModal} />
        </div>
    );
};

export default RulesButton;