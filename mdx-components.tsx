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
import { Steps } from "./app/components/mdx/Steps"
import { Accordion } from "./app/components/mdx/Accordion"
import { Badge } from "./app/components/mdx/Badge"
import { Snippet } from "./app/components/mdx/Snippet"
import { Quote } from "./app/components/mdx/Quote"
import { DropCap } from "./app/components/mdx/DropCap"
import { DoDont, DoDontGrid } from "./app/components/mdx/DoDont"
import { ImageGrid } from "./app/components/mdx/ImageGrid"
import { Properties, Property } from "./app/components/mdx/Properties"
import { Checklist, ChecklistItem } from "./app/components/mdx/Checklist"
import { Icon } from "./app/components/mdx/Icon"
import { Mention } from "./app/components/mdx/Mention"
import { Timeline, TimelineItem } from "./app/components/mdx/Timeline"
import { HoverCard } from "./app/components/mdx/HoverCard"
import { Secret } from "./app/components/mdx/Secret"
import { DecisionTree, DecisionStep, DecisionButton } from "./app/components/mdx/DecisionTree"
import { VoiceBox } from "./app/components/mdx/VoiceBox"
import { YouTube } from "./app/components/mdx/YouTube"
import { Rutube } from "./app/components/mdx/Rutube"
import { StatsRadar } from "./app/components/mdx/StatsRadar"
import { DepthSection, DepthLevel } from "./app/components/mdx/DepthSlider"
import { CodeWalkthrough, WalkthroughText, WalkthroughCode } from "./app/components/mdx/CodeWalkthrough"
import { FlowMap } from "./app/components/mdx/FlowMap"
import { CompareMatrix } from "./app/components/mdx/CompareMatrix"

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
    Steps,
    Accordion,
    Badge,
    Snippet,
    Quote,
    DropCap,
    DoDont,
    DoDontGrid,
    ImageGrid,
    Properties,
    Property,
    Checklist,
    ChecklistItem,
    Icon,
    Mention,
    Timeline,
    TimelineItem,
    HoverCard,
    Secret,
    DecisionTree,
    DecisionStep,
    DecisionButton,
    VoiceBox,
    YouTube,
    Rutube,
    StatsRadar,
    DepthSection,
    DepthLevel,
    CodeWalkthrough,
    WalkthroughText,
    WalkthroughCode,
    FlowMap,
    CompareMatrix,
  }
}
