import { remarkCodeHike, recmaCodeHike } from "codehike/mdx"
import createMDX from "@next/mdx"
import remarkGfm from "remark-gfm"
import remarkFrontmatter from "remark-frontmatter"
import rehypeSlug from "rehype-slug"

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  webpack: (config) => {
    // Hide non-critical Webpack cache warnings and restrict watch coverage
    config.infrastructureLogging = { level: 'error' };
    config.watchOptions = {
      ignored: ['**/node_modules/**', '**/System Volume Information/**'],
    };
    return config;
  },
}

/** @type {import('codehike/mdx').CodeHikeConfig} */
const chConfig = {
  components: { code: "Code" },
}

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkGfm, [remarkCodeHike, chConfig]],
    rehypePlugins: [rehypeSlug],
    recmaPlugins: [[recmaCodeHike, chConfig]],
    jsx: true,
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
