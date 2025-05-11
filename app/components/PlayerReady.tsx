import {selectPlayerName} from "@/lib/features/player";
import {AppDispatch} from "@/lib/store";
import {motion} from "framer-motion";
import {CheckCircle, XCircle} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";

interface PlayerReadyStatusProps {
    isReady: boolean;
    isSelf?: boolean;
    isAssigned?: boolean;
}

export const PlayerReadyStatus = ({
                                    isReady,
                                    isSelf = false,
                                    isAssigned = false,
                                  }: PlayerReadyStatusProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const playerName = useSelector(selectPlayerName);

  function sendPlayerReady() {
    if (isAssigned && playerName) {
      dispatch({
        type: "lobby/ready",
        payload: playerName,
      });
    }
  }

  return (
      <motion.div
          whileHover={{ scale: isSelf && isAssigned ? 1.02 : 1 }}
          whileTap={{ scale: isSelf && isAssigned ? 0.98 : 1 }}
          className={`flex items-center justify-between px-4 py-2 rounded-2xl shadow-md transition-all duration-300 ${
              isReady ? "bg-green-100" : "bg-gray-100"
          } ${isSelf && isAssigned ? "cursor-pointer hover:shadow-lg" : ""}`}
          onClick={isSelf && isAssigned ? sendPlayerReady : undefined}
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