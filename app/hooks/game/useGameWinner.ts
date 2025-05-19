import { selectGameId, selectWinner } from "@/lib/features/game";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch } from "@/lib/store";
import { useEffect } from "react";

export const useGameWinner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const winner = useSelector(selectWinner);
  const gameId = useSelector(selectGameId);
  const router = useRouter();

  useEffect(() => {
    if (winner) {
      // Redirect to the results page
      router.push(`/results/${gameId}`);
    }
  }, [dispatch, gameId, router, winner]);
};
