import type { CollectionConfig } from 'payload'

export const PageContent: CollectionConfig = {
  slug: 'page-content',
  labels: {
    singular: {
      en: 'Page Content',
      pl: 'Treść Strony',
    },
    plural: {
      en: 'Page Contents',
      pl: 'Treści Stron',
    },
  },
  admin: {
    useAsTitle: 'sectionId',
    description: 'Manage content for different sections of the website',
    group: {
      en: 'Content Management',
      pl: 'Zarządzanie Treścią',
    },
    defaultColumns: ['sectionId', 'title', 'updatedAt'],
  },
  access: {
    read: () => true, // Allow public read access for frontend
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'sectionId',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Hero Section', value: 'hero' },
        { label: 'About Us Section', value: 'about-us' },
        { label: 'Shopen Section', value: 'shopen' },
        { label: 'Shopen Features Section', value: 'shopen-features' },
        { label: 'Technology Section', value: 'technology' },
        { label: 'Team Section', value: 'team' },
        { label: 'FAQ Section', value: 'faq' },
        { label: 'Contact Section', value: 'contact' },
        { label: 'Footer Section', value: 'footer' },
      ],
      admin: {
        description: 'Select the section this content belongs to',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
      label: {
        en: 'Title',
        pl: 'Tytuł',
      },
      admin: {
        description: {
          en: 'Main title/heading for the section',
          pl: 'Główny tytuł/nagłówek dla sekcji',
        },
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      localized: true,
      label: {
        en: 'Subtitle',
        pl: 'Podtytuł',
      },
      admin: {
        description: {
          en: 'Optional subtitle for the section',
          pl: 'Opcjonalny podtytuł dla sekcji',
        },
      },
    },
    {
      name: 'description',
      type: 'richText',
      localized: true,
      label: {
        en: 'Description',
        pl: 'Opis',
      },
      admin: {
        description: {
          en: 'Main content/description for the section',
          pl: 'Główna treść/opis dla sekcji',
        },
      },
    },
    {
      name: 'additionalContent',
      type: 'richText',
      localized: true,
      label: {
        en: 'Additional Content',
        pl: 'Dodatkowa Treść',
      },
      admin: {
        description: {
          en: 'Additional paragraph or content for the section',
          pl: 'Dodatkowy akapit lub treść dla sekcji',
        },
      },
    },
    {
      name: 'ctaText',
      type: 'text',
      localized: true,
      label: {
        en: 'Call to Action Text',
        pl: 'Tekst Wezwania do Działania',
      },
      admin: {
        description: {
          en: 'Text for buttons or call-to-action elements',
          pl: 'Tekst dla przycisków lub elementów wezwania do działania',
        },
      },
    },
    {
      name: 'media',
      type: 'group',
      label: {
        en: 'Media Assets',
        pl: 'Zasoby Medialne',
      },
      admin: {
        description: {
          en: 'Media files used in this section',
          pl: 'Pliki medialne używane w tej sekcji',
        },
      },
      fields: [
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Background Image',
            pl: 'Obraz Tła',
          },
          admin: {
            description: {
              en: 'Background image for the section',
              pl: 'Obraz tła dla sekcji',
            },
          },
        },
        {
          name: 'sectionImage',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Section Image',
            pl: 'Obraz Sekcji',
          },
          admin: {
            description: {
              en: 'Main image for the section content',
              pl: 'Główny obraz dla treści sekcji',
            },
          },
        },
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Logo',
            pl: 'Logo',
          },
          admin: {
            description: {
              en: 'Logo image for branding',
              pl: 'Obraz logo do brandingu',
            },
          },
        },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      label: {
        en: 'Section Metadata',
        pl: 'Metadane Sekcji',
      },
      fields: [
        {
          name: 'showSection',
          type: 'checkbox',
          defaultValue: true,
          label: {
            en: 'Show Section',
            pl: 'Pokaż Sekcję',
          },
          admin: {
            description: {
              en: 'Toggle section visibility on the website',
              pl: 'Przełącz widoczność sekcji na stronie',
            },
          },
        },
        {
          name: 'order',
          type: 'number',
          defaultValue: 0,
          label: {
            en: 'Display Order',
            pl: 'Kolejność Wyświetlania',
          },
          admin: {
            description: {
              en: 'Order in which sections appear on the page',
              pl: 'Kolejność, w jakiej sekcje pojawiają się na stronie',
            },
          },
        },
      ],
    },
    {
      name: 'carouselItems',
      type: 'array',
      label: {
        en: 'Carousel Items',
        pl: 'Elementy Karuzeli',
      },
      admin: {
        description: {
          en: 'Content for carousel sections (Team, Technology, Shopen, Shopen Features)',
          pl: 'Treść dla sekcji karuzeli (Zespół, Technologia, Shopen, Funkcje Shopen)',
        },
        condition: (data) =>
          ['team', 'technology', 'shopen', 'shopen-features'].includes(data.sectionId),
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          label: {
            en: 'Item Title',
            pl: 'Tytuł Elementu',
          },
        },
        {
          name: 'description',
          type: 'richText',
          localized: true,
          label: {
            en: 'Item Description',
            pl: 'Opis Elementu',
          },
        },
        {
          name: 'additionalText',
          type: 'richText',
          localized: true,
          label: {
            en: 'Additional Text',
            pl: 'Dodatkowy Tekst',
          },
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: {
            en: 'Image',
            pl: 'Obraz',
          },
          admin: {
            condition: (data, siblingData) => data.sectionId === 'team',
          },
        },
        {
          name: 'role',
          type: 'text',
          localized: true,
          label: {
            en: 'Role/Position',
            pl: 'Rola/Stanowisko',
          },
          admin: {
            condition: (data, siblingData) => data.sectionId === 'team',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          console.log(`Created new content for section: ${doc.sectionId}`)
        }
      },
    ],
  },
  timestamps: true,
}
