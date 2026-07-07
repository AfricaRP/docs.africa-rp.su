import { AnnotationHandler } from "codehike/code"

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, children }) => {
    return (
      <div className="bg-zinc-700/50 border-l-2 border-blue-400">
        {children}
      </div>
    )
  },
}
