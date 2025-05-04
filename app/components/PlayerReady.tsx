import { selectPlayerName } from "@/lib/features/player";
import { AppDispatch } from "@/lib/store";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface PlayerReadyStatusProps {
  isReady: boolean;
  isSelf?: boolean;
}

export const PlayerReadyStatus = ({
  isReady,
  isSelf = false,
}: PlayerReadyStatusProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const playerName = useSelector(selectPlayerName);

  function sendPlayerReady() {
    if (playerName)
      dispatch({
        type: "socket/ready",
        payload: playerName,
      });
  }

  return (
    <motion.div
      whileHover={{ scale: isSelf ? 1.02 : 1 }}
      whileTap={{ scale: isSelf ? 0.98 : 1 }}
      className={`flex items-center justify-between px-4 py-2 rounded-2xl shadow-md transition-all duration-300 ${
        isReady ? "bg-green-100" : "bg-gray-100"
      } ${isSelf ? "cursor-pointer hover:shadow-lg" : ""}`}
      onClick={isSelf ? sendPlayerReady : undefined}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="ml-2"
      >
        {isReady ? (
          <CheckCircle className="text-green-500" />
        ) : (
          <XCircle className="text-gray-400" />
        )}
      </motion.div>
    </motion.div>
  );
};
