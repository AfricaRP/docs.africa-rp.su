import { AnnotationHandler } from "codehike/code";

export const lineEffects: AnnotationHandler = {
  name: "lineEffects",
  Line: ({ annotation, children }) => {
    const originalName = annotation?.data?.originalName;

    let className = "border-l-2 border-transparent px-4 block";

    if (originalName === "mark") {
      className =
        "bg-blue-500/20 border-l-2 border-blue-400 px-4 block !opacity-100 !blur-none !grayscale-0";
    }

    if (originalName === "focus") {
      className =
        "bg-zinc-700/50 border-l-2 border-zinc-400 px-4 is-focused-line !opacity-100 !blur-none !grayscale-0 font-bold block";
    }

    return <div className={className}>{children}</div>;
  },
};
