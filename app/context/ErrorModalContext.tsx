"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import ErrorModal from "../components/errorModal";

interface ErrorModalContextType {
  showError: (message: string) => void;
}

const ErrorModalContext = createContext<ErrorModalContextType | undefined>(
  undefined
);

export const ErrorModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showError = useCallback((msg: string) => {
    setMessage(msg);
    setVisible(true);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setMessage("");
  };

  return (
    <ErrorModalContext.Provider value={{ showError }}>
      {children}
      <ErrorModal visible={visible} message={message} onClose={handleClose} />
    </ErrorModalContext.Provider>
  );
};

export const useErrorModal = (): ErrorModalContextType => {
  const context = useContext(ErrorModalContext);
  if (!context) {
    throw new Error("useErrorModal must be used within an ErrorModalProvider");
  }
  return context;
};
