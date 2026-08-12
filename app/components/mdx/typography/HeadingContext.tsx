"use client";

import { createContext, useContext, ReactNode } from "react";

const HeadingContext = createContext({ hideCopyLink: false });

export const useHeadingContext = () => useContext(HeadingContext);

export const HeadingProvider = ({
  children,
  hideCopyLink = true,
}: {
  children: ReactNode;
  hideCopyLink?: boolean;
}) => (
  <HeadingContext.Provider value={{ hideCopyLink }}>
    {children}
  </HeadingContext.Provider>
);
