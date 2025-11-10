import type { ReactNode } from "react"
import { cn } from "../../lib/utils"

interface BlogProseProps {
  children: ReactNode
  className?: string
}

export default function BlogProse({ children, className }: BlogProseProps) {
  return (
    <div
      className={cn(
        "prose prose-lg max-w-none",
        // Base typography
        "prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100",
        "prose-h1:text-4xl prose-h1:mb-8 prose-h1:leading-tight",
        "prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:leading-tight",
        "prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:leading-tight",
        "prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3",
        // Paragraph spacing and line height
        "prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6",
        // Lists
        "prose-ul:mb-6 prose-ol:mb-6 prose-li:mb-2",
        "prose-ul:list-disc prose-ol:list-decimal",
        // Links
        "prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline",
        // Strong and emphasis
        "prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold",
        "prose-em:text-gray-700 dark:prose-em:text-gray-300",
        // Code
        "prose-code:text-sm prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded",
        // Images - centered and rounded
        "prose-img:rounded-lg prose-img:mx-auto prose-img:shadow-md",
        // Tables - responsive with borders and padding
        "prose-table:w-full prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-600",
        "prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-600 prose-th:bg-gray-50 dark:prose-th:bg-gray-800 prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:font-semibold",
        "prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-600 prose-td:px-4 prose-td:py-3",
        // Blockquotes - left border and italic
        "prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:py-4 prose-blockquote:rounded-r-lg",
        className,
      )}
    >
      {children}
    </div>
  )
}

// Special styled sections for blog content
export function KeyTakeaways({ children }: { children: ReactNode }) {
  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 my-8">
      <h3 className="text-xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
        <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          ✓
        </span>
        Key Takeaways
      </h3>
      <div className="text-blue-800 dark:text-blue-200 space-y-2">{children}</div>
    </div>
  )
}

export function ProsSection({ children }: { children: ReactNode }) {
  return (
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 my-8">
      <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-4 flex items-center gap-2">
        <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          +
        </span>
        Pros
      </h3>
      <div className="text-green-800 dark:text-green-200 space-y-2">{children}</div>
    </div>
  )
}

export function ConsSection({ children }: { children: ReactNode }) {
  return (
    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 my-8">
      <h3 className="text-xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
        <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
          −
        </span>
        Cons
      </h3>
      <div className="text-red-800 dark:text-red-200 space-y-2">{children}</div>
    </div>
  )
}
