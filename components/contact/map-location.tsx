import Link from 'next/link'
import React from 'react'

const MapLocation = () => {
    return (
        <section className="py-16 bg-white" data-reveal>
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Location</h2>
                    <p className="text-gray-600">Based in Miami, serving readers worldwide</p>
                </div>
                <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <div className="relative rounded-lg overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps?q=Miami,Florida&z=10&output=embed"
                                className="w-full h-80 sm:h-96 lg:h-[380px]"
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                aria-label="Map of Miami, Florida"
                                title="Google Maps showing Miami, Florida"
                            ></iframe>
                        </div>
                        <div className="text-center mt-4">
                            <p className="text-gray-600 mb-2">Based in Miami, serving readers worldwide.</p>
                            <Link
                                href="https://www.google.com/maps?q=Miami,Florida"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A67FF] hover:text-blue-700 transition-colors text-sm font-medium"
                            >
                                Open in Google Maps
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MapLocation
