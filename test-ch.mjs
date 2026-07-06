import { highlight } from "codehike/code";

async function test() {
  const res = await highlight({ value: "console.log(1)", lang: "js", meta: "" }, ["github-light", "github-dark"]);
  console.log(res.tokens[0]);
}
test();