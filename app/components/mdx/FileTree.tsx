import { FileIcon, FolderIcon } from "lucide-react";
import React from "react";

export function FileTree({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-6 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#0d1117] font-mono text-sm overflow-x-auto">
      <TreeList>{children}</TreeList>
    </div>
  );
}

function TreeList({ children }: { children: React.ReactNode }) {
  const processNodes = (node: React.ReactNode): React.ReactNode => {
    if (!React.isValidElement(node)) return node;

    const element = node as React.ReactElement<any>;

    if (element.type === "ul") {
      return (
        <ul className="pl-5 relative before:absolute before:left-2 before:top-0 before:bottom-0 before:w-px before:bg-zinc-200 dark:before:bg-zinc-800">
          {React.Children.map(element.props.children, processNodes)}
        </ul>
      );
    }

    if (element.type === "li") {
      let isFolder = false;
      const childArray = React.Children.toArray(element.props.children);
      
      const hasSubList = childArray.some(
        (child) => React.isValidElement(child) && child.type === "ul"
      );
      
      const textContent = childArray.find((child) => typeof child === "string" || (React.isValidElement(child) && child.type === "span"));
      
      isFolder = hasSubList || (typeof textContent === "string" && !textContent.includes("."));

      return (
        <li className="relative py-1 flex flex-col">
          <div className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 relative before:absolute before:-left-[17px] before:top-1/2 before:w-3 before:h-px before:bg-zinc-200 dark:before:bg-zinc-800">
            {isFolder ? (
              <FolderIcon className="w-4 h-4 text-blue-500 fill-blue-500/20" />
            ) : (
              <FileIcon className="w-4 h-4 text-zinc-400" />
            )}
            <span className={isFolder ? "font-semibold" : ""}>
              {childArray.filter(child => !React.isValidElement(child) || child.type !== "ul")}
            </span>
          </div>
          {childArray.filter(child => React.isValidElement(child) && child.type === "ul").map(processNodes)}
        </li>
      );
    }

    return element;
  };

  return <div className="[&>ul]:pl-0 [&>ul:before]:hidden">{processNodes(children)}</div>;
}
