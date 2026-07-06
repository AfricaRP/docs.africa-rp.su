import { Pre, RawCode, highlight } from "codehike/code"
import { callout } from "./annotations/callout"

export async function Code(props: any) {
  const { codeblock } = props;
  if (!codeblock) {
    console.error("Code component received props:", Object.keys(props));
    return <pre>{JSON.stringify(props, null, 2)}</pre>;
  }
  const highlighted = await highlight(codeblock, "github-dark")
  return (
    <Pre
      code={highlighted}
      handlers={[callout]}
      className="border border-zinc-800"
    />
  )
}
