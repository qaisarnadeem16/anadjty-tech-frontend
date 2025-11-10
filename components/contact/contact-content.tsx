"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import ContactForm from "./contact-form"
import ContactCards from "./contact-cards"
import FollowUs from "./followus"
import MapLocation from "./map-location"
import Hero from "./hero"
// import UspStrip from "./usp-strip"

export default function ContactContent() {
  const [formData, setFormData] = useState({
    topic: "",
    fullName: "",
    email: "",
    orderId: "",
    message: "",
    consent: false,
    marketing: false,
    honeypot: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState("")
  const [toastType, setToastType] = useState<"success" | "error">("success") // Add toast type

  const showToastMessage = (message: string, type: "success" | "error") => {
    setToastMessage(message)
    setToastType(type)
    setShowToast(true)
    setTimeout(() => setShowToast(false), 5000)
  }

  const showSuccessToast = (message: string) => {
    showToastMessage(message, "success")
  }

  const showErrorToast = (message: string) => { // Add error toast function
    showToastMessage(message, "error")
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.topic) newErrors.topic = "Please select a topic"
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required"
    } else if (formData.message.trim().length < 20) {
      newErrors.message = "Message must be at least 20 characters"
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = "Message must be less than 1000 characters"
    }
    if (!formData.consent) newErrors.consent = "You must agree to our privacy policy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Anti-spam: Check honeypot
    if (formData.honeypot) {
      console.log("Spam detected")
      showErrorToast("Submission blocked. Please try again.")
      return
    }

    // Validate consent
    if (!formData.consent) {
      setErrors(prev => ({ ...prev, consent: "You must consent to proceed" }))
      showErrorToast("Please agree to our privacy policy to continue.")
      return
    }

    if (!validateForm()) {
      showErrorToast("Please fix the errors in the form before submitting.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok && result.isSuccess) {
        showSuccessToast("Thank you for your message! We'll get back to you within 24 hours.")

        // Reset form
        setFormData({
          topic: "",
          fullName: "",
          email: "",
          orderId: "",
          message: "",
          consent: false,
          marketing: false,
          honeypot: "",
        })
        setErrors({})
      } else {
        // Handle different error cases
        let errorMessage = "Failed to send message. Please try again."

        if (result.message) {
          errorMessage = result.message
        } else if (response.status === 400) {
          errorMessage = "Invalid form data. Please check your inputs."
        } else if (response.status === 500) {
          errorMessage = "Server error. Please try again later."
        }

        showErrorToast(errorMessage)
      }
    } catch (error) {
      console.error('Submission error:', error)
      let errorMessage = "Network error. Please check your connection and try again."

      if (error instanceof TypeError) {
        errorMessage = "Network request failed. Please check your internet connection."
      }

      showErrorToast(errorMessage)
    } finally {
      setIsSubmitting(false)

      // Anti-spam: Disable submit for 5 seconds after submission
      setTimeout(() => {
        setIsSubmitting(false)
      }, 5000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" })
    }
  }

  return (
    <main>
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 ${toastType === "success"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white"
          } px-6 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-in slide-in-from-right-5 duration-300`}>
          <Image
            priority
            unoptimized
            width={300}
            height={300}
            src={toastType === "success" ? "/icons/check-circle.svg" : "/icons/x-circle.svg"}
            alt={toastType === "success" ? "Success" : "Error"}
            className="w-5 h-5"
          />
          <span>{toastMessage}</span>
          <button onClick={() => setShowToast(false)} className="ml-2 hover:opacity-70 transition-opacity">
            <Image
              priority
              unoptimized
              width={300}
              height={300}
              src="/icons/x.svg"
              alt="Close"
              className="w-4 h-4"
            />
          </button>
        </div>
      )}

      {/* Hero Section */}
      <Hero />

      {/* USP Strip */}
      {/* <UspStrip /> */}

      {/* Contact Cards Section */}
      <ContactCards />

      {/* Contact Form Section */}
      <ContactForm
        handleInputChange={handleInputChange}
        formData={formData}
        isSubmitting={isSubmitting}
        errors={errors}
        handleSubmit={handleSubmit}
      />

      {/* Map/Location Section */}
      <MapLocation />

      {/* Social Media Links Section */}
      <FollowUs />
    </main>
  )
}