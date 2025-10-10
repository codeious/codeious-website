import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  admin: {
    useAsTitle: 'email',
    description: 'Contact form submissions from the website',
    defaultColumns: ['name', 'email', 'status', 'createdAt'],
    group: 'Forms',
  },
  access: {
    // Only authenticated users can read contact messages
    read: ({ req: { user } }) => Boolean(user),
    // Prevent updates and deletes for data integrity
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
    // Allow anyone to create (for form submissions)
    create: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Full name of the person submitting the form',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      admin: {
        description: 'Email address for contact',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Message content from the contact form',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        {
          label: 'New',
          value: 'new',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Replied',
          value: 'replied',
        },
        {
          label: 'Closed',
          value: 'closed',
        },
      ],
      admin: {
        description: 'Current status of the contact message',
        position: 'sidebar',
      },
    },
    {
      name: 'priority',
      type: 'select',
      defaultValue: 'normal',
      options: [
        {
          label: 'Low',
          value: 'low',
        },
        {
          label: 'Normal',
          value: 'normal',
        },
        {
          label: 'High',
          value: 'high',
        },
        {
          label: 'Urgent',
          value: 'urgent',
        },
      ],
      admin: {
        description: 'Priority level of the message',
        position: 'sidebar',
      },
    },
    {
      name: 'source',
      type: 'text',
      defaultValue: 'website-contact-form',
      admin: {
        description: 'Source of the contact message',
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        description: 'IP address of the submitter',
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'userAgent',
      type: 'text',
      admin: {
        description: 'Browser user agent',
        position: 'sidebar',
        readOnly: true,
      },
    },
    {
      name: 'notes',
      type: 'richText',
      admin: {
        description: 'Internal notes about this contact message',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, req, operation }) => {
        // Set IP address and user agent on creation
        if (operation === 'create') {
          // Note: req.ip might not be available in all environments
          const ip = (req as any)?.ip
          if (ip) {
            data.ipAddress = ip
          }
          const userAgent = req.headers.get('user-agent')
          if (userAgent) {
            data.userAgent = userAgent
          }
        }
        return data
      },
    ],
  },
  timestamps: true,
}
