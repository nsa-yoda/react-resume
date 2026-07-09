import resumeDocumentData from '../data/Resume.json'
import { defaultSectionOrder } from '../sectionOrder'
import { createDefaultResumeDocument } from './defaultDocument'
import type {
  ResumeAudienceConfig,
  ResumeDocument,
  ResumeDocumentSection,
} from './types'

const fallbackDocument = createDefaultResumeDocument()

const byType = (documentSections: ResumeDocumentSection[]) =>
  documentSections.reduce(
    (lookup, section) => {
      lookup[section.type] = section
      return lookup
    },
    {} as Record<string, ResumeDocumentSection>
  )

const normalizeStringList = (value: unknown): string[] => {
  if (!Array.isArray(value)) {
    return []
  }

  return value.filter(
    (item): item is string => typeof item === 'string' && item.length > 0
  )
}

const normalizeSection = (
  section: Partial<ResumeDocumentSection> | undefined,
  fallbackSection: ResumeDocumentSection
): ResumeDocumentSection => {
  const nextSection = section || fallbackSection

  return {
    ...fallbackSection,
    ...nextSection,
    audiences:
      normalizeStringList(nextSection?.audiences).length > 0
        ? normalizeStringList(nextSection.audiences)
        : fallbackSection.audiences,
    data: {
      ...(fallbackSection?.data || {}),
      ...(nextSection?.data || {}),
    },
  }
}

export const normalizeResumeDocument = (
  inputDocument: Partial<ResumeDocument> | null | undefined
): ResumeDocument => {
  const fallbackByType = byType(fallbackDocument.sections)
  const incomingSections = Array.isArray(inputDocument?.sections)
    ? inputDocument.sections
    : []

  const normalizedSections = Object.keys(fallbackByType).map(sectionType => {
    const matchedSection = incomingSections.find(
      section => section.type === sectionType || section.id === sectionType
    )

    return normalizeSection(matchedSection, fallbackByType[sectionType])
  })

  return {
    version: inputDocument?.version || fallbackDocument.version,
    theme: {
      ...fallbackDocument.theme,
      ...(inputDocument?.theme || {}),
    },
    layout: {
      sections:
        inputDocument?.layout?.sections?.filter(Boolean) || defaultSectionOrder,
    },
    highlights:
      normalizeStringList(inputDocument?.highlights).length > 0
        ? normalizeStringList(inputDocument.highlights)
        : fallbackDocument.highlights,
    audiences: {
      ...fallbackDocument.audiences,
      ...(inputDocument?.audiences || {}),
    },
    sections: normalizedSections,
  }
}

export const resumeDocument = normalizeResumeDocument(resumeDocumentData)

export const getSectionById = (
  document: ResumeDocument,
  sectionId: string
): ResumeDocumentSection | undefined =>
  document.sections.find(
    section => section.id === sectionId || section.type === sectionId
  )

export const getSectionData = <T>(
  document: ResumeDocument,
  sectionId: string,
  fallback: T
): T => (getSectionById(document, sectionId)?.data as T) || fallback

export const getSectionTitle = (
  document: ResumeDocument,
  sectionId: string,
  fallback = ''
): string => getSectionById(document, sectionId)?.title || fallback

export const resolveAudience = (
  document: ResumeDocument,
  requestedAudience: string | null | undefined
): string => {
  if (
    requestedAudience &&
    Object.prototype.hasOwnProperty.call(document.audiences, requestedAudience)
  ) {
    return requestedAudience
  }

  return 'default'
}

export const getAudienceConfig = (
  document: ResumeDocument,
  requestedAudience: string | null | undefined
): ResumeAudienceConfig =>
  document.audiences[resolveAudience(document, requestedAudience)] || {}

export const isVisibleForAudience = (
  entity:
    | { display?: boolean; meta?: { display?: boolean }; audiences?: string[] }
    | undefined,
  audience: string
): boolean => {
  if (!entity) {
    return false
  }

  if (entity.display === false || entity.meta?.display === false) {
    return false
  }

  if (!Array.isArray(entity.audiences) || entity.audiences.length === 0) {
    return true
  }

  return entity.audiences.includes(audience)
}
