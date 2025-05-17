import { useErrorModal } from "@/context/ErrorModalContext";
import { selectUsername } from "@/lib/features/player";
import { AppDispatch } from "@/lib/store";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

interface PlayerReadyStatusProps {
  isReady: boolean;
  isSelf: boolean;
  isAssigned: boolean;
}

export const PlayerReadyStatus = ({
  isReady,
  isSelf,
  isAssigned,
}: PlayerReadyStatusProps) => {
  const { showError } = useErrorModal();
  const dispatch = useDispatch<AppDispatch>();
  const username = useSelector(selectUsername);

  function sendPlayerReady() {
    // You can't mark other players as ready
    if (!isSelf) return;
    // Is mandatory to have assigned a role
    if (!isAssigned) {
      showError("To be ready you need first to have assigned a role");
      return;
    }
    // Send the ready message to the backend
    dispatch({
      type: "lobby/ready",
      payload: username,
    });
  }

  return (
    <motion.div
      whileHover={{ scale: isSelf && isAssigned ? 1.02 : 1 }}
      whileTap={{ scale: isSelf && isAssigned ? 0.98 : 1 }}
      className={`flex items-center justify-between px-4 py-2 rounded-2xl shadow-md transition-all duration-300 ${
        isReady ? "bg-green-100" : "bg-gray-100"
      } ${isSelf && isAssigned ? "cursor-pointer hover:shadow-lg" : ""}`}
      onClick={sendPlayerReady}
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
