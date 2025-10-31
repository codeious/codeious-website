'use client'

import { useState, FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  message: string
  consent: boolean
}

interface ContactFormProps {
  ctaText?: string
}

export default function ContactForm({ ctaText = 'Send' }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    consent: false,
  })

  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Custom validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const getFieldError = (field: string): string | null => {
    if (!touchedFields[field]) return null

    switch (field) {
      case 'name':
        return formData.name.trim() === '' ? 'Name is required' : null
      case 'email':
        if (formData.email.trim() === '') return 'Email is required'
        if (!validateEmail(formData.email)) return 'Please enter a valid email address'
        return null
      case 'message':
        return formData.message.trim() === '' ? 'Message is required' : null
      default:
        return null
    }
  }

  const hasError = (field: string): boolean => {
    return touchedFields[field] && getFieldError(field) !== null
  }

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      validateEmail(formData.email) &&
      formData.message.trim() !== '' &&
      formData.consent
    )
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleFieldTouch = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched to show validation errors
    setTouchedFields({
      name: true,
      email: true,
      message: true,
      consent: true,
    })

    if (!formData.consent) {
      // Don't show error at top, it will be shown below checkbox
      return
    }

    if (!isFormValid()) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields correctly.',
      })
      return
    }

    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! Your message has been sent successfully.',
        })
        setFormData({ name: '', email: '', message: '', consent: false })
        setTouchedFields({})
      } else {
        const errorData = (await response.json()) as { error?: string; message?: string }
        setSubmitStatus({
          type: 'error',
          message:
            errorData.error || errorData.message || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getInputClassName = (_field: string) => {
    const baseClasses =
      'h-14 md:h-16 text-lg md:text-xl text-gray-800 placeholder:text-gray-500 placeholder:text-lg md:placeholder:text-xl placeholder:font-normal rounded-lg w-full px-4 py-3 transition-all duration-200 ease-in-out outline-none'

    return `${baseClasses} border-none bg-[#8AFF9F] hover:opacity-70 focus:bg-white`
  }

  const getTextareaClassName = (_field: string) => {
    const baseClasses =
      'text-lg md:text-xl text-gray-800 placeholder:text-gray-500 placeholder:text-lg md:placeholder:text-xl placeholder:font-normal rounded-lg w-full px-4 py-3 transition-all duration-200 ease-in-out outline-none resize-none'

    return `${baseClasses} border-none bg-[#8AFF9F] hover:opacity-70 focus:bg-white`
  }

  return (
    <form onSubmit={handleSubmit} className="contact-form  w-full lg:w-2/3 lg:max-w-3xl">
      {/* Status message area */}
      {submitStatus.type && (
        <div
          className={`${
            submitStatus.type === 'success' ? 'text-gray-800' : 'text-red-600'
          } text-lg md:text-xl font-medium mb-4`}
        >
          {submitStatus.message}
        </div>
      )}

      <div className="">
        {/* Name Field */}
        <div>
          <input
            type="text"
            placeholder="Name *"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            onBlur={() => handleFieldTouch('name')}
            className={getInputClassName('name')}
          />
          <div className="h-5 flex items-center mb-2 mt-0.5">
            {hasError('name') && (
              <div className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-red-600 " />

                <p className="text-red-600 text-sm font-bold">{getFieldError('name')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            placeholder="Email *"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleFieldTouch('email')}
            className={getInputClassName('email')}
          />
          <div className="h-5 flex items-center mb-2 mt-0.5">
            {hasError('email') && (
              <div className="flex items-center gap-1">
                <AlertCircle className="w-4 h-4 text-red-600 " />

                <p className="text-red-600 text-sm font-bold">{getFieldError('email')}</p>
              </div>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <textarea
            placeholder="Message *"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            onBlur={() => handleFieldTouch('message')}
            rows={6}
            className={getTextareaClassName('message')}
          />
          <div className="h-5 flex items-center">
            {hasError('message') && (
              <div className="flex items-center gap-1" style={{ marginTop: -12 }}>
                <AlertCircle className="w-4 h-4 text-red-600 " />
                <p className="text-red-600 text-sm font-bold">{getFieldError('message')}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Consent Checkbox */}
      <div className="mb-8">
        <div className="flex items-start space-x-3">
          <input
            type="checkbox"
            id="consent"
            checked={formData.consent}
            onChange={(e) => handleInputChange('consent', e.target.checked)}
            className="mt-1 h-6 w-9 rounded border-2 border-gray-600 text-gray-800 focus:ring-0 focus:ring-offset-0"
            style={{
              backgroundColor: formData.consent ? '#1f2937' : '#8AFF9F',
            }}
          />
          <label
            htmlFor="consent"
            className="text-sm md:text-base text-gray-800 leading-tight cursor-pointer"
          >
            By submitting the form, you agree to our Terms and Conditions and Privacy Policy. Your
            information will be processed securely to assist you promptly.
          </label>
        </div>
        <div className="h-5 flex items-center">
          {!formData.consent && touchedFields.consent && (
            <div className="flex items-center gap-1">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <p className="text-red-600 text-sm font-bold">
                Please agree to the terms and conditions before submitting.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full text-lg md:text-xl font-bold bg-black hover:bg-gray-800 text-white rounded-3xl transition-colors"
      >
        {isSubmitting ? 'Sending...' : ctaText}
      </Button>
    </form>
  )
}
