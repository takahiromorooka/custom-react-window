import "../assets/global.css";
import React from "react";
import { AppProps } from "next/app";

function PlaygroundNext({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
export default PlaygroundNext;
