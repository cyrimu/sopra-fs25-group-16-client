import { selectLogs, selectPlayers } from "@/lib/features/game";
import { CloseOutlined } from "@ant-design/icons";
import Modal from "antd/es/modal";
import { FC } from "react";
import { useSelector } from "react-redux";

interface LogModalProps {
    visible: boolean;
    onClose: () => void;
}

// eslint-disable-next-line
const getTeamColor = (log: any, players: any[] = []): string => {
    let logString = "";

    if (typeof log === "string") {
        logString = log;
    } else if (log?.props?.children) {
        logString = Array.isArray(log.props.children)
            ? log.props.children.join(" ")
            : log.props.children;
    }


    const firstWord = logString.split(" ")[0]?.trim()?.toLowerCase(); // Normalize first word


    const player = players.find(
        (p) => p.playerName?.trim()?.toLowerCase() === firstWord
    );

return player?.team === "BLUE"
        ? "#294C61"
        : player?.team === "RED"
        ? "#651C25"
        : "#f9f9f9";
    };

export const LogModal: FC<LogModalProps> = ({ visible, onClose }) => {
    const logs = useSelector(selectLogs);
    const players = useSelector(selectPlayers) || [];

    const processedLogs = logs?.map((log, index) => {
        if (log.includes("INVALID")) {
            const clueIndex = log.toLowerCase().indexOf("provided");
            if (clueIndex !== -1) {
                return (
                    <span key={index} style={{ fontWeight: "bold" }}>
                        {log.slice(0, clueIndex + 9)}
                        <span>an invalid clue, their turn was skipped</span>
                    </span>
                );
            }
        }
        if (log.includes("Clue")) {
            return (
                <span key={index}>
                    {log.replace(/Clue/g, "clue").replace(/ :(?!.*:)/, ",")}
                </span>
            );
        }
        return <span key={index}>{log}</span>;
    });

    return (
        <Modal
            title={
                <span
                    style={{
                        fontFamily: "Gabarito",
                        fontSize: "20px",
                    }}
                >
                    Game Log
                </span>
            }
            open={visible}
            onCancel={onClose}
            footer={null}
            closeIcon={
                <CloseOutlined
                    style={{ fontSize: 20 }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}
                />
            }
            styles={modalStyles}
        >
            <div
                style={{
                    paddingTop: "10px",
                    fontSize: 16,
                    textAlign: "left",
                    margin: 0,
                    padding: "10px",
                    fontFamily: "Gabarito, sans-serif",
                    lineHeight: "1.5",
                    color: "white"
                }}
            >
                {processedLogs?.map((log, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: "10px",
                            borderBottom: "1px solid #ddd",
                            paddingBottom: "5px",
                            backgroundColor: getTeamColor(log, players),
                            padding: "10px",
                            borderRadius: "5px",
                        }}
                    >
                        {log}
                    </div>
                ))}
            </div>
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
        maxHeight: "500px",
        overflowY: "auto" as const,
    },
};