import './Experience.css'
import {experiences} from '../../../data'
import { config, formatDate, Highlighter } from '../../../utils'

const ExperienceFactory = () => {
  const arrowSymbol = String.fromCodePoint(0x02794)

  const metaTypeFinder = metaType => {
    const workType = config('experience.workType', {})
    const type = workType.find(item => item.metaType === metaType)
    const output = type ? type.short : ''

    if (output.length > 0) {
      return '[' + output + ']'
    }
    return output
  }

  return experiences.map((experience, index) => {
    return (
      experience.meta.display === true && (
        <div key={index}>
          <div className={`job ${experience.meta.class}`}>
            <div className='row'>
              <div
                className='date col-8'
                title={`${experience.dates.start} to ${experience.dates.end}`}
              >
                {formatDate(experience.dates.start)}{' '}
                {experience.dates.end ? arrowSymbol : ''}{' '}
                {formatDate(experience.dates.end)}
              </div>
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
                {experience.company.name} {metaTypeFinder(experience.meta.type)}
              </div>
              <div className='col-4 float-right'>
                {experience.company.location}
              </div>
            </div>
            <div className='row'>
              <div
                className='responsibilities col'
                dangerouslySetInnerHTML={{
                  __html: Highlighter(experience.responsibilities),
                }}
              />
            </div>
          </div>
          <hr className={`${experience.meta.class}-hr`} />
        </div>
      )
    )
  })
}

const generateWorkTypeKey = () => {
  const workType = config('experience.workType', {})
  const keyString = workType
    .map(item => `${item.short}: ${item.long}`)
    .join(', ')
  return (
    config('experience.workTypeKey', 'Key') + ` &raquo; ${keyString} &laquo;`
  )
}

export default function Experience() {
  return (
    experiences.length > 0 && (
      <div className='section' id='experience'>
        <h2 className='row'>{config('experience.title', 'Experience')}</h2>
        <figcaption
          className={'blockquote-footer'}
          dangerouslySetInnerHTML={{
            __html: generateWorkTypeKey(),
          }}
        />
        {ExperienceFactory()}
      </div>
    )
  )
}
