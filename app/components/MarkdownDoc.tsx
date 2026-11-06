import type { MDXComponents } from "mdx/types";
import type { ComponentProps, ReactNode } from "react";
import Abhi from "../../content/abhi.md";

// renders content/abhi.md as the home page's text. the same file is served
// raw at /abhi.md.

const slug = (children: ReactNode) =>
  String(Array.isArray(children) ? children.join("") : children)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const components: MDXComponents = {
  h1: (props) => <h1 className="md-h1" {...props} />,
  h2: ({ children }) => (
    <h2 className="md-h2" id={slug(children)}>
      {children}
    </h2>
  ),
  h3: (props) => <h3 className="md-h3" {...props} />,
  p: (props) => <p className="md-p" {...props} />,
  em: (props) => <em className="md-em" {...props} />,
  strong: (props) => <strong className="md-strong" {...props} />,
  a: ({ href, ...rest }: ComponentProps<"a">) => {
    const external = href?.startsWith("http");
    return (
      <a
        className="md-a"
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...rest}
      />
    );
  },
  blockquote: ({ children }) => <blockquote className="md-quote">{children}</blockquote>,
  ul: (props) => <ul className="md-ul" {...props} />,
  li: (props) => <li className="md-li" {...props} />,
  table: (props) => (
    <div className="md-table-wrap">
      <table className="md-table" {...props} />
    </div>
  ),
  hr: () => <hr className="md-hr" />,
};

export default function MarkdownDoc() {
  return (
    <article id="abhi-md" className="md-doc">
      <Abhi components={components} />
      <footer className="md-footer">
        <p>
          built by hand, always a work in progress. this page is also plain text at{" "}
          <a className="md-a" href="/abhi.md">/abhi.md</a>.
        </p>
      </footer>
    </article>
  );
}
