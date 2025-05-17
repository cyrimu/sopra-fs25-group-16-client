"use client";
import { useGlobalLoader } from "../context/LoaderContext";
import { Spin } from "antd";
import styles from "./GlobalLoader.module.css";

const GlobalLoader = () => {
  const { loading } = useGlobalLoader();

  if (!loading) return null;

  return (
    <div className={styles.overlay}>
      <Spin size="large" />
    </div>
  );
};

export default GlobalLoader;
