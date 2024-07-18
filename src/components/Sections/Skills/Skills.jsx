import './Skills.css'
import {skills} from '../../../data'
import { rand, config } from '../../../utils'

const SkillsFactory = () => {
  let output = []
  let arrow = config('skills.arrow', '\u276F')
  let skillsColumns = config('skills.columns', 4)
  let sliceLen = Math.ceil(skills.length / skillsColumns)

  for (let i = 0; i < skills.length; i += sliceLen) {
    let slice = skills.slice(i, i + sliceLen)
    output.push(
      <div className='col' key={rand()}>
        {slice.map((skill, index) => (
          <div key={index}>
            {arrow} {skill}
          </div>
        ))}
      </div>
    )
  }
  return output
}

export default function Skills() {
  return (
    skills.length > 0 && (
      <div className='section' id='skills'>
        <h2 className='row'>{config('skills.title', 'Skills')} </h2>
        <div className='row'>{SkillsFactory()}</div>
      </div>
    )
  )
}
