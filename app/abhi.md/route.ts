import { readFile } from "node:fs/promises";
import path from "node:path";

// serves the home page's text as plain markdown at /abhi.md (written to
// out/abhi.md on export), with a short note for agents after the intro
export const dynamic = "force-static";

export async function GET() {
  const read = (f: string) => readFile(path.join(process.cwd(), "content", f), "utf8");
  const [page, agents] = await Promise.all([read("abhi.md"), read("agents.md")]);
  const md = page.replace("## About me", `${agents.trim()}\n\n## About me`);
  return new Response(md, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
