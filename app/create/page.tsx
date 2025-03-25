"use client";
import "@ant-design/v5-patch-for-react-19";
import {useRouter} from "next/navigation";
import styles from "@/styles/page.module.css";
import {RightOutlined} from "@ant-design/icons";


export default function Create() {
    const router = useRouter();


    return (
        <div className={styles.centered}>
            <div className={styles.redOverlay}></div>
            <div className={styles.messageContainer}>
                <div className={styles.messageBox}>
                    Choose a codename & we’ll create a game lobby for you. <br/>
                    <br/>
                    Await further instructions.<br/>
                    <br/>
                    - CN
                </div>
                <div className={styles.inputContainer}>
                    <input
                        className={styles.inputField}
                        placeholder="Choose your codename ... "
                    />
                    <button className={styles.regularButton} onClick={() => router.push("create/id")}>
                        Next <RightOutlined/>
                    </button>
                </div>
            </div>
        </div>
    );
}