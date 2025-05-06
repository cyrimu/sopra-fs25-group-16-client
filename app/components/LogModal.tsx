import { selectLogs } from "@/lib/features/game";
import { CloseOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal";
import { FC } from "react";
import { useSelector } from "react-redux";

interface LogModalProps {
  visible: boolean;
  onClose: () => void;
}

export const LogModal: FC<LogModalProps> = ({ visible, onClose }) => {
  const logs = useSelector(selectLogs);

  return (
    <Modal
      title={
        <span
          style={{
            fontFamily: "Gabarito",
            fontSize: "20px",
            textDecoration: "underline",
          }}
        >
          Logs
        </span>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      closeIcon={<CloseOutlined style={{ fontSize: 20 }} />}
      styles={modalStyles}
    >
      <ul
        style={{
          paddingTop: "10px",
          fontSize: 16,
          textAlign: "center",
          listStyleType: "none",
          margin: 0,
          padding: 0,
        }}
      >
        {logs?.map((log, index) => (
          <li key={index}>{log}</li>
        ))}
      </ul>
    </Modal>
  );
};
const modalStyles = {
  content: {
    fontFamily: "Gabarito",
  },
  header: {
    fontFamily: "Gabarito",
    borderRadius: "20px",
    padding: "20px",
  },
  body: {
    padding: "20px",
  },
};
