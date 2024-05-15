import './Education.css'
import education from '../../../data/Education.json'
import { formatDate } from '../../../utils'

function EducationFactory() {
  return education.map((school, index) => {
    return (
      school.meta.display && (
        <div key={index} className='school'>
          <div className='row w-100'>
            <div className='date col-3'>{`${formatDate(
              school.dates.start
            )} to ${formatDate(school.dates.end)}`}</div>
            <div className='title col-9'>
              <span className='blue-span'></span>
              {school.degree.short_name} / {school.school.name}{' '}
              <span className='float-right'>{school.school.location}</span>
            </div>
          </div>
          <div className='responsibilities row w-100'>
            <p className='col'>{school.degree.long_name}</p>
          </div>
        </div>
      )
    )
  })
}

export default function Education() {
  return (
    education.length > 0 && (
      <div id='education' className='section'>
        <h2 className='row'>Education</h2>
        {EducationFactory()}
      </div>
    )
  )
}
