

import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import React, {useEffect, useMemo, useState} from "react";
import { setSelectedCard } from "@/lib/features/game";
import { selectMyPlayerInGame } from "../../utils/helpers";
import { useErrorModal } from "@/context/ErrorModalContext";
import { FlagFilled, FlagOutlined } from "@ant-design/icons";
import { selectTurn } from "@/lib/features/game";
import Image from "next/image";
//queued and cached image requests
import { enqueue } from "@/lib/features/game/imageQueue";
import {
  getCachedImage,
  setCachedImage,
  markIfNotInFlight
} from "@/lib/features/game/imageCache";

//image mode
import {GAME_TYPE} from "@/lib/features/game/game.types";
import {ApiService} from "@/api/apiService";

interface GameCardProps {
  card: Card;
  selected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, selected }) => {
  const dispatch = useDispatch();
  const { showError } = useErrorModal();
  const [isFlagged, setIsFlagged] = useState(false);

// added type to card
  const { color, content, isRevealed, type } = card;
  const myPlayerInGame = useSelector(selectMyPlayerInGame);
  const turn = useSelector(selectTurn);
  const isMyTurn = myPlayerInGame?.role === turn;

//start image mode
  const [base64Image, setBase64Image] = useState<string | null>(null);

  const isImage = type === GAME_TYPE.PICTURE;
  const shouldShowContent = !isRevealed;
  const shouldRenderImage = shouldShowContent && isImage;
  const shouldRenderText = shouldShowContent && !isImage;


  useEffect(() => {
    if (isImage && shouldRenderImage && content) {
      const cached = getCachedImage(content);
      if (cached) {
        setBase64Image(cached);
        return;
      }
  
      if (!markIfNotInFlight(content)) {
        return;
      }
  
      enqueue(async () => {
        const apiService = new ApiService();
        try {
          const dataUrl = await apiService.getBase64Image(content);
          setCachedImage(content, dataUrl);
          setBase64Image(dataUrl);
        } catch {
          // silently ignore base64 fetch errors
        }
      });
    }
  }, [content, isImage, shouldRenderImage]);

//end image mode

  useEffect(() => {
    setIsFlagged(false);
  }, [turn]);

  const animation = useMemo(
      () => ({ rotateY: isRevealed ? 180 : 0 }),
      [isRevealed]
  );

  const backgroundImage = useMemo(() => {
    const role = myPlayerInGame?.role;

    if (!role) {
      showError("The role of the player in game is null");
      return CARD_COLOR.WHITE;
    }

    if (
        (role === PLAYER_ROLES.BLUE_OPERATIVE ||
            role === PLAYER_ROLES.RED_OPERATIVE) &&
        !isRevealed
    ) {
      return CARD_COLOR.WHITE;
    }
    return color;
  }, [myPlayerInGame, isRevealed, color, showError]);

  function handleSelectCard() {
    const role = myPlayerInGame?.role;

    if (!role) {
      showError("The role of the player in game is null");
      return;
    }

    if (
        role === PLAYER_ROLES.RED_SPYMASTER ||
        role === PLAYER_ROLES.BLUE_SPYMASTER
    )
      return;

    dispatch(setSelectedCard(card.id));
  }

  function toggleFlag() {
    if (isMyTurn &&
        (myPlayerInGame?.role === PLAYER_ROLES.RED_OPERATIVE ||
            myPlayerInGame?.role === PLAYER_ROLES.BLUE_OPERATIVE)) {
      setIsFlagged((prev) => !prev);
    }
  }

  return (
        <motion.div
        className={selected ? styles.cardSelected : styles.card}
        style={{
          "--bg-image": `url("/${CARD_COLOR[backgroundImage].toLowerCase()}_card.png")`,
          //Image Mode Styling
          ...(isImage
            ? {
                width: "150px",
                height: "150px",
                aspectRatio: "1 / 1",
              }
            : {}),
        } as React.CSSProperties}
        animate={animation}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        onClick={handleSelectCard}
      >{shouldRenderImage && (
        <div
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "80%",
              backgroundColor: "white", // white even when loading
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            {base64Image && (
              <Image
                src={base64Image}
                alt="Card Image"
                width={300}
                height={300}
                unoptimized
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
      )}

        {!isRevealed &&
            (myPlayerInGame?.role === PLAYER_ROLES.RED_OPERATIVE ||
                myPlayerInGame?.role === PLAYER_ROLES.BLUE_OPERATIVE) && (
                <div
                    className={styles.flagContainer}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFlag();
                    }}
                >
                  {isFlagged ? (
                      <FlagFilled style={{ fontSize: 20, color: "white" }} />
                  ) : (
                      <FlagOutlined style={{ fontSize: 20, color: "white" }} />
                  )}
                </div>
            )}

      {shouldRenderText && (
        <div className={styles.cardTextContainer}>
          <span>{content.toUpperCase()}</span>
        </div>
      )}
      </motion.div>
  );
};

export default GameCard;