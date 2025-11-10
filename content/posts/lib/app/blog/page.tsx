import Link from "next/link";
import { getAllPosts } from "../../lib/posts";

export const revalidate = 60 * 60 * 24; // ISR: 24h

export const metadata = {
  title: "Blog | AnadjyTech",
  description: "Guides & picks: remote work, USB-C hubs, headphones, smart home.",
};

export default function BlogIndex() {
  const posts = getAllPosts(); // Server component: lecture FS au build/revalidate
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Latest articles</h1>
      {posts.length === 0 && <p>No posts yet. Come back soon.</p>}
      <ul className="grid gap-6 md:grid-cols-2">
        {posts.map(p => (
          <li key={p.slug} className="rounded-xl border border-slate-200/30 p-5">
            <h2 className="text-xl font-semibold">
              <Link href={`/blog/${p.slug}`} className="hover:underline">
                {p.title}
              </Link>
            </h2>
            <p className="text-sm text-slate-500">
              {new Date(p.date).toLocaleDateString()}
            </p>
            {p.description && (
              <p className="mt-2 text-slate-300">{p.description}</p>
            )}
            <div className="mt-3">
              <Link href={`/blog/${p.slug}`} className="text-sky-400 hover:underline">
                Read more →
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
