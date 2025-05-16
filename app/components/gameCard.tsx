import { Card, CARD_COLOR } from "@/lib/features/game/card.types";
import { PLAYER_ROLES } from "@/lib/features/player/player.types";
import styles from "./GameCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import React, { useMemo, useEffect, useState } from "react";
import { setSelectedCard } from "@/lib/features/game";
import Image from "next/image";
import { selectMyPlayerInGame } from "../../utils/helpers";
import { GAME_TYPE } from "@/lib/features/game/game.types";
import { ApiService } from "@/api/apiService";

interface GameCardProps {
  card: Card;
  selected: boolean;
}

const GameCard: React.FC<GameCardProps> = ({ card, selected }) => {
  const dispatch = useDispatch();
  const { color, content, isRevealed, type } = card;

  const myPlayerInGame = useSelector(selectMyPlayerInGame);
  const role = myPlayerInGame?.role;

  const isSpymaster =
    role === PLAYER_ROLES.RED_SPYMASTER || role === PLAYER_ROLES.BLUE_SPYMASTER;

  const animation = useMemo(
    () => ({ rotateY: isRevealed ? 180 : 0 }),
    [isRevealed]
  );

  const [base64Image, setBase64Image] = useState<string | null>(null);

  const isImage = type === GAME_TYPE.PICTURE;
  const shouldShowContent = !isRevealed || isSpymaster;
  const shouldRenderImage = shouldShowContent && isImage;
  const shouldRenderText = shouldShowContent && !isImage;

  useEffect(() => {
    if (isImage && shouldRenderImage && content && !content.startsWith("data:")) {
      console.log("Fetching image with ID:", content);
      const apiService = new ApiService();
      apiService
        .getBase64Image(content)
        .then((base64) => {
          const dataUrl = `data:image/png;base64,${base64}`;
          console.log("Image fetched:", dataUrl.slice(0, 50));
        
          if (dataUrl.startsWith("data:image/")) {
            setBase64Image(dataUrl);
          } else {
            console.error("Invalid base64 format:", dataUrl);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch base64 image", err);
        });
    }
  }, [content, isImage, shouldRenderImage]);

  function determineBackgroundImage(): CARD_COLOR {
    if (
      (role === PLAYER_ROLES.BLUE_OPERATIVE || role === PLAYER_ROLES.RED_OPERATIVE) &&
      !isRevealed
    ) {
      return CARD_COLOR.WHITE;
    }
    return color;
  }

  const cardColor = determineBackgroundImage();

  function handleSelectCard() {
    if (!role) throw new Error("The role of the player in game is null");
    if (role === PLAYER_ROLES.RED_SPYMASTER || role === PLAYER_ROLES.BLUE_SPYMASTER)
      return;

    dispatch(setSelectedCard(card.id));
  }

  return (
    <motion.div
      className={selected ? styles.cardSelected : styles.card}
      style={
        {
          "--bg-image": isRevealed || isSpymaster
            ? `url("/${CARD_COLOR[cardColor].toLowerCase()}_card.png")`
            : `url("/white_card.png")`,
          aspectRatio: isImage ? "1 / 1" : "2.15",
        } as React.CSSProperties
      }
      animate={animation}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onClick={handleSelectCard}
    >
      {shouldRenderImage && base64Image && (
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
      backgroundColor: "white",
      borderRadius: "12px", // Adjust to taste
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
    }}
  >
    <Image
  src={base64Image}
  alt="Card Image"
  width={300}
  height={300}
  style={{
    maxWidth: "100%",
    maxHeight: "100%",
    objectFit: "contain"
  }}
/>
  </div>
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