import './Glance.css'
import glance from '../../../data/AtAGlance.json'
import { config, replaceYearsExperience } from '../../../utils'

const AtAGlanceFactory = () => {
  return glance.map((datum, index) => {
    return (
      <div className='row' key={index}>
        <div className='col-12'>&#x2937; {replaceYearsExperience(datum)}</div>
      </div>
    )
  })
}

export default function Glance() {
  return (
    glance.length > 0 && (
      <div className='section' id='glance'>
        <h2 className='row'>{config('at-a-glance.title', 'At A Glance')}</h2>
        {AtAGlanceFactory()}
      </div>
    )
  )
}
