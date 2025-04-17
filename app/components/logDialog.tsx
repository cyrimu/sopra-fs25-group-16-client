import { useSelector } from "react-redux";
import styles from "./LogDialog.module.css";
import { CloseOutlined } from "@ant-design/icons";
import { selectLogs } from "@/lib/features/game";

interface LogDialogProps {
  callback: () => void;
}

const LogDialog: React.FC<LogDialogProps> = ({ callback }) => {
  function handleClose() {
    callback();
  }

  const logs = useSelector(selectLogs);

  return (
    <div className={styles.logWrapper}>
      <div className={styles.logClose} onClick={handleClose}>
        <CloseOutlined />
        <ul
          style={{
            paddingTop: "20px",
            fontSize: 16,
            textAlign: "center",
            listStyleType: "none",
            margin: 0,
            padding: 0,
          }}
        >
          {logs?.map((l, index) => (
            <li key={index}>{l}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LogDialog;
