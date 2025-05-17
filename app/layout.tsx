// "use client";
import { GameStartingProvider } from "./context/GameStartingContext";
import { ErrorModalProvider } from "./context/ErrorModalContext";
import { WebSocketProvider } from "./context/WebsocketContext";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import RulesButton from "@/components/buttons/RulesButton";
import { LoaderProvider } from "./context/LoaderContext";
import StoreProvider from "./providers/StoreProvider";
import { Geist, Geist_Mono } from "next/font/google";
import GlobalLoader from "./components/GlobalLoader";
import { ConfigProvider, theme } from "antd";
import type { Metadata } from "next";
import "@/styles/globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codenames",
  description: "sopra-fs25-template-client",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <GlobalLoader />
          <ConfigProvider
            theme={{
              algorithm: theme.defaultAlgorithm,
              token: {
                // general theme options are set in token, meaning all primary elements (button, menu, ...) will have this color
                colorPrimary: "#22426b", // selected input field boarder will have this color as well
                borderRadius: 8,
                colorText: "black",
                fontSize: 16,
                fontFamily: "Gabarito",

                // Alias Token
                colorBgContainer: "#16181D",
              },
              // if a component type needs special styling, setting here will override default options set in token
              components: {
                Button: {
                  colorPrimary: "rgba(217, 217, 217, 0.5)",
                  algorithm: true, // enable algorithm (redundant with line 33 but here for demo purposes)
                  controlHeight: 38,
                },
                Input: {
                  colorBorder: "gray", // color boarder selected is not overridden but instead is set by primary color in line 35
                  colorTextPlaceholder: "#888888",
                  algorithm: false, // disable algorithm (line 32)
                },
                Form: {
                  labelColor: "#fff",
                  algorithm: theme.defaultAlgorithm,
                },
                Card: {},
                Select: {
                  activeBorderColor: "white",
                  selectorBg: "white",
                  colorTextPlaceholder: "black",
                  optionSelectedBg: "#2f2f2f",
                  optionSelectedColor: "white",
                },
                InputNumber: {
                  colorBorder: "gray",
                  colorTextPlaceholder: "#888888",
                  algorithm: true,
                  filledHandleBg: "white",
                  addonBg: "white",
                  colorText: "black",
                  colorTextDescription: "black",
                  colorTextHeading: "black",
                  colorTextLabel: "black",
                },
              },
            }}
          >
            <AntdRegistry>
              <ErrorModalProvider>
                <GameStartingProvider>
                  <WebSocketProvider>
                  <LoaderProvider>{children}</LoaderProvider>
                  </WebSocketProvider>
                </GameStartingProvider>
              </ErrorModalProvider>

              <RulesButton />
            </AntdRegistry>
          </ConfigProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
