"use client";
import "@ant-design/v5-patch-for-react-19";
import { useRouter } from "next/navigation";
import styles from "@/styles/page.module.css";

export default function Home() {
    const router = useRouter();

    return (
        <div className={styles.page}>
            <div className={styles.redblueoverlay}></div>
            <main className={styles.main}>
                {}
            </main>
        </div>
    );
}