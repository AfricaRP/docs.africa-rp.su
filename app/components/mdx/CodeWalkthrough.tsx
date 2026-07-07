"use client";

import { ReactNode } from "react";

export function CodeWalkthrough({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 flex flex-col xl:flex-row gap-6 items-start">
      {children}
    </div>
  );
}

export function WalkthroughText({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 w-full flex flex-col gap-4">
      {children}
    </div>
  );
}

export function WalkthroughCode({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 w-full xl:sticky xl:top-24 [&_figure]:!m-0">
      {children}
    </div>
  );
}