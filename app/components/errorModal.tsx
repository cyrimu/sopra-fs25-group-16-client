import React from "react";
import { Modal } from "antd";

interface ErrorModalProps {
  visible: boolean;
  onClose: () => void;
  message: string;
}

const ErrorModal: React.FC<ErrorModalProps> = ({
  visible,
  onClose,
  message,
}) => {
  return (
    <Modal open={visible} onOk={onClose} onCancel={onClose} footer={null}>
      <p>{message}</p>
    </Modal>
  );
};

export default ErrorModal;
