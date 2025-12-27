// app/blog/layout.tsx
import Layout from "../../components/Layout";
import Sidebar from "../../components/Sidebar";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Layout>
        {/* The MDX content goes here */}
        <main className="">
        <article className="max-w-[650px] mx-auto font-serif antialiased
          /* Typography: Stark White/Black switching */
          text-[19px] leading-[1.6]
          
          /* MDX Tag Specifics */
          [&_h1]:text-[32px] [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:mb-10 [&_h1]:font-sans
          [&_h2]:text-[22px] [&_h2]:font-bold [&_h2]:mt-14 [&_h2]:mb-4 [&_h2]:font-sans
          [&_p]:mb-6
          [&_a]:text-blue-600 dark:[&_a]:text-blue-400 [&_a]:underline [&_a]:underline-offset-4
          [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-8
          [&_li]:mb-2
          [&_hr]:w-50                   /* Short width */
          [&_hr]:mx-auto                /* Centered */
          [&_hr]:border-t-2           /* Thicker line for that bold PG look */
          [&_hr]:border-black         /* Black in light mode */
          dark:[&_hr]:border-white    /* White in dark mode */
          [&_hr]:opacity-40          /* Removes default transparency */
        ">
          {children}
        </article>
      </main>
    </Layout>
    
  );
}