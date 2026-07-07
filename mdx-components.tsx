import type { MDXComponents } from "mdx/types"
import { Code } from "./app/components/code"
import { VideoPlayer } from "./app/components/VideoPlayer"
import { LightboxImage } from "./app/components/LightboxImage"
import { Kbd } from "./app/components/mdx/Kbd"
import { Callout } from "./app/components/mdx/Callout"
import { Tooltip } from "./app/components/mdx/Tooltip"
import { CardGrid, Card } from "./app/components/mdx/Cards"
import { Tabs, Tab } from "./app/components/mdx/Tabs"
import { FileTree } from "./app/components/mdx/FileTree"
import { ImageCompare } from "./app/components/mdx/ImageCompare"

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    VideoPlayer,
    img: (props) => <LightboxImage src={props.src as string} alt={props.alt} />,
    Kbd,
    Callout,
    Tooltip,
    CardGrid,
    Card,
    Tabs,
    Tab,
    FileTree,
    ImageCompare,
  }
}
