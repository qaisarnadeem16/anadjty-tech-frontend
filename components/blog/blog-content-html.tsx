"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface BlogContentProps {
  post: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    image?: string;
    author?: string;
    publishedAt?: string;
    category?: string;
    tags?: string[];
    readTime?: string;
    difficulty?: string;
    badges?: string[];
    keyTakeaways?: string[];
    pros?: string[];
    cons?: string[];
    specs?: any;
  };
}

export default function BlogContentHTML({ post }: BlogContentProps) {
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
            <li className="text-gray-400">/</li>
            <li>
              <Link href="/blog" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                Blog
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium truncate">{post.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero Image */}
      {post.image && (
        <div className="relative h-96 w-full mb-8">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-6">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            )}
            {post.publishedAt && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
            )}
            {post.readTime && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime}</span>
              </div>
            )}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag, index) => (
                <Badge key={index} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}

          {post.difficulty && (
            <Badge className={cn(
              post.difficulty === "Beginner" && "bg-green-100 text-green-800",
              post.difficulty === "Intermediate" && "bg-yellow-100 text-yellow-800",
              post.difficulty === "Advanced" && "bg-red-100 text-red-800"
            )}>
              {post.difficulty}
            </Badge>
          )}
        </header>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <p className="text-lg text-gray-700 dark:text-gray-300 italic">{post.excerpt}</p>
          </div>
        )}

        {/* Content */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Key Takeaways */}
        {post.keyTakeaways && post.keyTakeaways.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Key Takeaways</h2>
            <ul className="list-disc list-inside space-y-2">
              {post.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Pros and Cons */}
        {(post.pros && post.pros.length > 0) || (post.cons && post.cons.length > 0) ? (
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            {post.pros && post.pros.length > 0 && (
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-green-800 dark:text-green-300">Pros</h3>
                <ul className="list-disc list-inside space-y-2">
                  {post.pros.map((pro, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{pro}</li>
                  ))}
                </ul>
              </div>
            )}
            {post.cons && post.cons.length > 0 && (
              <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <h3 className="text-xl font-bold mb-4 text-red-800 dark:text-red-300">Cons</h3>
                <ul className="list-disc list-inside space-y-2">
                  {post.cons.map((con, index) => (
                    <li key={index} className="text-gray-700 dark:text-gray-300">{con}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </article>
  );
}

