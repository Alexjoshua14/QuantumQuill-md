import { FC, useEffect, useState } from 'react'
import { remark } from 'remark'
import Markdown from 'react-markdown'

interface MarkdownProps {

}

/**
 * TODO: Properly render markdown text
 * 
 * @param param0 
 * @returns 
 */
const MarkdownSection: FC<MarkdownProps> = ({ }) => {
  // Import sample data from data.json
  const sampleData = require('@/data/data.json')
  const sampleMarkdown = sampleData[1].content


  return (
    <section className="h-full overflow-y-auto">
      <div className="w-full h-10 px-2 flex items-center bg-secondary">
        <h2 className="app-heading-secondary">
          Markdown
        </h2>
      </div>
      <div className="h-full p-2 max-w-full">
        <pre className="preview-markdown whitespace-pre-wrap">
          {sampleMarkdown}
        </pre>
      </div>
    </section>
  )
}

export default MarkdownSection