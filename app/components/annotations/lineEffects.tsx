import { AnnotationHandler } from "codehike/code"

export const lineEffects: AnnotationHandler = {
  name: "lineEffects",
  Line: ({ annotation, children }) => {
    const originalName = annotation?.data?.originalName;
    
    let className = "border-l-2 border-transparent -mx-4 px-4";
    
    if (originalName === "mark") {
      className = "bg-blue-500/10 border-l-2 border-blue-400 -mx-4 px-4";
    }
    
    if (originalName === "focus") {
      className = "border-l-2 border-transparent -mx-4 px-4 is-focused-line !opacity-100 !blur-none !grayscale-0 font-bold";
    }

    return (
      <div className={className}>
        {children}
      </div>
    )
  },
}