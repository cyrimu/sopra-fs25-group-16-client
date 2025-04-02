import styles from "@/styles/log.module.css";
import { CloseOutlined } from "@ant-design/icons";

interface LogDialogProps {
  callback: () => void;
}

const LogDialog: React.FC<LogDialogProps> = ({ callback }) => {
  function handleClose() {
    callback();
  }

  return (
    <div className={styles.logWrapper}>
      <div className={styles.logClose} onClick={handleClose}>
        <CloseOutlined />
      </div>
    </div>
  );
};

export default LogDialog;
