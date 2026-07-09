import './Skills.css'
import Section from '../../primitives/Section'
import SectionTitle from '../../primitives/SectionTitle'
import { useResumeSection, useResumeSectionData } from '../../../resume/context'
import type { SkillsData } from '../../../resume/types'

const SkillsFactory = (skillsSection: SkillsData): JSX.Element[] => {
  const output: JSX.Element[] = []
  const arrow = skillsSection.arrow || '\u276F'
  const skillsColumns = skillsSection.columns || 4
  const sliceLen = Math.ceil(skillsSection.items.length / skillsColumns)

  for (let i = 0; i < skillsSection.items.length; i += sliceLen) {
    const slice = skillsSection.items.slice(i, i + sliceLen)
    output.push(
      <div className='col' key={`skill-column-${i}`}>
        {slice.map((skill, index) => (
          <div key={`${skill}-${index}`}>
            {arrow} {skill}
          </div>
        ))}
      </div>
    )
  }
  return output
}

export default function Skills(): JSX.Element | false {
  const { isVisible, section } = useResumeSection('skills')
  const skills = useResumeSectionData<SkillsData>('skills', {
    arrow: '\u276F',
    columns: 4,
    items: [],
  })

  return (
    isVisible &&
    skills.items.length > 0 && (
      <Section id='skills'>
        <SectionTitle>{section?.title}</SectionTitle>
        <div className='row'>{SkillsFactory(skills)}</div>
      </Section>
    )
  )
}
