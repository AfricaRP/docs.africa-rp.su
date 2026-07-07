"use client";

import React, { useState } from "react";

export function Tabs({ children }: { children: React.ReactNode }) {
  const tabs = React.Children.toArray(children).filter(
    (child) => React.isValidElement(child) && (child as React.ReactElement<any>).props.title
  ) as React.ReactElement<any>[];

  const [activeTab, setActiveTab] = useState(0);

  if (tabs.length === 0) return null;

  return (
    <div className="my-6 border border-zinc-200 dark:border-zinc-800 rounded-xl overflow-hidden bg-white dark:bg-[#0d1117] shadow-sm">
      <div className="flex border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161b22] overflow-x-auto no-scrollbar">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === index
                ? "border-blue-500 text-blue-600 dark:text-blue-400 bg-white dark:bg-[#0d1117]"
                : "border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
            }`}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      <div className="p-4 prose-sm dark:prose-invert [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {tabs[activeTab]}
      </div>
    </div>
  );
}

export function Tab({ title, children }: { title: string; children: React.ReactNode }) {
  return <>{children}</>;
}
