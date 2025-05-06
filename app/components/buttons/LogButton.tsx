import BookOutlined from "@ant-design/icons/lib/icons/BookOutlined";
import { Button as AntButton } from "antd";
import styles from "./LogButton.module.css";
import React, { useState } from "react";
import { LogModal } from "../LogModal";

const LogButton: React.FC = () => {
  const [modal, setModal] = useState(false);

  const showModal = () => setModal(true);
  const hideModal = () => setModal(false);

  return (
    <div className={styles.logWrapper}>
      <div onClick={showModal}>
        <AntButton
          type="primary"
          icon={<BookOutlined style={{ fontSize: "30px" }} />}
          shape="circle"
          style={{ width: 50, height: 50 }}
        />
        <LogModal visible={modal} onClose={hideModal} />
      </div>
    </div>
  );
};

export default LogButton;
