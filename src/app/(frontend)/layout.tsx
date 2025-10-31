import React from 'react'
import './styles.css'
import '../globals.css'
import '../fonts.css'

export const metadata = {
  description: 'Codeious website',
  title: 'Codeious website',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="font-bozon">
        <main>{children}</main>
      </body>
    </html>
  )
}
