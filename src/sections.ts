import Achievements from './components/Sections/Achievements/Achievements'
import Education from './components/Sections/Education/Education'
import Experience from './components/Sections/Experience/Experience'
import Glance from './components/Sections/Glance/Glance'
import Information from './components/Sections/Information/Information'
import Publications from './components/Sections/Publications/Publications'
import Skills from './components/Sections/Skills/Skills'
import Summary from './components/Sections/Summary/Summary'
import { defaultSectionOrder } from './sectionOrder'
import type { ResumeSectionType, ThemeSection } from './resume/types'

export const sectionRegistry: Record<ResumeSectionType, any> = {
  information: Information,
  summary: Summary,
  glance: Glance,
  skills: Skills,
  experience: Experience,
  education: Education,
  achievements: Achievements,
  publications: Publications,
}

export const resolveSectionOrder = (sectionOrder?: string[]): string[] => {
  if (!Array.isArray(sectionOrder)) {
    return defaultSectionOrder
  }

  const validSections = sectionOrder.filter(
    sectionId => typeof sectionId === 'string' && sectionRegistry[sectionId]
  )

  return validSections.length > 0 ? validSections : defaultSectionOrder
}

export const buildSections = (sectionOrder?: string[]): ThemeSection[] =>
  resolveSectionOrder(sectionOrder).map(sectionId => ({
    id: sectionId,
    Component: sectionRegistry[sectionId],
  }))
