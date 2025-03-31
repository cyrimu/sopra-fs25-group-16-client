"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter, useParams } from "next/navigation";
import styles from "@/styles/page.module.css";
import { RightOutlined } from "@ant-design/icons";
import { setPlayerName } from "@/lib/features/player";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLobbyId } from "@/lib/features/lobby";


export default function JoinWithID() {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const { id } = params;

    const [username, setUsername] = useState("");

    useEffect(() => {
        if (id) {
            dispatch(setLobbyId(id as string));
        }
    }, [id, dispatch]);

    function handleJoinButton(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        // TODO: Check if lobbyId exists
        dispatch(setPlayerName(username));
        router.push(`/lobby/${id}`);
    }

    return (
        <div className={styles.centered}>
            <div className={styles.blueOverlay}></div>
            <div className={styles.messageContainer}>
                <div className={styles.messageField}>
                    Choose a codename & we’ll create a game lobby for you. <br/>
                    <br/>
                    Await further instructions.
                    <br/>
                    <br/>- CN
                </div>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.inputField}
                        placeholder="Choose your codename ... "
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className={styles.inputField}
                        value={id}
                        disabled={true}
                    />
                    <button className={styles.regularButton} onClick={handleJoinButton}>
                        Join <RightOutlined/>
                    </button>
                </div>
            </div>
        </div>
    );
}