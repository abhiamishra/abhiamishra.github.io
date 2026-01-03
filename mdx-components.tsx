import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {

    // ! forces the size to override any Typography/Prose defaults
    h1: (props) => <h1 className="!text-5xl font-bold mt-10 mb-2 leading-tight" {...props} />,
    h2: (props) => <h2 className="!text-4xl font-bold mt-8 mb-1" {...props} />,
    h3: (props) => <h3 className="!text-3xl font-bold mt-6 mb-1 font-serif" {...props} />,
    h4: (props) => <h4 className="!text-2xl font-bold mt-5 mb-1 font-serif" {...props} />,
    h5: (props) => <h5 className="!text-xl font-bold mt-4 mb-1 font-serif" {...props} />,
    h6: (props) => <h6 className="!text-lg font-bold mt-4 mb-1 font-serif uppercase tracking-wide" {...props} />,

    // Paragraphs: The core of the PG style
    // Use a serif font (Times New Roman/Georgia) and 18px size for readability
    p: (props) => (
      <p className="font-serif text-[18px] leading-[1.6] antialiased" {...props} />
    ),

    // Hyperlinks: The classic PG blue
    a: (props) => (
      <a className="hover:underline cursor-pointer" {...props} />
    ),

    // Blockquotes for that intellectual look
    blockquote: (props) => (
      <blockquote className="border-l-2 border-gray-300 pl-4 italic my-6" {...props} />
    ),

    // List items
    li: (props) => <li className="font-serif mb-2 ml-4 list-disc" {...props} />,

    Dropdown: ({ title, children }: { title: string, children: React.ReactNode }) => (
      <details className="group border-l-2 pl-4 my-6 cursor-pointer transition-colors duration-300">
        <summary className="font-serif font-bold text-lg list-none flex items-center select-none">
          {/* The Arrow: Matches the line color */}
          <span className="group-open:rotate-90 transition-all duration-300 mr-2">
            ▶
          </span>
          {title}
        </summary>
        
        <div className="mt-4 pl-4 font-serif text-[18px] leading-[1.6] transition-colors duration-300">
          {children}
        </div>
      </details>
    ),

    ...components,
  }
}