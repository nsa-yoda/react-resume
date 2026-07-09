import React from 'react'
import { buildSections } from './sections'
import { defaultSectionOrder } from './sectionOrder'
import { ResumeProvider } from './resume/context'
import { resolveTheme } from './themes'
import type { ResumeDocument, ResumeViewOptions } from './resume/types'

interface ResumeRendererProps {
  audience?: string
  document: ResumeDocument
  sectionOverride?: string[]
  themeOverride?: string
  view?: ResumeViewOptions
}

export const resolveSectionOrder = (
  document: ResumeDocument,
  sectionOverride?: string[]
): string[] => {
  if (Array.isArray(sectionOverride) && sectionOverride.length > 0) {
    return sectionOverride
  }

  if (
    Array.isArray(document?.layout?.sections) &&
    document.layout.sections.length > 0
  ) {
    return document.layout.sections
  }

  return defaultSectionOrder
}

export default function ResumeRenderer({
  audience = 'default',
  document,
  sectionOverride,
  themeOverride,
  view = {},
}: ResumeRendererProps): JSX.Element {
  const Theme = resolveTheme(
    themeOverride || document.theme?.active || 'classic'
  )
  const sections = buildSections(resolveSectionOrder(document, sectionOverride))

  return (
    <ResumeProvider audience={audience} document={document} view={view}>
      <Theme sections={sections} />
    </ResumeProvider>
  )
}
