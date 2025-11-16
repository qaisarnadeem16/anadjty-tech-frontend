import { useMDXComponent } from "next-contentlayer/hooks"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Clock, ChevronRight } from "lucide-react"
import { Badge } from "../ui/badge"

import BlogProse, { KeyTakeaways, ProsSection, ConsSection } from "./BlogProse";
import { cn } from "@/lib/utils"


const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold mt-6 mb-3" {...props} />,
  h3: (props: any) => <h3 className="text-xl font-semibold mt-4 mb-2" {...props} />,
  p: (props: any) => <p className="leading-relaxed mb-4 text-gray-700 dark:text-gray-300" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 space-y-2" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm" {...props} />
    </div>
  ),
  th: (props: any) => <th className="border border-gray-300 dark:border-gray-700 px-4 py-2 font-semibold" {...props} />,
  td: (props: any) => <td className="border border-gray-300 dark:border-gray-700 px-4 py-2" {...props} />,
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-300 my-6"
      {...props}
    />
  ),
  code: (props: any) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
  ),
  pre: (props: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-6" {...props} />
  ),
}

export default function BlogArticle({ post }: any) {
  const MDXContent = useMDXComponent(post.content)

  return (
    <article className="min-h-screen bg-white dark:bg-gray-900">
      {/* Breadcrumb */}
      <nav className="bg-gray-50 dark:bg-gray-800 py-4" aria-label="Breadcrumb">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Home
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li>
              <Link
                href="/blog"
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Blog
              </Link>
            </li>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <li className="text-gray-900 dark:text-gray-100 font-medium truncate">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white dark:bg-gray-900 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            {post.category}
          </Badge>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed max-w-3xl mx-auto">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{typeof post.author === 'object' ? post.author?.name || 'AnadjyTech' : post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{post.readMins} min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Image */}
      {post.hero && (
        <div className="relative flex justify-center mb-12">
          <Image
            src={post.hero || '/placeholder.svg'}
            alt={post.alt || `${post.title} hero image`}
            width={1600}
            height={900}
            priority
            className="object-cover w-full h-[350px]  md:h-[600px] lg:h-[700px]"
            sizes="(max-width:768px) 100vw, (max-width:1200px) 80vw, 1200px"
          />
        </div>
      )}



      {/* Actual Article */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <BlogProse>
          <div className={cn("prose dark:prose-invert max-w-none")}>
            <MDXContent components={components} />
          </div>
        </BlogProse>

        {/* Key Takeaways */}
        {post.keyTakeaways?.length > 0 && (
          <KeyTakeaways>
            <ul className="space-y-2">
              {post.keyTakeaways.map((item: string, i: number) => (
                <li key={i} className="flex gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </KeyTakeaways>
        )}

        {/* Pros and Cons */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {post.pros?.length > 0 && (
            <ProsSection>
              <ul className="space-y-2">
                {post.pros.map((pro: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2" />
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </ProsSection>
          )}

          {post.cons?.length > 0 && (
            <ConsSection>
              <ul className="space-y-2">
                {post.cons.map((con: string, i: number) => (
                  <li key={i} className="flex gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full mt-2" />
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </ConsSection>
          )}
        </div>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 className="text-lg font-semibold mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
