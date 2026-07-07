import { AnnotationHandler } from "codehike/code"

export const focus: AnnotationHandler = {
  name: "focus",
  Line: ({ annotation, children }) => {
    if (!annotation) return <>{children}</>;
    return (
      <div className="is-focused-line !opacity-100 !blur-none !grayscale-0 font-bold">
        {children}
      </div>
    )
  },
}
