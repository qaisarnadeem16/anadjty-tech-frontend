import FeatureBar from '@/components/feature-bar';
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface HeaderProps {
    heading?: string;
    subHeading?: string;
    subCategory?: string;
}

const Header = ({ heading, subHeading, subCategory }: HeaderProps) => {
    return (
        <div>
            <section className="bg-gradient-to-br from-blue-900/98 via-blue-800/95 to-blue-700/92 text-white py-16">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-blue-100 mb-8" aria-label="Breadcrumb">
                        <Link href="/" className="hover:text-white transition-colors">
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        <Link href={'/categories'} className="text-white" aria-current="page">
                            Categories
                        </Link>
                        {
                            subCategory &&
                            <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        }
                        {
                            subCategory &&
                            <span className="text-white" aria-current="page">
                                {subCategory}
                            </span>
                        }
                    </nav>

                    <div className="text-center sm:mt-20 mt-14">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-shadow-lg">{heading}</h1>
                        <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto text-shadow">
                            {subHeading}
                        </p>
                    </div>
                </div>
            </section>
            {/* USP Strip */}
            <FeatureBar />
        </div>

    )
}

export default Header
