'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { useState } from 'react'

interface ContactFormProps {
  ctaText?: string
}

export default function ContactForm({ ctaText = 'Send' }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    agreeToTerms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear status when user starts typing again
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: '' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.agreeToTerms) {
      setSubmitStatus({
        type: 'error',
        message: 'Please agree to the terms and conditions.',
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
        setFormData({ name: '', email: '', message: '', agreeToTerms: false })
      } else {
        const errorData = (await response.json()) as { error?: string; message?: string }
        setSubmitStatus({
          type: 'error',
          message: errorData.error || errorData.message || 'Failed to send message. Please try again.',
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

  return (
    <form onSubmit={handleSubmit} className="space-y-8 w-full lg:w-2/3 lg:max-w-3xl">
      <div className="space-y-4">
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

        <div>
          <Input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            required
            className="h-14 md:h-16 text-lg md:text-xl bg-white text-gray-800 placeholder:text-gray-500 rounded-lg focus:border-gray-600 focus:ring-0"
          />
        </div>
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            required
            className="h-14 md:h-16 text-lg md:text-xl bg-white text-gray-800 placeholder:text-gray-500 rounded-lg focus:border-gray-600 focus:ring-0"
          />
        </div>
        <div>
          <Textarea
            placeholder="Message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            required
            rows={6}
            className="text-lg md:text-xl bg-white text-gray-800 placeholder:text-gray-500 rounded-lg focus:border-gray-600 focus:ring-0 resize-none"
          />
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => handleInputChange('agreeToTerms', !!checked)}
          className="h-5 w-5 border-2 border-gray-600 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-800"
        />
        <label
          htmlFor="terms"
          className="text-sm md:text-base text-gray-800 leading-tight cursor-pointer"
        >
          I agree to the{' '}
          <a href="#" className="underline hover:no-underline">
            Terms and Conditions
          </a>{' '}
          and{' '}
          <a href="#" className="underline hover:no-underline">
            Privacy Policy
          </a>
          .
        </label>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 md:h-16 text-lg md:text-xl font-bold bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
      >
        {isSubmitting ? 'Sending...' : ctaText}
      </Button>
    </form>
  )
}
