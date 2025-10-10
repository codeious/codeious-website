import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

interface ContactFormData {
  name: string
  email: string
  message: string
}

export async function POST(req: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Parse the form data
    const body = (await req.json()) as ContactFormData
    const { name, email, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and message are required' },
        { status: 400 },
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Create the contact message in the database
    const contactMessage = await payload.create({
      collection: 'contact-messages',
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
        status: 'new',
        priority: 'normal',
        source: 'website-contact-form',
      },
    })

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Thank you for your message! We will get back to you soon.',
        id: contactMessage.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error('Error creating contact message:', error)

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact form. Please try again later.',
      },
      { status: 500 },
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
