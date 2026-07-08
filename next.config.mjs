import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import rehypeSlug from "rehype-slug"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  webpack: (config) => {
    config.infrastructureLogging = { level: 'error' };
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/System Volume Information/**'],
    };
    return config;
  },
}

const chConfig = {
  components: { code: "Code" },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm, [remarkCodeHike, chConfig], remarkMath],
    rehypePlugins: [rehypeSlug, rehypeKatex],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})

export default withMDX(nextConfig)
