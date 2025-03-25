"use client";
import "@ant-design/v5-patch-for-react-19";
import {useRouter} from "next/navigation";
import styles from "@/styles/page.module.css";
import {CopyOutlined} from "@ant-design/icons";


export default function Create() {
    const router = useRouter();
    return (
        <div className={styles.centered}>
            <div className={styles.redOverlay}></div>
            <div className={styles.messageContainer}>
                <div className={styles.messageField}>
                    Share the following ID with your fellow spies. <br/>
                    <br/>
                    They have been instructed to join you. <br/>
                    <br/>
                    - CN
                    <br/>
                    {/*ensure the right link is copied when ready*/}
                    <button className={styles.regularButton} style={{width: '100%', marginBottom: '10px'}} onClick={() => navigator.clipboard.writeText('insert copyable text when ready')}>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <span>some.link/uzh-123</span>
                            <CopyOutlined/>
                        </div>
                    </button>
                    {/*ensure the right text is copied when ready*/}
                    <button className={styles.regularButton} style={{width: '100%'}} onClick={() => navigator.clipboard.writeText('insert copyable text when ready')}>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <span>uzh-123</span>
                            <CopyOutlined/>
                        </div>
                    </button>
                </div>
                <div className={styles.regularButtonContainer}>
                    {/*change routing to next screen when ready*/}
                    <button className={styles.regularButton} onClick={() => router.push("/")}>
                        Delete Lobby
                    </button>
                    {/*implement actual deletion of lobby*/}
                    <button className={styles.regularButton} onClick={() => router.push("create/id")}>
                        Open Lobby
                    </button>
                </div>
            </div>
        </div>
    );
}