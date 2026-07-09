import './Education.css'
import Section from '../../primitives/Section'
import SectionTitle from '../../primitives/SectionTitle'
import DateRange from '../../primitives/DateRange'
import { useResumeSection, useResumeSectionData } from '../../../resume/context'
import type { EducationItem, ListSectionData } from '../../../resume/types'

function EducationFactory(items: EducationItem[]) {
  return items.map((edu, index) => {
    const outerClass = 'row w-100'
    let innerClass = 'title col-9'
    let dateClass = 'date col-3'
    const responsibilityClass = 'responsibility row w-100'

    dateClass = !edu.dates.showDate ? 'hidden ' + dateClass : dateClass
    innerClass = !edu.dates.showDate ? 'title col-12' : innerClass

    return (
      edu.meta.display && (
        <div className='school' key={index}>
          <div className={outerClass}>
            <DateRange
              className={dateClass}
              start={edu.dates.start}
              end={edu.dates.end}
              title={`${edu.dates.start} to ${edu.dates.end}`}
            />
            <div className={innerClass}>
              <span className='blue-span' />
              {edu.degree.short_name} / {edu.school.name}{' '}
              <span className='float-right'>{edu.school.location}</span>
            </div>
          </div>
          <div className={responsibilityClass}>
            <p className='col'>{edu.degree.long_name}</p>
          </div>
        </div>
      )
    )
  })
}

export default function Education() {
  const { isVisible, section } = useResumeSection('education')
  const education = useResumeSectionData<ListSectionData<EducationItem>>(
    'education',
    { items: [] }
  )

  return (
    isVisible &&
    education.items.length > 0 && (
      <Section id='education'>
        <SectionTitle>{section?.title}</SectionTitle>
        {EducationFactory(education.items)}
      </Section>
    )
  )
}
