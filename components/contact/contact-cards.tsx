import { Clock, Mail, Notebook, PhoneCall, PinIcon, SpeechIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ContactCards = () => {
    return (
        <section className="py-16 bg-white" data-reveal>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#0A67FF] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Mail className='text-white' />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Email Support</h3>
                        <Link
                            href="mailto:contact@anadjytech.com"
                            className="text-[#0A67FF] hover:text-blue-700 transition-colors font-medium"
                        >
                            contact@anadjytech.com
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">We respond within 24 hours</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#0A67FF] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PhoneCall className='text-white' />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Phone Support</h3>
                        <Link href="tel:+19549515873" className="text-[#0A67FF] hover:text-blue-700 transition-colors font-medium">
                            +1(954) 951-5873
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">Mon–Fri, 9:00–18:00</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#0A67FF] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Clock className='text-white' />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Business Hours</h3>
                        <p className="text-gray-600 font-medium">Mon–Fri, 9:00–18:00</p>
                        <p className="text-sm text-gray-600 mt-2">Weekend support via email</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#0A67FF] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <PinIcon className='text-white' />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
                        <p className="text-gray-600 font-medium">Based in Miami, Florida</p>
                        <p className="text-sm text-gray-600 mt-2">Serving readers worldwide</p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#0A67FF] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <SpeechIcon className='text-white' />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">FAQ</h3>
                        <Link href="/about#faq" className="text-[#0A67FF] hover:text-blue-700 transition-colors font-medium">
                            View FAQ
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">
                            Quick answers about our reviews, deals, and affiliate process
                        </p>
                    </div>

                    <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-[#0A67FF] bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Notebook className='text-white' />
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Returns</h3>
                        <Link
                            href="/categories#returns"
                            className="text-[#0A67FF] hover:text-blue-700 transition-colors font-medium"
                        >
                            Return Policy
                        </Link>
                        <p className="text-sm text-gray-600 mt-2">30-day return support for affiliate partners</p>
                    </div>
                </div>

                <div className='flex justify-center w-full mt-8' >
                    <div className="bg-white rounded-lg shadow-lg p-6 text-center max-w-md w-full hover:shadow-xl transition-shadow">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Connect with Us</h3>
                        <div
                            className="flex items-center justify-center gap-6 mt-4 md:gap-8"
                            role="group"
                            aria-label="Social links"
                        >
                            <Link
                                href="https://www.facebook.com/profile.php?id=61573915410639"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit AnadjyTech on Facebook"
                                className="transition-transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-7 h-7 text-blue-600 hover:text-blue-800 md:w-8 md:h-8"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://instagram.com/AnadjyTech"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit AnadjyTech on Instagram"
                                className="transition-transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-7 h-7 text-blue-600 hover:text-blue-800 md:w-8 md:h-8"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.689.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.205.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.057-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.073-1.689-.073-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://twitter.com/AnadjyTech"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Visit AnadjyTech on Twitter"
                                className="transition-transform hover:scale-110"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    className="w-7 h-7 text-blue-600 hover:text-blue-800 md:w-8 md:h-8"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactCards
