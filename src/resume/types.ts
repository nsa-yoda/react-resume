import type { ComponentType } from 'react'

export type ResumeSectionType =
  | 'information'
  | 'summary'
  | 'glance'
  | 'skills'
  | 'experience'
  | 'education'
  | 'achievements'
  | 'publications'

export type FontOption = 'sans' | 'serif'
export type ImportFormat = 'json' | 'yaml' | 'json-resume'

export interface ResumeViewOptions {
  font?: FontOption
  hideContact?: boolean
  printMode?: boolean
}

export interface ResumeAudienceConfig {
  hideContact?: boolean
}

export interface ResumeThemeConfig {
  active: string
}

export interface ResumeLayoutConfig {
  sections: string[]
}

export interface ResumeName {
  first: string
  middle: string
  last: string
}

export interface ResumeEmail {
  address: string
  link: boolean
}

export interface ResumeMeta {
  display?: boolean
}

export interface InformationData {
  name: ResumeName
  title: string
  meta: ResumeMeta & {
    location: string
    phone: string
    email: ResumeEmail
    socials: string[]
  }
}

export interface SummaryData {
  content: string[]
}

export interface ListSectionData<T> {
  items: T[]
}

export interface SkillsData extends ListSectionData<string> {
  columns: number
  arrow: string
}

export interface WorkTypeDefinition {
  short: string
  long: string
  metaType: string
}

export interface ExperienceItem {
  company: {
    name: string
    type: string
    location: string
  }
  meta: ResumeMeta & {
    class?: string
    type: string
    remote: string
  }
  dates: {
    start: string
    end: string
  }
  title: string
  responsibility: string
  short: string
  bullets?: string[]
}

export interface ExperienceData extends ListSectionData<ExperienceItem> {
  displayLongResponsibility: boolean
  displayShortResponsibility: boolean
  workType: WorkTypeDefinition[]
  workTypeKey: string
}

export interface EducationItem {
  degree: {
    short_name: string
    long_name: string
  }
  school: {
    name: string
    location: string
  }
  dates: {
    showDate: boolean
    start: string
    end: string
  }
  meta: ResumeMeta
}

export interface AchievementItem {
  name: string
  description: string
  year: string
  meta: ResumeMeta
}

export interface PublicationItem {
  name: string
  description: string
  url: string
  display: boolean
}

export interface ResumeSection<TData = unknown> {
  id: string
  type: ResumeSectionType | string
  title: string
  display: boolean
  audiences: string[]
  data: TData
}

export type ResumeDocumentSection = ResumeSection<any>

export interface ResumeDocument {
  version: number
  theme: ResumeThemeConfig
  layout: ResumeLayoutConfig
  highlights: string[]
  audiences: Record<string, ResumeAudienceConfig>
  sections: ResumeDocumentSection[]
}

export interface ThemeSection {
  id: string
  Component: ComponentType<any>
}

export interface ValidationError {
  path: string
  message: string
}
