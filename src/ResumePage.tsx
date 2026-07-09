import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import ResumeRenderer from './ResumeRenderer'
import { resumeDocument, resolveAudience } from './resume/document'
import type { FontOption } from './resume/types'

const parseSectionList = (
  searchParams: URLSearchParams
): string[] | undefined => {
  const requestedSections = searchParams.get('sections')

  if (!requestedSections) {
    return undefined
  }

  return requestedSections
    .split(',')
    .map(sectionId => sectionId.trim())
    .filter(Boolean)
}

const resolveFontOption = (searchParams: URLSearchParams): FontOption => {
  const requestedFont = searchParams.get('font')

  if (requestedFont === 'serif' || requestedFont === 'sans') {
    return requestedFont
  }

  return 'sans'
}

export default function ResumePage() {
  const [searchParams] = useSearchParams()
  const { themeName } = useParams<{ themeName?: string }>()
  const requestedAudience = searchParams.get('audience')
  const audience = resolveAudience(resumeDocument, requestedAudience)

  const hideContact =
    searchParams.get('contact') === 'hide' || searchParams.get('print') === '1'

  return (
    <ResumeRenderer
      audience={audience}
      document={resumeDocument}
      sectionOverride={parseSectionList(searchParams)}
      themeOverride={themeName || searchParams.get('theme') || undefined}
      view={{
        font: resolveFontOption(searchParams),
        ...(hideContact ? { hideContact: true } : {}),
        printMode: searchParams.get('print') === '1',
      }}
    />
  )
}
