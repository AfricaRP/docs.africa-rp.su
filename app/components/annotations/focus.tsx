import { AnnotationHandler } from "codehike/code"

export const focus: AnnotationHandler = {
  name: "focus",
  onlyIfAnnotated: true,
  Line: ({ annotation, children }) => {
    return (
      <div className={`transition-all duration-300 ${annotation ? "opacity-100" : "opacity-30 grayscale blur-[1px] hover:blur-none hover:grayscale-0 hover:opacity-100"}`}>
        {children}
      </div>
    )
  },
}
