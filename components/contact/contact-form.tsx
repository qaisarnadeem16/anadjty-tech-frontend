import React from 'react'
import Button from '../ui/button'
import Image from 'next/image'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'
import Link from 'next/link'

interface ContactFormProps {
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    formData: any;
    handleInputChange: any;
    errors: any;
    isSubmitting: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
    handleSubmit,
    formData,
    handleInputChange,
    errors,
    isSubmitting
}) => {
    return (
        <section className="py-16 bg-[#f7f9fc]" data-reveal>
            <div className="container mx-auto px-4">
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Send Us a Message</h2>
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <form onSubmit={handleSubmit} className="space-y-6" data-contact>
                            <div>
                                <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-2">
                                    Topic *
                                </label>
                                <select
                                    id="topic"
                                    name="topic"
                                    value={formData.topic}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0A67FF] focus:border-transparent"
                                >
                                    <option value="">Select a topic</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Technical Support</option>
                                    <option value="order">Order Status</option>
                                    <option value="return">Returns & Refunds</option>
                                    <option value="partnership">Partnership</option>
                                    <option value="feedback">Feedback</option>
                                </select>
                                {errors.topic && <p className="text-red-500 text-sm mt-1">{errors.topic}</p>}
                            </div>

                            <div>
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name *
                                </label>
                                <Input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full"
                                    placeholder="Your full name"
                                />
                                {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <Input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full"
                                    placeholder="your.email@example.com"
                                />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-2">
                                    Order ID (optional)
                                </label>
                                <Input
                                    type="text"
                                    id="orderId"
                                    name="orderId"
                                    value={formData.orderId}
                                    onChange={handleInputChange}
                                    className="w-full"
                                    placeholder="e.g., ORD-123456"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Message * (20-1000 characters)
                                </label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    className="w-full min-h-[150px]"
                                    placeholder="Tell us how we can help you..."
                                />
                                <div className="flex justify-between text-sm text-gray-500 mt-1">
                                    {errors.message && <p className="text-red-500">{errors.message}</p>}
                                    <span className="ml-auto">{formData.message.length}/1000</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleInputChange}
                                        className="mt-1 w-4 h-4 text-[#0A67FF] border-gray-300 rounded focus:ring-[#0A67FF]"
                                    />
                                    <label htmlFor="consent" className="text-sm text-gray-700">
                                        I agree to the{" "}
                                        <Link href="/privacy" className="text-[#0A67FF] hover:text-blue-700">
                                            Privacy Policy
                                        </Link>{" "}
                                        and consent to the processing of my personal data. *
                                    </label>
                                </div>
                                {errors.consent && <p className="text-red-500 text-sm">{errors.consent}</p>}

                                <div className="flex items-start gap-3">
                                    <input
                                        type="checkbox"
                                        id="marketing"
                                        name="marketing"
                                        checked={formData.marketing}
                                        onChange={handleInputChange}
                                        className="mt-1 w-4 h-4 text-[#0A67FF] border-gray-300 rounded focus:ring-[#0A67FF]"
                                    />
                                    <label htmlFor="marketing" className="text-sm text-gray-700">
                                        I would like to receive marketing communications and product updates from NadjyTech.
                                    </label>
                                </div>
                            </div>

                            <input
                                type="text"
                                name="honeypot"
                                value={formData.honeypot}
                                onChange={handleInputChange}
                                style={{ display: "none" }}
                                tabIndex={-1}
                                autoComplete="off"
                            />

                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#0A67FF] hover:bg-blue-700 text-white py-3 text-lg font-semibold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Sending...
                                    </div>
                                ) : (
                                    "Send Message"
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactForm
