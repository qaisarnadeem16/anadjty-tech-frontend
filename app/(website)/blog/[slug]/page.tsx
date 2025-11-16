import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getBlogBySlug } from "@/lib/api/blogs"
import BlogContentHTML from "@/components/blog/blog-content-html"

interface PageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const response = await getBlogBySlug(params.slug)
    const blog = response.blog

    if (!blog) {
      return {
        title: "Article Not Found | AnadjyTech",
        description: "The requested article could not be found.",
      }
    }

    return {
      title: `${blog.title} | AnadjyTech — The smart way to tech`,
      description: blog.excerpt,
      openGraph: {
        title: blog.title,
        description: blog.excerpt,
        type: "article",
        publishedTime: blog.publishedAt,
        authors: blog.author ? [typeof blog.author === 'object' ? blog.author.name : blog.author] : [],
        images: blog.hero || blog.image || blog.thumbnail ? [
          {
            url: blog.hero || blog.image || blog.thumbnail || "",
            width: 1200,
            height: 675,
            alt: blog.title,
          },
        ] : [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt,
        images: blog.hero || blog.image || blog.thumbnail ? [blog.hero || blog.image || blog.thumbnail || ""] : [],
      },
    }
  } catch (error) {
    return {
      title: "Article Not Found | AnadjyTech",
      description: "The requested article could not be found.",
    }
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  try {
    const response = await getBlogBySlug(params.slug)
    const blog = response.blog

    if (!blog || !blog.published || blog.hidden) {
      notFound()
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      image: blog.hero || blog.image || blog.thumbnail,
      author: blog.author ? {
        "@type": "Person",
        name: typeof blog.author === 'object' ? blog.author.name : blog.author,
      } : {
        "@type": "Organization",
        name: "AnadjyTech",
      },
      publisher: {
        "@type": "Organization",
        name: "AnadjyTech",
        logo: {
          "@type": "ImageObject",
          url: "/logo.png",
        },
      },
      datePublished: blog.publishedAt,
      dateModified: blog.updatedAt || blog.publishedAt,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id:": `/blog/${blog.slug}`,
      },
    }

    // Convert blog to format expected by BlogContentHTML component
    const post = {
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      image: blog.hero || blog.image || blog.thumbnail,
      author: blog.author?.name || "AnadjyTech",
      publishedAt: blog.publishedAt || blog.createdAt,
      category: blog.category,
      tags: blog.tags,
      readTime: blog.readTime || `${blog.readMins || 5} min read`,
      difficulty: blog.difficulty,
      badges: blog.badges,
      keyTakeaways: blog.keyTakeaways,
      pros: blog.pros,
      cons: blog.cons,
      specs: blog.specs,
    }

    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <BlogContentHTML post={post} />
      </>
    )
  } catch (error) {
    notFound()
  }
}
