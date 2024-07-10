import './Publications.css'
import publications from '../../../data/Publications.json'
import { config } from '../../../utils'

const PublicationFactory = () => {
  const separator = config('achievements.displaySeparator', true)
    ? 'separator'
    : ''

  return publications.map((pub, index) => {
    return (
      pub.display && (
        <div className={'row ' + separator} key={index}>
          <span className='col-2'>
            <strong>{pub.name}</strong>
          </span>
          <span className='col-8'>{pub.description}</span>
          <a
            className='col-2 blue-span float-right'
            href={'https://' + pub.url}
            rel='noreferrer'
            target='_blank'
          >
            {pub.url}
          </a>
        </div>
      )
    )
  })
}

export default function Publications() {
  return (
    publications.length > 0 && (
      <div className='section' id='publications'>
        <h2 className='row'>
          {config('publications.title', 'Publications and Software')}
        </h2>
        {PublicationFactory()}
      </div>
    )
  )
}
