"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, persistor } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";
import GlobalLoader from "@/components/GlobalLoader";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<GlobalLoader />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
