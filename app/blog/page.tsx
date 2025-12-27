import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import Layout from '../components/Layout';

export default function BlogIndex() {
  // Path to the (posts) folder
  const postsDir = path.join(process.cwd(), 'app/blog/(posts)');
  
  // Get folder names (slugs)
  const slugs = fs.readdirSync(postsDir);

  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDir, slug, 'page.mdx');
    if (!fs.existsSync(fullPath)) return null;

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return { slug, title: data.title, desc: data.description, date: data.date };
  }).filter(Boolean);

  return (
    <Layout>
      <header className='mb-10'>
        <h1 className="text-5xl font-bold">blog</h1>
      </header>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post!.slug} className="group">
            <Link href={`/blog//${post!.slug}`} className="block">
              {/* Added vertical padding and spacing for a "breathing" feel */}
              <div className="space-y-2">
                <h2 className="text-2xl font-light text-grey-900 group-hover:text-yellow-600 transition-colors duration-100">
                  {post!.title}
                </h2>
                <p className="">
                  {post!.desc}
                </p>
                <time className="pt-2">
                  {post!.date}
                </time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      
    </Layout>
  );
}