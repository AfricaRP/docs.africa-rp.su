import { Pre, highlight } from "codehike/code"
import { callout } from "./annotations/callout"
import { lineEffects } from "./annotations/lineEffects"
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

  const hasFocus = highlighted.annotations.some(a => a.name === "focus");
  
  highlighted.annotations.forEach(a => {
    if (a.name === "focus" || a.name === "mark") {
      a.data = { ...a.data, originalName: a.name };
      a.name = "lineEffects";
    }
  });

  return (
    <div className={`my-6 rounded-xl overflow-hidden shadow-md border border-zinc-200 dark:border-zinc-800 bg-zinc-800 dark:bg-[#0d1117] group relative ${hasFocus ? 'has-focus-block' : ''}`}>
      {!title && (
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <CopyCodeButton text={codeblock.value} />
        </div>
      )}
      {title && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-700 dark:border-zinc-800/50 bg-zinc-900/50 dark:bg-[#161b22] text-xs text-zinc-300 dark:text-zinc-400 font-mono">
          <span>{title}</span>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center -my-1 -mr-1">
            <CopyCodeButton text={codeblock.value} />
          </div>
        </div>
      )}
      <div className={`py-4 px-4 overflow-x-auto text-sm [&>pre]:!bg-transparent [&>pre]:!m-0 [&>pre]:!p-0 ${!title ? 'pt-10' : ''}`}>
        <Pre
          code={highlighted}
          handlers={[callout, lineEffects]}
          style={{ margin: 0, backgroundColor: 'transparent' }}
        />
      </div>
    </div>
  )
}
