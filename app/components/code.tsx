import { Pre, highlight } from "codehike/code"
import { callout } from "./annotations/callout"
import { mark } from "./annotations/mark"
import { focus } from "./annotations/focus"
import { CopyCodeButton } from "./CopyCodeButton"

export async function Code(props: any) {
  const { codeblock } = props;
  if (!codeblock) {
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
  }
  
  const highlighted = await highlight(codeblock, "github-dark")
  
  let title = "";
  if (codeblock.meta) {
    title = codeblock.meta.trim();
  }

  return (
    <div className="my-6 rounded-xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 bg-zinc-800 dark:bg-[#0d1117] group relative">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <CopyCodeButton text={codeblock.value} />
      </div>
      {title && (
        <div className="flex items-center px-4 py-2 pr-12 border-b border-zinc-700 dark:border-zinc-800/50 bg-zinc-900/50 dark:bg-[#161b22] text-xs text-zinc-300 dark:text-zinc-400 font-mono">
          {title}
        </div>
      )}
      <div className={`py-4 overflow-x-auto text-sm [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0 ${!title ? 'pt-8' : ''}`}>
        <Pre
          code={highlighted}
          handlers={[callout, mark, focus]}
          style={{ margin: 0, backgroundColor: 'transparent' }}
        />
      </div>
    </div>
  )
}
