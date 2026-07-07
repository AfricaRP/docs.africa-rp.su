import { AnnotationHandler } from "codehike/code"

export const mark: AnnotationHandler = {
  name: "mark",
  Line: ({ annotation, children }) => {
    if (!annotation) {
      return <div className="border-l-2 border-transparent px-4">{children}</div>
    }
    return (
      <div className="bg-blue-500/10 border-l-2 border-blue-400 px-4">
        {children}
      </div>
    )
  },
}

