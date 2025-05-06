"use client";
import React from "react";
import { Button as AntButton, Popconfirm } from "antd";
import styles from "./SaveButton.module.css";
import { SaveOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";

const SaveButton: React.FC = () => {
  const router = useRouter();

  function handleSaveLobby() {
    router.back();
  }

  return (
    <div className={styles.rulesButton}>
      <Popconfirm
        title={
          <span style={{ color: "black" }}>
            Do you want to quit and save the lobby?
          </span>
        }
        onConfirm={handleSaveLobby}
        okText="Yes"
        cancelText="No"
        icon={false}
      >
        <AntButton
          icon={
            <div style={{ fontSize: "30px" }}>
              <SaveOutlined />
            </div>
          }
          type="primary"
          shape="circle"
          style={{ width: 50, height: 50 }}
        />
      </Popconfirm>
    </div>
  );
};

export default SaveButton;
