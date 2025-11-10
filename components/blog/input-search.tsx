'use client'

import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

const InputSearch = ({ setCurrentPage }: any) => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const initialSearch = searchParams.get('search') || ''
    const [searchQuery, setSearchQuery] = useState(initialSearch)

    // Debounce logic
    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString())

            if (searchQuery.trim()) {
                params.set('search', searchQuery.trim())
            } else {
                params.delete('search')
            }

            router.push(`?${params.toString()}`, { scroll: false })
            setCurrentPage(1)
        }, 500) // 0.5 second delay

        return () => clearTimeout(delayDebounce)
    }, [searchQuery])

    return (
        <div className="relative">
            <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                aria-hidden="true"
            />
            <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0A67FF] focus:border-transparent outline-none"
                aria-label="Search blog articles"
            />
        </div>
    )
}

export default InputSearch
