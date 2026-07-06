import type { MDXComponents } from "mdx/types"
import { Code } from "./app/components/code"
import { VideoPlayer } from "./app/components/VideoPlayer"
import { LightboxImage } from "./app/components/LightboxImage"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    VideoPlayer,
    img: (props) => <LightboxImage src={props.src as string} alt={props.alt} />,
  }
}
