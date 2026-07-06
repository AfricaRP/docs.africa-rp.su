import { Pre, highlight } from "codehike/code"
import { callout } from "./annotations/callout"

export async function Code(props: any) {
  const { codeblock } = props;
  if (!codeblock) {
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
  }
  
  const highlighted = await highlight(codeblock, "github-dark")
  
  let title = "";
  if (codeblock.meta) {
    title = codeblock.meta.replace(/^!\s*/, "").trim();
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 bg-[#0d1117]">
      {title && (
        <div className="flex items-center px-4 py-2 border-b border-zinc-200 dark:border-zinc-800/50 bg-zinc-100/50 dark:bg-[#161b22] text-xs text-zinc-600 dark:text-zinc-400 font-mono">
          {title}
        </div>
      )}
      <div className="p-4 overflow-x-auto text-sm [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0">
        <Pre
          code={highlighted}
          handlers={[callout]}
          style={{ margin: 0, backgroundColor: 'transparent' }}
        />
      </div>
    </div>
  )
}
