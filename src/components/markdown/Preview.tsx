import { FC, useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import { remark } from 'remark'
import html from 'remark-html'

interface PreviewProps {

}

/**
 * TODO: Properly render markdown html conversion
 * 
 * @param param0 
 * @returns 
 */
const Preview: FC<PreviewProps> = ({ }) => {
  // Import sample data from data.json
  const sampleData = require('@/data/data.json')
  const sampleMarkdown = sampleData[1].content

  return (
    <section className="h-full overflow-y-auto">
      <div className="w-full h-10 px-2 flex items-center bg-secondary">
        <h2 className="app-heading-secondary">
          Preview
        </h2>
      </div>
      <Markdown className="p-4">
        {sampleMarkdown}
      </Markdown>
    </section>
  )
}

export default Preview