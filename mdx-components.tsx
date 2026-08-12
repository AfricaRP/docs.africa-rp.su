import type { MDXComponents } from "mdx/types";
import { Code } from "@/app/components/code";
import { VideoPlayer } from "@/app/components/VideoPlayer";
import { LightboxImage } from "@/app/components/LightboxImage";
import { Kbd } from "@/app/components/mdx/typography/Kbd";
import { Callout } from "@/app/components/mdx/typography/Callout";
import { Tooltip } from "@/app/components/mdx/interactive/Tooltip";
import { CardGrid, Card } from "@/app/components/mdx/layout/Cards";
import { Tabs, Tab } from "@/app/components/mdx/interactive/Tabs";
import { FileTree } from "@/app/components/mdx/layout/FileTree";
import { ImageCompare } from "@/app/components/mdx/media/ImageCompare";
import { Steps } from "@/app/components/mdx/layout/Steps";
import { Accordion } from "@/app/components/mdx/layout/Accordion";
import { Badge } from "@/app/components/mdx/typography/Badge";
import { Snippet } from "@/app/components/mdx/typography/Snippet";
import { Quote } from "@/app/components/mdx/typography/Quote";
import { DropCap } from "@/app/components/mdx/typography/DropCap";
import { DoDont, DoDontGrid } from "@/app/components/mdx/layout/DoDont";
import { ImageGrid } from "@/app/components/mdx/media/ImageGrid";
import { Properties, Property } from "@/app/components/mdx/layout/Properties";
import { Checklist, ChecklistItem } from "@/app/components/mdx/interactive/Checklist";
import { Icon } from "@/app/components/mdx/typography/Icon";
import { Mention } from "@/app/components/mdx/typography/Mention";
import { Timeline, TimelineItem } from "@/app/components/mdx/layout/Timeline";
import { HoverCard } from "@/app/components/mdx/interactive/HoverCard";
import { Secret } from "@/app/components/mdx/interactive/Secret";
import {
  DecisionTree,
  DecisionStep,
  DecisionButton,
} from "@/app/components/mdx/interactive/DecisionTree";
import { VoiceBox } from "@/app/components/mdx/media/VoiceBox";
import { YouTube } from "@/app/components/mdx/media/YouTube";
import { Rutube } from "@/app/components/mdx/media/Rutube";
import { StatsRadar } from "@/app/components/mdx/media/StatsRadar";
import { DepthSection, DepthLevel } from "@/app/components/mdx/layout/DepthSlider";
import {
  CodeWalkthrough,
  WalkthroughText,
  WalkthroughCode,
} from "@/app/components/mdx/interactive/CodeWalkthrough";
import { FlowMap } from "@/app/components/mdx/interactive/FlowMap";
import { CompareMatrix } from "@/app/components/mdx/layout/CompareMatrix";
import { ParallaxWindow } from "@/app/components/mdx/media/ParallaxWindow";
import { HoloCard } from "@/app/components/mdx/media/HoloCard";
import { MarginNote } from "@/app/components/mdx/typography/MarginNote";
import { Magnifier } from "@/app/components/mdx/media/Magnifier";
import { GlowGrid, GlowCard } from "@/app/components/mdx/layout/GlowGrid";
import { MarkerDraw } from "@/app/components/mdx/interactive/MarkerDraw";
import { Heading } from "@/app/components/mdx/typography/Heading";
import { Columns, Column } from "@/app/components/mdx/layout/Columns";
import { AudienceSwitch, Audience } from "@/app/components/mdx/interactive/AudienceSwitch";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    Code,
    VideoPlayer,
    img: (props) => <LightboxImage src={props.src as string} alt={props.alt} />,
    a: ({ href, children, ...props }) => {
      const isExternal = href?.startsWith("http") || href?.startsWith("//");
      return (
        <a 
          href={href} 
          target={isExternal ? "_blank" : undefined} 
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
        </a>
      );
    },
    h1: (props) => <Heading as="h1" {...props} />,
    h2: (props) => <Heading as="h2" {...props} />,
    h3: (props) => <Heading as="h3" {...props} />,
    h4: (props) => <Heading as="h4" {...props} />,
    h5: (props) => <Heading as="h5" {...props} />,
    h6: (props) => <Heading as="h6" {...props} />,
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
    ParallaxWindow,
    HoloCard,
    MarginNote,
    Magnifier,
    GlowGrid,
    GlowCard,
    MarkerDraw,
    Columns,
    Column,
    AudienceSwitch,
    Audience,
  };
}
