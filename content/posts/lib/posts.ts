import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type PostFrontmatter = {
  title: string;
  slug: string;
  date: string; // YYYY-MM-DD
  description?: string;
  cover?: string;
  tags?: string[];
};

export type Post = PostFrontmatter & { content: string };

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function getAllPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    const slug = fm.slug || file.replace(/\.md$/, "");
    return { ...fm, slug, content };
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  if (!fs.existsSync(POSTS_DIR)) return null;
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith(".md"));
  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const fm = data as PostFrontmatter;
    const s = fm.slug || file.replace(/\.md$/, "");
    if (s === slug) return { ...fm, slug: s, content };
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map(p => p.slug);
}
