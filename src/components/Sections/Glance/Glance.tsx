import './Glance.css'
import Section from '../../primitives/Section'
import SectionTitle from '../../primitives/SectionTitle'
import { replaceYearsExperience } from '../../../utils'
import { useResumeSection, useResumeSectionData } from '../../../resume/context'
import type { ListSectionData } from '../../../resume/types'

const AtAGlanceFactory = (items: string[]): JSX.Element[] => {
  return items.map((datum, index) => {
    return (
      <div className='row' key={index}>
        <div className='col-12'>&#x2937; {replaceYearsExperience(datum)}</div>
      </div>
    )
  })
}

export default function Glance(): JSX.Element | false {
  const { isVisible, section } = useResumeSection('glance')
  const glance = useResumeSectionData<ListSectionData<string>>('glance', {
    items: [],
  })

  return (
    isVisible &&
    glance.items.length > 0 && (
      <Section id='glance'>
        <SectionTitle>{section?.title}</SectionTitle>
        {AtAGlanceFactory(glance.items)}
      </Section>
    )
  )
}
