import './Experience.css'
import Badge from '../../primitives/Badge'
import DateRange from '../../primitives/DateRange'
import Section from '../../primitives/Section'
import SectionTitle from '../../primitives/SectionTitle'
import { Highlighter } from '../../../utils'
import { useResumeSection, useResumeSectionData } from '../../../resume/context'
import type { ExperienceData } from '../../../resume/types'

const ExperienceFactory = (experienceSection: ExperienceData) => {
  const metaTypeFinder = (metaType: string): string => {
    const workType = experienceSection.workType || []
    const type = workType.find(item => item.metaType === metaType)
    const output = type ? type.short : ''

    if (output.length > 0) {
      return '[' + output + ']'
    }
    return output
  }

  return experienceSection.items.map((experience, index) => {
    return (
      experience.meta.display === true && (
        <div key={index}>
          <div className={`job ${experience.meta.class}`}>
            <div className='row'>
              <DateRange
                className='date col-8'
                end={experience.dates.end}
                start={experience.dates.start}
                title={`${experience.dates.start} to ${experience.dates.end}`}
              />
              <div className='col-4 float-right'>
                {experience.company.type}
                {experience.meta.remote === 'remote' ? ', Remote' : ''}
                {experience.meta.remote === 'hybrid' ? ', Hybrid' : ''}
                {experience.meta.remote === 'in-person' ? ', On-Site' : ''}
                {experience.meta.remote === 'on-site' ? ', On-Site' : ''}
              </div>
            </div>
            <div className='row'>
              <div className='title col-8'>
                <span className='blue-span'>{experience.title}</span> /{' '}
                {experience.company.name}{' '}
                {metaTypeFinder(experience.meta.type) && (
                  <Badge>{metaTypeFinder(experience.meta.type)}</Badge>
                )}
              </div>
              <div className='col-4 float-right'>
                {experience.company.location}
              </div>
            </div>
            <div className='row'>
              {experienceSection.displayLongResponsibility && (
                <div className='responsibility col'>
                  {experience.bullets?.length > 0 ? (
                    <ul className='resume-bullets'>
                      {experience.bullets.map((bullet, bulletIndex) => (
                        <li
                          key={`${experience.company.name}-bullet-${bulletIndex}`}
                        >
                          {Highlighter(bullet)}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    Highlighter(experience.responsibility)
                  )}
                </div>
              )}

              {experienceSection.displayShortResponsibility && (
                <div className='responsibility col'>
                  {Highlighter(experience.short)}
                </div>
              )}
            </div>
          </div>
          <hr className={`${experience.meta.class}-hr`} />
        </div>
      )
    )
  })
}

const generateWorkTypeKey = (experienceSection: ExperienceData): string => {
  if (experienceSection.workType.length === 0) {
    return ''
  }

  return `${experienceSection.workTypeKey} » ${experienceSection.workType
    .map(item => `${item.short}: ${item.long}`)
    .join(', ')} «`
}

export default function Experience() {
  const { isVisible, section } = useResumeSection('experience')
  const experiences = useResumeSectionData<ExperienceData>('experience', {
    displayLongResponsibility: false,
    displayShortResponsibility: true,
    items: [],
    workType: [],
    workTypeKey: 'Key',
  })

  return (
    isVisible &&
    experiences.items.length > 0 && (
      <Section id='experience'>
        <SectionTitle>{section?.title}</SectionTitle>
        <figcaption className='blockquote-footer'>
          {generateWorkTypeKey(experiences)}
        </figcaption>
        {ExperienceFactory(experiences)}
      </Section>
    )
  )
}
