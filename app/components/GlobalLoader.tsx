"use client";
import { Spin } from "antd";
import styles from "./GlobalLoader.module.css";

const GlobalLoader = () => {
  return (
    <div className={styles.overlay}>
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoader;
