import React, { createContext, useContext } from 'react'
import {
  getAudienceConfig,
  getSectionById,
  getSectionData,
  isVisibleForAudience,
  resolveAudience,
  resumeDocument,
} from './document'
import type {
  ResumeAudienceConfig,
  ResumeDocument,
  ResumeDocumentSection,
  ResumeViewOptions,
} from './types'

interface ResumeContextValue {
  audience: string
  document: ResumeDocument
  view: ResumeViewOptions
}

interface ResumeProviderProps {
  audience?: string
  children: React.ReactNode
  document?: ResumeDocument
  view?: ResumeViewOptions
}

const ResumeContext = createContext<ResumeContextValue>({
  audience: 'default',
  document: resumeDocument,
  view: {},
})

export function ResumeProvider({
  audience = 'default',
  children,
  document = resumeDocument,
  view = {},
}: ResumeProviderProps): JSX.Element {
  return (
    <ResumeContext.Provider
      value={{
        audience: resolveAudience(document, audience),
        document,
        view: view || {},
      }}
    >
      {children}
    </ResumeContext.Provider>
  )
}

export const useResume = (): ResumeContextValue => useContext(ResumeContext)

export const useAudienceConfig = (): ResumeAudienceConfig => {
  const { audience, document } = useResume()
  return getAudienceConfig(document, audience)
}

export const useViewOptions = (): ResumeAudienceConfig & ResumeViewOptions => {
  const audienceConfig = useAudienceConfig()
  const { view } = useResume()

  return {
    ...audienceConfig,
    ...view,
  }
}

export const useResumeSection = (
  sectionId: string
): { isVisible: boolean; section: ResumeDocumentSection | undefined } => {
  const { audience, document } = useResume()
  const section = getSectionById(document, sectionId)

  return {
    isVisible: isVisibleForAudience(section, audience),
    section,
  }
}

export const useResumeSectionData = <T,>(sectionId: string, fallback: T): T => {
  const { document } = useResume()
  return getSectionData(document, sectionId, fallback)
}
