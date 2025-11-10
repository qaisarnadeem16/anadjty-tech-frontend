import type { Metadata } from "next";
import { marked } from "marked";
import Link from "next/link";
import Image from "next/image";
import { getAllSlugs, getPostBySlug } from "@/content/posts/lib/posts";

export const revalidate = 60 * 60 * 24; // ISR: 24h

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug: any) => ({ slug }));
}

type Props = { params: { slug: string } };

export function generateMetadata({ params }: Props): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Not found | AnadjyTech" };
  return {
    title: `${post.title} | AnadjyTech`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      url: `https://www.anadjytech.com/blog/${post.slug}`,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    alternates: {
      canonical: `https://www.anadjytech.com/blog/${post.slug}`,
    },
  };
}

export default function BlogPost({ params }: Props) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return (
      <main className="container mx-auto px-4 py-10">
        <p>Article not found.</p>
        <Link href="/blog" className="text-sky-400 hover:underline">← Back to blog</Link>
      </main>
    );
  }

  const html = marked.parse(post.content) as string;

  return (
    <main className="container mx-auto px-4 py-10 prose prose-invert">
      <Link href="/blog" className="text-sky-400 hover:underline">← Back to blog</Link>
      <h1 className="mb-2">{post.title}</h1>
      <p className="text-sm text-slate-500">{new Date(post.date).toLocaleDateString()}</p>
      {post.cover && (
        // On passera à next/image plus tard
        <Image priority  unoptimized width={300} height={300} src={post.cover} alt="" style={{ marginTop: 12, borderRadius: 12 }} />
      )}
      <article className="mt-6" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  );
}
