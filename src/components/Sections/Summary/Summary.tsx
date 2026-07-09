import './Summary.css'
import Section from '../../primitives/Section'
import { useResumeSection, useResumeSectionData } from '../../../resume/context'
import type { SummaryData } from '../../../resume/types'

export default function Summary(): JSX.Element | false {
  const { isVisible } = useResumeSection('summary')
  const summary = useResumeSectionData<SummaryData>('summary', { content: [] })

  return (
    isVisible &&
    summary.content.length > 0 && (
      <Section id='summary'>
        {summary.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </Section>
    )
  )
}
