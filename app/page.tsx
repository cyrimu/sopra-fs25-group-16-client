"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";
import LargeButton from "@/components/largeButton";

export default function Home() {
    const router = useRouter();

    return (
        <div className={styles.centered}>
            <div className={styles.redBlueOverlay}></div>
            <div style={{ display: "flex", width: "100%", justifyContent: "center", alignItems: "center"}}>
                <LargeButton onClick={() => router.push("/join/page")}>Create</LargeButton>
                <LargeButton onClick={() => console.log("Right clicked")}>Join</LargeButton>
            </div>
        </div>
    );
}
