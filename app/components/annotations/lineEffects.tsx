import { AnnotationHandler } from "codehike/code"

export const lineEffects: AnnotationHandler = {
  name: "lineEffects",
  Line: ({ annotation, children }) => {
    const originalName = annotation?.data?.originalName;
    
    let className = "border-l-2 border-transparent px-4 inline-block min-w-full";
    
    if (originalName === "mark") {
      // Mark gets blue background, blue border, and bypasses blur via !opacity-100 etc.
      className = "bg-blue-500/20 border-l-2 border-blue-400 px-4 inline-block min-w-full !opacity-100 !blur-none !grayscale-0";
    }
    
    if (originalName === "focus") {
      // Focus gets a subtle highlight and bypasses blur
      className = "bg-zinc-700/30 border-l-2 border-zinc-500 px-4 is-focused-line !opacity-100 !blur-none !grayscale-0 font-bold inline-block min-w-full";
    }

    return (
      <div className={className}>
        {children}
      </div>
    )
  },
}