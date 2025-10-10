import React from 'react'

// Client-side and server-side rich text rendering utility
export function renderRichText(richText: any): React.ReactNode {
  if (!richText?.root?.children) {
    return null
  }

  function renderNode(node: any, index: number): React.ReactNode {
    if (node.type === 'text') {
      let text = node.text || ''

      if (node.format && node.format & 1) {
        // bold
        text = <strong key={index}>{text}</strong>
      }
      if (node.format && node.format & 2) {
        // italic
        text = <em key={index}>{text}</em>
      }

      return text
    }

    if (node.type === 'paragraph') {
      return (
        <p
          key={index}
          className="text-base md:text-md lg:text-lg text-gray-800 leading-relaxed mb-4"
        >
          {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
        </p>
      )
    }

    if (node.type === 'heading') {
      const level = Math.min(Math.max(1, node.tag || 1), 6) // Ensure valid heading level

      if (level === 1) {
        return (
          <h1 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </h1>
        )
      }
      if (level === 2) {
        return (
          <h2 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </h2>
        )
      }
      if (level === 3) {
        return (
          <h3 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </h3>
        )
      }
      if (level === 4) {
        return (
          <h4 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </h4>
        )
      }
      if (level === 5) {
        return (
          <h5 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
          </h5>
        )
      }
      return (
        <h6 key={index} className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
          {node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex))}
        </h6>
      )
    }

    return (
      node.children?.map((child: any, childIndex: number) => renderNode(child, childIndex)) || ''
    )
  }

  return (
    <div>{richText.root.children.map((node: any, index: number) => renderNode(node, index))}</div>
  )
}

export default {
  renderRichText,
}
