"use client";
import React, {useState} from "react";
import {Button as AntButton, Tooltip} from "antd";
import styles from "./HistoryButton.module.css";
import {HistoryOutlined} from "@ant-design/icons";
import HistoryModal from "../HistoryModal";

const HistoryButton: React.FC = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => setIsModalVisible(true);
    const hideModal = () => setIsModalVisible(false);

    return (
        <div>
            <div className={styles.rulesButton}>
                <Tooltip title="Access saved games to continue playing">
                    <AntButton
                        icon={
                            <div style={{fontSize: "30px"}}>
                                <HistoryOutlined/>
                            </div>
                        }
                        type="primary"
                        shape="circle"
                        style={{width: 50, height: 50}}
                        onClick={showModal}
                    />
                </Tooltip>
            </div>
            <div style={{display: "flex", justifyContent: "center"}}>
                <HistoryModal visible={isModalVisible} onClose={hideModal}/>
            </div>
        </div>
    );
};

export default HistoryButton;
